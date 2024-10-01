import { type ExtensionContext } from 'vscode'
import { CommandHandle } from './lib'
import { ExtensionWorkspaceStateHandle } from './extensions/extensionWorkspacesStateHandle'
import { ExtensionWebviewHandle } from './extensions/webview/extensionWebviewHandle'
import { HomeViewProvider } from './extensions/webview'
import { setServiceFolderCommand } from './extensions/setServiceFolderCommand'

export function activate(context: ExtensionContext) {
    Extension.activate(context)
}

export class Extension {
    static commands: CommandHandle
    static workspaceState: ExtensionWorkspaceStateHandle
    static webview: ExtensionWebviewHandle

    static activate(context: ExtensionContext) {
        this.commands = new CommandHandle(context)
        this.workspaceState = new ExtensionWorkspaceStateHandle(context)
        this.webview = new ExtensionWebviewHandle(this.workspaceState, context)

        this.webview.registerWebviewProvider(HomeViewProvider)
        this.commands.register(setServiceFolderCommand)
    }
}
