import { Uri, workspace } from 'vscode'

export class FileEdit {
    static getName(uri: Uri) {
        return uri.path.split('/').pop()!
    }
    private static multiRoot(): boolean {
        return !!(workspace.workspaceFolders && workspace.workspaceFolders.length > 1)
    }

    static isRoot(uri: Uri): boolean {
        return !!workspace.workspaceFolders?.find((folder) => folder.uri.path == uri.path)
    }

    static formatPath(uri: Uri, rootPlaceholder: boolean, includeWorkspaceFolders: boolean) {
        if (this.isRoot(uri)) return rootPlaceholder ? 'root' : ''
        if (!includeWorkspaceFolders) return workspace.asRelativePath(uri, false)
        return workspace.asRelativePath(uri, this.multiRoot())
    }
}
