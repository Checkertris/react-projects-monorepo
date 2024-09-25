import {
    SET_SERVICE_FOLDER_COMMAND,
    SERVICE_FOLDER_NAME,
    OUTPUT_FOLDER_NAME,
    SCHEMA_FOLDER_NAME,
} from 'static'
import { CommandSchema, editWorkspace, getAllWorkspaceFolders } from '~/vscode-extension'
import { Uri, window, workspace } from 'vscode'
import { FileItem } from '~/vscode-extension/fileItem'
import { JsonInspectorHandle } from '~/extension'

export const setServiceFolderCommand = new CommandSchema(SET_SERVICE_FOLDER_COMMAND, async () => {
    if (workspace.workspaceFolders) {
        const input = window.createQuickPick<FileItem>()
        input.placeholder = 'Select an existing path to initialise source folder...'
        input.items = await getAllWorkspaceFolders()
        input.onDidAccept(() => {
            if (input.selectedItems[0]) {
                const uri = input.selectedItems[0].uri
                JsonInspectorHandle.setServiceFolderPath(uri)
                editWorkspace(
                    [
                        {
                            type: 'folder',
                            uri: Uri.joinPath(uri, SERVICE_FOLDER_NAME, OUTPUT_FOLDER_NAME),
                        },
                        {
                            type: 'folder',
                            uri: Uri.joinPath(uri, SERVICE_FOLDER_NAME, SCHEMA_FOLDER_NAME),
                        },
                    ],
                    true
                )
            } else {
                window.showErrorMessage('create source folder action cancelled')
            }
            input.hide()
        })
        input.show()
    } else {
        window.showErrorMessage('No Workspace detected, unable to set Folder Path.')
    }
})
