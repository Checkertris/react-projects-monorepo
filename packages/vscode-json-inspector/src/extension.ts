import { Uri, window, workspace, type ExtensionContext } from 'vscode'
import {
    Commands,
    FileEdit,
    FolderItem,
    getAllWorkspaceDirectories,
    startQuickPick,
    Webviews,
    WorkspaceState,
} from './lib'
import { createServiceFolder } from './extension/utils'
import { MessageAction } from 'shared'

export const SET_SERVICE_FOLDER_COMMAND = 'jsonInspector.setServiceFolder'
export const HOME_VIEW = 'jsonInspector.homeView'

export const SERVICE_FOLDER_URI = 'service_folder_uri'
export const SCHEMA_ITEMS = 'schema_items'

export const SERVICE_FOLDER_PATH = 'service_folder_path'
export const HAS_WORKSPACE = 'has_workspace'
export const SCHEMA_NAMES = 'schema_names'

export type Message =
    | { type: typeof SERVICE_FOLDER_PATH; data: string; action: MessageAction.SetState }
    | { type: typeof HAS_WORKSPACE; data: boolean; action: MessageAction.SetState }
    | { type: typeof SCHEMA_NAMES; data: string[]; action: MessageAction.SetState }

type WorkspaceStateValues = {
    [SERVICE_FOLDER_URI]: Uri
}

export function activate(context: ExtensionContext) {
    const commands = new Commands(context)
    const webviews = new Webviews<Message>(context)
    const workspaceState = new WorkspaceState<WorkspaceStateValues>(context, {
        [SERVICE_FOLDER_URI]: workspace.workspaceFolders
            ? workspace.workspaceFolders[0]?.uri
            : undefined,
    })

    //messages
    function updateHasWorkspace() {
        webviews.postToAllWebviews({
            type: HAS_WORKSPACE,
            data: !!workspace.name,
            action: MessageAction.SetState,
        })
    }

    function updateServiceFolderPath(uri: Uri) {
        webviews.postToAllWebviews({
            type: SERVICE_FOLDER_PATH,
            data: './' + FileEdit.formatPath(uri, false, true),
            action: MessageAction.SetState,
        })
    }

    updateHasWorkspace()
    const uri = workspaceState.get(SERVICE_FOLDER_URI)
    if (uri) updateServiceFolderPath(uri)

    workspace.onDidChangeWorkspaceFolders(() => updateHasWorkspace())
    workspaceState.onStateChange(({ key, value }) => {
        switch (key) {
            case SERVICE_FOLDER_URI:
                updateServiceFolderPath(value)
        }
    })

    //Commands
    const CANCEL_MESSAGE = 'create source folder action cancelled'
    const NO_WORKSPACE_MESSAGE = 'No Workspace detected, unable to set folder path.'

    commands.register(SET_SERVICE_FOLDER_COMMAND, async (emit: () => void) => {
        if (!workspace.workspaceFolders) window.showErrorMessage(NO_WORKSPACE_MESSAGE)
        startQuickPick<FolderItem>(
            { onCancel: () => window.showInformationMessage(CANCEL_MESSAGE) },
            (input) => {
                input.setPlaceholder('Select a path to initialize source folder...')
                input.setItemsAsync(getAllWorkspaceDirectories())
                input.onDidConfirm((folder) => {
                    workspaceState.update(SERVICE_FOLDER_URI, folder.uri)
                    createServiceFolder(folder.uri).then(emit)
                })
            }
        )
    })

    //Languages
    // const m = new DefaultExportChecker(context, ['src', 'extension', 'languages', 'potato.ts'])
}
