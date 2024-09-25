import { workspace } from 'vscode'

export function asWorkspacePath(path: string) {
    if (workspace.workspaceFolders && workspace.workspaceFolders.length > 1) {
        return workspace.asRelativePath(path, true)
    } else {
        return '/' + workspace.asRelativePath(path, false)
    }
}
