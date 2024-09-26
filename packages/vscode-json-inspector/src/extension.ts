import { SERVICE_FOLDER_URI_STATE } from 'shared'
import { commands, ExtensionContext, Uri, window, workspace } from 'vscode'
import { ExtensionHandle } from '~/vscode-extension'
import { setServiceFolderCommand } from './json-inspector/setRefFolderCommand'
import { HomeViewProvider } from './json-inspector/homeViewProvider'
import { jsonInspectorProjectDiagnostics } from './json-inspector/diagnostics/jsonInspectorDiagnostics'

export function activate(context: ExtensionContext) {
    JsonInspectorHandle.activate(context)
}

export class JsonInspectorHandle extends ExtensionHandle {
    public static override activate(context: ExtensionContext) {
        ExtensionHandle.activate(context)
        this.registerCommand(setServiceFolderCommand)
        this.registerWebviewProvider(HomeViewProvider)
        this.registerDiagnosticCollection(jsonInspectorProjectDiagnostics)
    }
    public static getServiceFolderUri(): Uri | undefined {
        const uri: Uri | undefined = this.context().workspaceState.get(SERVICE_FOLDER_URI_STATE)
        if (uri) return uri
        if (workspace.workspaceFolders) return workspace.workspaceFolders[0]?.uri
        return undefined
    }

    public static setServiceFolderUri(uri: Uri) {
        this.context().workspaceState.update(SERVICE_FOLDER_URI_STATE, uri)
    }
}
