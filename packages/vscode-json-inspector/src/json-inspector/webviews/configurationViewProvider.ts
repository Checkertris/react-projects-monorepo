import vscode from 'vscode'
import * as extension from '~/vscode-extension'
import {
    JSON_SCHEMA_FILE_TYPE,
    INITIALISE_WORKSPACE_COMMAND,
    REFERENCE_FOLDER_NAME,
    SCHEMA_FOLDER_NAME,
    SET_REF_FOLDER_COMMAND,
} from '~/constants'
import { JsonInspectorContext } from '../workspaceState'
import type { ConfigAppMessage, ConfigViewMessage } from '../types'

const VIEW_INDEX = 'main'

export class ConfigurationViewProvider extends extension.WebviewProvider<
    ConfigAppMessage,
    ConfigViewMessage
> {
    private folderWatcher?: vscode.FileSystemWatcher | undefined
    constructor(context: vscode.ExtensionContext) {
        super(context, VIEW_INDEX)
    }

    onWebviewStart(webviewView: vscode.WebviewView): vscode.Disposable[] {
        const disposables: vscode.Disposable[] = []
        extension.Context.addCommandListener(
            INITIALISE_WORKSPACE_COMMAND,
            this.onHasWorkspace.bind(this)
        )

        extension.Context.addCommandListener(SET_REF_FOLDER_COMMAND, this.onPathChange.bind(this))

        disposables.push(webviewView.onDidChangeVisibility(this.onHasWorkspace.bind(this)))
        disposables.push(
            vscode.workspace.onDidChangeWorkspaceFolders(this.onHasWorkspace.bind(this))
        )
        return disposables
    }
    protected onReceiveAppMessage(message: ConfigAppMessage | extension.AppMessage) {
        switch (message.type) {
            case 'app-ready':
                this.onHasWorkspace()
                this.onFolderChange()
                this.onPathChange()
                return
        }
    }

    private onHasWorkspace() {
        this.postAppMessage({ type: 'has-workspace', data: !!vscode.workspace.name })
    }

    private onPathChange() {
        const path = JsonInspectorContext.getReferenceFolderPath()
        this.postAppMessage({ type: 'path-change', data: path })

        if (this.folderWatcher) this.folderWatcher.dispose()
        if (path) {
            this.folderWatcher = vscode.workspace.createFileSystemWatcher(
                path + '/' + REFERENCE_FOLDER_NAME + '/*.' + JSON_SCHEMA_FILE_TYPE
            )
            this.folderWatcher.onDidCreate(this.onFolderChange.bind(this))
            this.folderWatcher.onDidDelete(this.onFolderChange.bind(this))
            return
        }
        this.folderWatcher = undefined
    }

    private onFolderChange() {
        const path = JsonInspectorContext.getReferenceFolderPath()
        if (!path) {
            this.postAppMessage({
                type: 'folder-change',
                data: {
                    refFolder: false,
                    schemaFolder: false,
                    files: [],
                },
            })
        } else {
            const refUri = vscode.Uri.file(path + '/' + REFERENCE_FOLDER_NAME)
            const schemaUri = vscode.Uri.joinPath(refUri, SCHEMA_FOLDER_NAME)
            try {
                vscode.workspace.fs.stat(refUri).then(() => {
                    try {
                        vscode.workspace.fs
                            .stat(schemaUri)
                            .then(() => {
                                return extension.readDirectory(schemaUri, {
                                    onlyInclude: [JSON_SCHEMA_FILE_TYPE],
                                    type: vscode.FileType.File,
                                })
                            })
                            .then((files) =>
                                this.postAppMessage({
                                    type: 'folder-change',
                                    data: {
                                        refFolder: true,
                                        schemaFolder: false,
                                        files: files,
                                    },
                                })
                            )
                    } catch {
                        this.postAppMessage({
                            type: 'folder-change',
                            data: {
                                refFolder: true,
                                schemaFolder: false,
                                files: [],
                            },
                        })
                    }
                })
            } catch {
                this.postAppMessage({
                    type: 'folder-change',
                    data: {
                        refFolder: false,
                        schemaFolder: false,
                        files: [],
                    },
                })
            }
        }
    }
}

// private triggerOpenNewForm(path: string, name: string) {
//     this.newFormTimeout.trigger(async () => {
//         await import(path).then((imprt) => {
//             if (imprt.default) {
//                 if (isExtends<ObjectSchema<any, any, any, any>>(imprt.default)) {
//                     this.postAppMessage({
//                         type: "new-form-callback",
//                         data: imprt.default,
//                     })
//                     return
//                 }
//             }
//             return vscode.window.showInformationMessage(
//                 "unable to open " + name + " from " + path
//             )
//         })
//     })
// }
