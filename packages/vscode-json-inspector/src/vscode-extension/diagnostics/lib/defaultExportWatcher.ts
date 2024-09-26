import vscode, { Uri } from 'vscode'
import ts from 'typescript'
import { getDefaultExportInfo, isTypeAssignable } from './utils'
import { disposeAndClear } from '~/vscode-extension/utils'
import { ExtensionHandle } from '~/vscode-extension/extensionHandle'

export class DefaultExportWatcher extends vscode.Disposable {
    private readonly referenceUri: Uri
    public onInvalidExport?: (uri: vscode.Uri, node: ts.Node) => void
    public onLackExport?: (uri: vscode.Uri) => void
    public onValidExport?: (uri: vscode.Uri, node: ts.Node) => void

    constructor(
        globPattern: string,
        private readonly targetType: ts.Type
    ) {
        const disposables: vscode.Disposable[] = []
        super(() => disposeAndClear(disposables))

        //set up events
        const watcher = vscode.workspace.createFileSystemWatcher(globPattern, false, false, true)
        disposables.push(watcher.onDidChange(this.viewFile.bind(this)))
        disposables.push(watcher.onDidCreate(this.viewFile.bind(this)))
    }

    private viewFile(uri: vscode.Uri) {
        const info = getDefaultExportInfo(uri)
        if (!info) {
            if (this.onLackExport) this.onLackExport(uri)
        } else if (isTypeAssignable(this.exportTypePath, uri, this.targetType, info.type)) {
            if (this.onInvalidExport) this.onInvalidExport(uri, info.node)
        } else {
            if (this.onValidExport) this.onValidExport(uri, info.node)
        }
    }
}
