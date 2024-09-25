import { Uri, workspace } from 'vscode'

export function asWorkspacePath(uri: Uri) {
    if (workspace.workspaceFolders && workspace.workspaceFolders.length > 1) {
        return workspace.asRelativePath(uri.fsPath, true)
    } else {
        const path = workspace.asRelativePath(uri.fsPath, false)
        if (path == uri.path) return '/'
        else return '/' + workspace.asRelativePath(uri.fsPath, false)
    }
}
