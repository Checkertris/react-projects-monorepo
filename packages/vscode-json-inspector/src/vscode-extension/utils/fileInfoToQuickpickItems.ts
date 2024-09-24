import vscode from 'vscode'
import * as extension from '~/vscode-extension'

export function fileInfoToQuickpickItems(files: extension.FileInfo[]): extension.FileQuickpick[] {
    let includeWorkspaceFolders = false
    if (vscode.workspace.workspaceFolders)
        if (vscode.workspace.workspaceFolders.length > 1) includeWorkspaceFolders = true

    return files.map((file) => {
        const label = '/' + vscode.workspace.asRelativePath(file.uri, includeWorkspaceFolders)

        switch (file.type) {
            case 'rootFolder':
                return { description: '- workspace root', label, ...file }
            default:
                return { label, ...file }
        }
    })
}
