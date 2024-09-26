import { DiagnosticSchema } from './diagnostics/diagnosticSchema'
import { CommandSchema } from './commandSchema'
import { BaseWebviewProvider } from './webview'
import { disposeAndClear } from './utils'
import { Message } from '../../shared/types'
import { commands, Disposable, ExtensionContext, languages, window } from 'vscode'

export abstract class ExtensionHandle {
    static _disposables: Disposable[] = []
    static _context?: ExtensionContext | undefined
    static _commandListeners = new Map<string, (() => void)[]>()
    static _webviewListeners: ((message: Message) => void)[] = []

    public static activate(context: ExtensionContext) {
        this._context = context
        context.subscriptions.push(
            new Disposable(() => {
                this._context = undefined
                this._commandListeners.clear()
                this._webviewListeners = []
                disposeAndClear(this._disposables)
            })
        )
    }

    public static addCommandListener(commandId: string, callback: () => void) {
        const listeners = this._commandListeners.get(commandId)
        if (listeners) this._commandListeners.set(commandId, [...listeners, callback])
        else this._commandListeners.set(commandId, [callback])
    }

    protected static context() {
        if (this._context) return this._context
        throw ReferenceError('extension handle not yet activated')
    }

    protected static registerCommand(command: CommandSchema) {
        this._disposables.push(
            commands.registerCommand(command.contributeId, async () => {
                await command.activate(() => {
                    const listeners = this._commandListeners.get(command.contributeId)
                    if (listeners) listeners.forEach((callback) => callback())
                })
            })
        )
    }

    protected static registerDiagnosticCollection(schema: DiagnosticSchema) {
        const collection = languages.createDiagnosticCollection(schema.name)
        this._disposables.push(collection)
        this._disposables.concat(schema.apply(collection))
    }

    protected static registerWebviewProvider(
        constructor: new (
            context: ExtensionContext,
            listeners: ((message: Message) => void)[]
        ) => BaseWebviewProvider
    ) {
        const provider = new constructor(this.context(), this._webviewListeners)
        window.registerWebviewViewProvider(provider.contributeId, provider)
        this._webviewListeners.push(provider.onDidReceiveMessage.bind(provider))
    }
}
