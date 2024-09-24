import vscode from 'vscode'
import * as extension from '~/vscode-extension'
import { CREATE_REF_FOLDER_COMMAND, DEFAULT_IGNORE } from '~/constants'
import { JsonInspectorContext } from '../workspaceState'

export async function setRefFolderCommand() {
    if (vscode.workspace.workspaceFolders) {
        const input = vscode.window.createQuickPick<extension.FileQuickpick>()
        input.placeholder = 'Select an existing path to initialise source folder...'
        await extension
            .readWorkspaceFolders({
                ignore: DEFAULT_IGNORE,
                type: vscode.FileType.Directory,
            })
            .then((folders) => (input.items = extension.fileInfoToQuickpickItems(folders)))

        input.onDidAccept(() => {
            if (input.selectedItems.length === 1 && input.selectedItems[0]) {
                JsonInspectorContext.setReferenceFolderPath(input.selectedItems[0].uri.toString())
                vscode.commands.executeCommand(CREATE_REF_FOLDER_COMMAND)
            } else {
                vscode.window.showErrorMessage('create source folder action cancelled')
            }
            input.hide()
        })
        input.show()
    } else {
        vscode.window.showErrorMessage('unable to set source folder path, open a workspace first.')
    }
}
