import vscode from 'vscode'
import ts from 'typescript'
import * as extension from '~/vscode-extension'
import { DefaultExportWatcher } from './defaultExportWatcher'

export class DiagnosticConfiguration {
    private collection?: vscode.DiagnosticCollection
    private disposables: vscode.Disposable[] = []

    bindToCollection(collection: vscode.DiagnosticCollection): vscode.Disposable[] {
        this.collection = collection
        return this.disposables
    }

    addDefaultExportDiagnostic(
        fileType: string,
        exportTypeRef: vscode.Uri,
        onValidExport?: (
            uri: vscode.Uri,
            node: ts.Node,
            collection: vscode.DiagnosticCollection
        ) => void
    ) {
        const watcher = new DefaultExportWatcher('**/*.' + fileType, exportTypeRef)
        this.disposables.push(watcher)

        if (onValidExport)
            watcher.onValidExport((uri, node) => {
                if (this.collection) onValidExport(uri, node, this.collection)
            })

        watcher.onLackDefaultExport((uri) => {
            this.collection?.set(uri, [
                new vscode.Diagnostic(
                    new vscode.Range(0, 0, 0, 2),
                    `file type ${fileType} requires a default export`,
                    vscode.DiagnosticSeverity.Error
                ),
            ])
        })

        watcher.onInvalidDefaultExport((uri, node) => {
            const range = extension.getRange(uri, node)
            if (range) {
                this.collection?.set(uri, [
                    new vscode.Diagnostic(
                        range,
                        `default export is not assignable to ${watcher.exportTypeLabel} `,
                        vscode.DiagnosticSeverity.Error
                    ),
                ])
            }
        })
        return this
    }
}
