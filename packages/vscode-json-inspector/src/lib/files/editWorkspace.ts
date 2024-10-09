import { window, workspace, WorkspaceEdit, type Uri } from 'vscode'
import { FileEdit } from './fileEdit'

const NO_WORKSPACE_MESSAGE = 'no workspace detected, unable to create files'

export interface WsEditAction {
    type: 'file' | 'folder'
    uri: Uri
}

export async function editWorkspace(edits: WsEditAction[], ignoreIfExists: boolean = true) {
    if (!workspace.workspaceFolders) window.showErrorMessage(NO_WORKSPACE_MESSAGE)
    const wsEdit = new WorkspaceEdit()

    for (var action of edits) {
        if (action.type == 'file') {
            wsEdit.createFile(action.uri, {
                ignoreIfExists,
                overwrite: !ignoreIfExists,
            })
        } else if (action.type == 'folder') {
            workspace.fs.createDirectory(action.uri)
        }

        try {
            await workspace.fs.stat(action.uri)
            window.showInformationMessage(
                action.type + ' already exists at ~' + FileEdit.formatPath(action.uri, true, true)
            )
        } catch {
            window.showInformationMessage(
                action.type + ' created at ~' + FileEdit.formatPath(action.uri, true, true)
            )
        }
    }

    workspace.applyEdit(wsEdit)
}
