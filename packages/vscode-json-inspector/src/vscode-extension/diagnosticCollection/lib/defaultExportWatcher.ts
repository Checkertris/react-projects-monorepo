import vscode from 'vscode'
import ts from 'typescript'
import { getDefaultExportInfo, isTypeAssignable } from './utils'

export class DefaultExportWatcher extends vscode.Disposable {
    public readonly exportType: ts.Type
    public readonly exportTypeLabel: string
    private invalidExportEvent?: (uri: vscode.Uri, invalidNode: ts.Node) => void
    private lackExportEvent?: (uri: vscode.Uri) => void
    private validExportEvent?: (uri: vscode.Uri, node: ts.Node) => void

    onInvalidDefaultExport(callback: (uri: vscode.Uri, invalidNode: ts.Node) => void) {
        this.invalidExportEvent = callback
    }
    onLackDefaultExport(callback: (uri: vscode.Uri) => void) {
        this.lackExportEvent = callback
    }

    onValidExport(callback: (uri: vscode.Uri, node: ts.Node) => void) {
        this.validExportEvent = callback
    }

    constructor(
        private readonly globPattern: string,
        private readonly exportTypeRef: vscode.Uri
    ) {
        const disposables: vscode.Disposable[] = []
        super(() => disposables.forEach((disposable) => disposable.dispose()))

        //set export type
        const info = getDefaultExportInfo(exportTypeRef)
        if (info) {
            this.exportType = info.type
            this.exportTypeLabel = info.typeString
        } else
            throw ReferenceError(
                'unable to get default export reference at ' + exportTypeRef.toString()
            )

        //set up events
        const watcher = vscode.workspace.createFileSystemWatcher(globPattern, false, false, true)
        disposables.push(watcher.onDidChange(this.viewFile.bind(this)))
        disposables.push(watcher.onDidCreate(this.viewFile.bind(this)))
        // disposables.push(
        //     vscode.workspace.onDidChangeWorkspaceFolders(() =>
        //         extension
        //             .readWorkspaceFolders({
        //                 onlyInclude: [fileType],
        //                 ignore: DEFAULT_IGNORE,
        //                 type: vscode.FileType.File,
        //             })
        //             .then((files) => files.forEach((file) => this.viewFile(file.uri)))
        //     )
        // )
    }

    private viewFile(uri: vscode.Uri) {
        const info = getDefaultExportInfo(uri)
        if (!info) {
            if (this.lackExportEvent) this.lackExportEvent(uri)
        } else if (isTypeAssignable(this.exportTypeRef, uri, this.exportType, info.type)) {
            if (this.invalidExportEvent) this.invalidExportEvent(uri, info.node)
        } else {
            if (this.validExportEvent) this.validExportEvent(uri, info.node)
        }
    }
}
