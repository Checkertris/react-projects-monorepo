import vscode from 'vscode'
import * as extension from '~/vscode-extension'

import {
    CONFIGURATION_VIEW,
    CREATE_REF_FOLDER_COMMAND,
    INITIALISE_WORKSPACE_COMMAND,
    SET_REF_FOLDER_COMMAND,
} from '~/constants'
import {
    createRefFolderCommand,
    initialiseWorkspaceCommand,
    setRefFolderCommand,
    ConfigurationViewProvider,
} from '~/json-inspector'

const EXTENSION_COMMANDS = {
    [CREATE_REF_FOLDER_COMMAND]: createRefFolderCommand,
    [SET_REF_FOLDER_COMMAND]: setRefFolderCommand,
    [INITIALISE_WORKSPACE_COMMAND]: initialiseWorkspaceCommand,
}

const WEBVIEW_PROVIDERS = {
    [CONFIGURATION_VIEW]: ConfigurationViewProvider,
}

// const DIAGNOSTIC_COLLECTIONS = {
//     [EXSTENSION_DIAGNOSTIC_COLLECTION]: FormEditorDiagnosticConfig,
// }

export function activate(context: vscode.ExtensionContext) {
    const disposables: vscode.Disposable[] = []
    context.subscriptions.push(
        new vscode.Disposable(() => vscode.Disposable.from(...disposables).dispose())
    )

    vscode.commands.registerCommand('extension.sayHello', () => {
        vscode.window.showInformationMessage('Hello World TEST TES TEST!')
    })

    disposables.push(
        vscode.window.registerWebviewViewProvider(
            CONFIGURATION_VIEW,
            new ConfigurationViewProvider(context)
        )
    )

    // disposables.push(ExstensionCommands.register(context, EXTENSION_COMMANDS))

    // disposables.push(ExstensionWebviewProviders.register(context, WEBVIEW_PROVIDERS))

    // disposables.push(ExstensionDiagnostics.register(context, DIAGNOSTIC_COLLECTIONS))
}
