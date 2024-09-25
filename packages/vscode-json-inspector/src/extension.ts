import { SERVICE_FOLDER_URI_STATE } from 'static'
import { commands, Disposable, ExtensionContext, Uri, WebviewView, window, workspace } from 'vscode'
import { BaseWebviewProvider, ExtensionHandle, Message } from '~/vscode-extension'
import { ConfigurationViewProvider, setServiceFolderCommand } from './json-inspector'

export function activate(context: ExtensionContext) {
    commands.registerCommand('extension.sayHello', () => {
        window.showInformationMessage('Hello World TEST TES TEST!')
    })

    JsonInspectorHandle.activate(context)
}

export class JsonInspectorHandle extends ExtensionHandle {
    public static override activate(context: ExtensionContext) {
        ExtensionHandle.activate(context)
        this.registerCommand(setServiceFolderCommand)
        this.registerWebviewProvider(ConfigurationViewProvider)
    }
    public static getServiceFolderPath(): Uri | undefined {
        const uri: Uri | undefined = this.context().workspaceState.get(SERVICE_FOLDER_URI_STATE)
        if (uri) return uri
        if (workspace.workspaceFolders) return workspace.workspaceFolders[0]?.uri
        return undefined
    }

    public static setServiceFolderPath(uri: Uri) {
        this.context().workspaceState.update(SERVICE_FOLDER_URI_STATE, uri)
    }
}
