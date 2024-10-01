import { window, workspace } from 'vscode'
import { CommandSchema, FolderInstance } from '~/lib'
import { SET_SERVICE_FOLDER_COMMAND } from './constants'
import { FileSearch } from '~/lib/misc/files/fileSearch'
import { QuickpickInput } from '~/lib/quickPicks/quickPicks'
import { ServiceFolderHandle } from './serviceFolderHandle'

const CANCEL_MESSAGE = 'create source folder action cancelled'
const NO_WORKSPACE_MESSAGE = 'No Workspace detected, unable to set folder path.'

export const setServiceFolderCommand = new CommandSchema(
    SET_SERVICE_FOLDER_COMMAND,
    async (emit) => {
        if (!workspace.workspaceFolders) {
            window.showErrorMessage(NO_WORKSPACE_MESSAGE)
            return
        }

        QuickpickInput.createQuickPick<FolderInstance, { folder?: FolderInstance | undefined }>(
            async (quickpick, input) => {
                quickpick.placeholder = 'Select an existing path to initialize source folder...'
                quickpick.items = QuickpickInput.quickpickGroup(
                    await FileSearch.getAllWorkspaceFolders()
                )
                input.onDidAccept((state, folder) => ({ folder }))

                input.nextInputBox((inputBox, input) => {
                    inputBox.placeholder = 'Confirm...'
                    input.onDidAccept(({ folder }) => {
                        if (!folder) window.showInformationMessage(CANCEL_MESSAGE)
                        else {
                            ServiceFolderHandle.createFolders(folder.uri).then(emit)
                        }
                    })
                })
            }
        ).show({})
    }
)
