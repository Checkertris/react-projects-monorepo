import { SERVICE_FOLDER_URI_STATE } from 'static'
import { commands, ExtensionContext, Uri, window } from 'vscode'
import { ExtensionHandle } from '~/vscode-extension'
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
        return this.context().workspaceState.get(SERVICE_FOLDER_URI_STATE)
    }

    public static setServiceFolderPath(uri: Uri) {
        this.context().workspaceState.update(SERVICE_FOLDER_URI_STATE, uri)
    }
}
