import { Uri, window, workspace, WorkspaceEdit } from 'vscode'
import { asWorkspacePath } from './asWorkspacePath'

export interface WsEditAction {
    type: 'file' | 'folder'
    uri: Uri
}

export function editWorkspace(edits: WsEditAction[], ignoreIfExists: boolean) {
    if (workspace.workspaceFolders) {
        const wsEdit = new WorkspaceEdit()
        edits.forEach((edit) => {
            switch (edit.type) {
                case 'file':
                    wsEdit.createFile(edit.uri, {
                        ignoreIfExists,
                        overwrite: !ignoreIfExists,
                    })
                    break
                case 'folder':
                    workspace.fs.createDirectory(edit.uri)
            }
            window.showInformationMessage(
                edit.type + ' created at ' + asWorkspacePath(edit.uri.path)
            )
        })
        workspace.applyEdit(wsEdit)
    } else {
        window.showErrorMessage('no workspace detected, unable to create files')
    }
}
