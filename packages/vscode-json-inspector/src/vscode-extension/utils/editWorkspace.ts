import { Uri, window, workspace, WorkspaceEdit } from 'vscode'
import { asWorkspacePath } from './asWorkspacePath'

export interface WsEditAction {
    type: 'file' | 'folder'
    uri: Uri
}

export async function editWorkspace(edits: WsEditAction[], ignoreIfExists: boolean = true) {
    if (workspace.workspaceFolders) {
        const wsEdit = new WorkspaceEdit()
        edits.forEach(async (edit) => {
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

            try {
                await workspace.fs.stat(edit.uri)
                window.showInformationMessage(
                    edit.type + ' already exists at ' + asWorkspacePath(edit.uri)
                )
            } catch {
                window.showInformationMessage(
                    edit.type + ' created at ' + asWorkspacePath(edit.uri)
                )
            }
        })
        workspace.applyEdit(wsEdit)
    } else {
        window.showErrorMessage('no workspace detected, unable to create files')
    }
}
