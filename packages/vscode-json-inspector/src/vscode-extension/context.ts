import vscode from 'vscode'
import { DiagnosticConfiguration } from './diagnosticCollection/diagnosticConfiguration'

export abstract class Context {
    static context?: vscode.ExtensionContext | undefined
    static commandListeners: Record<string, (() => void)[]> = {}

    public static registerContext(context: vscode.ExtensionContext) {
        this.context = context
        return new vscode.Disposable(() => (this.context = undefined))
    }

    public static getContext() {
        if (this.context) return this.context
        else {
            vscode.window.showInformationMessage(
                'unable to complete certain functions, context is not yet registered'
            )
            throw ReferenceError('no context provided')
        }
    }

    public static registerCommands(
        exstensionthis: Record<string, (context: vscode.ExtensionContext) => void>
    ) {
        const disposables: vscode.Disposable[] = []
        disposables.concat(
            Object.entries(exstensionthis).map(([commandId, command]) =>
                vscode.commands.registerCommand(commandId, () => {
                    command(this.getContext())
                    if (this.commandListeners[commandId])
                        this.commandListeners[commandId].forEach((callback) => callback())
                })
            )
        )
        disposables.push(new vscode.Disposable(() => (this.commandListeners = {})))
        return disposables
    }

    public static addCommandListener(commandId: string, callback: () => void) {
        if (this.commandListeners[commandId]) {
            this.commandListeners[commandId].push(callback)
        } else {
            this.commandListeners[commandId] = [callback]
        }
    }

    public static registerDiagnosticCollections(
        diagnosticCollections: Record<string, DiagnosticConfiguration>
    ) {
        const disposables: vscode.Disposable[] = []
        Object.entries(diagnosticCollections).map(([name, diagnostic]) => {
            const collection = vscode.languages.createDiagnosticCollection(name)
            disposables.push(collection)
            disposables.concat(diagnostic.bindToCollection(collection))
        })
        return disposables
    }

    public static registerWebviewProviders(
        webviewProviders: Record<
            string,
            new (context: vscode.ExtensionContext) => vscode.WebviewViewProvider
        >
    ): vscode.Disposable[] {
        return Object.entries(webviewProviders).map(([viewId, webviewProvider]) =>
            vscode.window.registerWebviewViewProvider(
                viewId,
                new webviewProvider(this.getContext())
            )
        )
    }
}
