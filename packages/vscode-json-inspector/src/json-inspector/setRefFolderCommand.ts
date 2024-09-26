import {
    SET_SERVICE_FOLDER_COMMAND,
    SERVICE_FOLDER_NAME,
    OUTPUT_FOLDER_NAME,
    SCHEMA_FOLDER_NAME,
} from 'shared'
import { CommandSchema, editWorkspace, getAllWorkspaceFolders } from '~/vscode-extension'
import { Uri, window, workspace } from 'vscode'
import { FileItem } from '~/vscode-extension/fileItem'
import { JsonInspectorHandle } from '~/extension'
import { asWorkspacePath } from '~/vscode-extension/utils/asWorkspacePath'

export const setServiceFolderCommand = new CommandSchema(
    SET_SERVICE_FOLDER_COMMAND,
    async (activate) => {
        if (workspace.workspaceFolders) {
            const input = window.createQuickPick<FileItem>()
            input.placeholder = 'Select an existing path to initialise source folder...'
            input.items = await getAllWorkspaceFolders()
            const uri = JsonInspectorHandle.getServiceFolderUri()
            if (uri) input.value = asWorkspacePath(uri)
            else input.value = '/'
            input.onDidAccept(() => {
                if (input.selectedItems[0]) {
                    const uri = input.selectedItems[0].uri
                    JsonInspectorHandle.setServiceFolderUri(uri)
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
                    ).then(activate)
                } else {
                    window.showErrorMessage('create source folder action cancelled')
                }
                input.hide()
            })
            input.show()
        } else {
            window.showErrorMessage('No Workspace detected, unable to set Folder Path.')
        }
    }
)
