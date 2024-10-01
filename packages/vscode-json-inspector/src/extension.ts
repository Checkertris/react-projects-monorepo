import { type ExtensionContext } from 'vscode'
import { CommandHandle } from './lib'
import { ExtensionWorkspaceStateHandle } from './extensions/extensionWorkspacesStateHandle'
import { ExtensionWebviewHandle } from './extensions/webview/extensionWebviewHandle'
import { HomeViewProvider } from './extensions/webview'
import { setServiceFolderCommand } from './extensions/setServiceFolderCommand'

export function activate(context: ExtensionContext) {
    const commands = new CommandHandle(context)
    commands.register(setServiceFolderCommand)

    const workspace = new ExtensionWorkspaceStateHandle(context)
    const webview = new ExtensionWebviewHandle(workspace, context)
    webview.registerWebviewProvider(HomeViewProvider)
}

