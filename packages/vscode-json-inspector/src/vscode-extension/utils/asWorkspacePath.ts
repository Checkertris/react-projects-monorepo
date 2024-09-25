import { Uri, workspace } from 'vscode'

export function asWorkspacePath(uri: Uri, isRoot: boolean = false) {
    if (workspace.workspaceFolders && workspace.workspaceFolders.length > 1) {
        return workspace.asRelativePath(uri.fsPath, true)
    } else {
        if (isRoot) return '/'
        else return '/' + workspace.asRelativePath(uri.fsPath, false)
    }
}
