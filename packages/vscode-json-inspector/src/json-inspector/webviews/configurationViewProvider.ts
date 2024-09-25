import { ExtensionContext, FileSystemWatcher, WebviewView, workspace, Disposable } from 'vscode'
import {
    JSON_SCHEMA_FILE_TYPE,
    SERVICE_FOLDER_NAME,
    SET_SERVICE_FOLDER_COMMAND,
    CONFIGURATION_VIEW,
    APP_READY_MESSAGE,
    HAS_WORKSPACE_MESSAGE,
    NEW_PATH_MESSAGE,
    CONFIGURATION_VIEW_INDEX,
} from 'static'
import { BaseWebviewProvider, ExtensionHandle, Message } from '~/vscode-extension'
import { JsonInspectorHandle } from '~/extension'

export class ConfigurationViewProvider extends BaseWebviewProvider {
    private folderWatcher?: FileSystemWatcher | undefined
    constructor(context: ExtensionContext, listeners: ((message: Message) => void)[]) {
        super(CONFIGURATION_VIEW, CONFIGURATION_VIEW_INDEX, context, listeners)
    }

    onWebviewStart(webviewView: WebviewView): Disposable[] {
        const disposables: Disposable[] = []
        ExtensionHandle.addCommandListener(SET_SERVICE_FOLDER_COMMAND, this.onPathChange.bind(this))
        disposables.push(webviewView.onDidChangeVisibility(this.onHasWorkspace.bind(this)))
        disposables.push(workspace.onDidChangeWorkspaceFolders(this.onHasWorkspace.bind(this)))
        return disposables
        return []
    }
    public override onDidReceiveMessage(message: Message) {
        switch (message.type) {
            case APP_READY_MESSAGE:
                this.onHasWorkspace()
                // this.onFolderChange()
                this.onPathChange()
                return
        }
    }
    private onHasWorkspace() {
        this.postMessage(HAS_WORKSPACE_MESSAGE, !!workspace.name)
    }

    private onPathChange() {
        const path = JsonInspectorHandle.getServiceFolderPath()
        this.postMessage(NEW_PATH_MESSAGE, path)

        if (this.folderWatcher) this.folderWatcher.dispose()
        if (path) {
            this.folderWatcher = workspace.createFileSystemWatcher(
                path + '/' + SERVICE_FOLDER_NAME + '/*.' + JSON_SCHEMA_FILE_TYPE
            )
            // this.folderWatcher.onDidCreate(this.onFolderChange.bind(this))
            // this.folderWatcher.onDidDelete(this.onFolderChange.bind(this))
            return
        }
        this.folderWatcher = undefined
    }

    // private onFolderChange() {
    //     const path = JsonInspectorHandle.getServiceFolderPath()
    //     if (!path) {
    //         this.postAppMessage('folder-change', '')
    //     } else {
    //         const refUri = Uri.file(path + '/' + SERVICE_FOLDER_NAME)
    //         const schemaUri = Uri.joinPath(refUri, SCHEMA_FOLDER_NAME)
    //         try {
    //             workspace.fs.stat(refUri).then(() => {
    //                 try {
    //                     workspace.fs
    //                         .stat(schemaUri)
    //                         .then(() => {
    //                             return readDirectory(schemaUri, {
    //                                 onlyInclude: [JSON_SCHEMA_FILE_TYPE],
    //                                 type: FileType.File,
    //                             })
    //                         })
    //                         .then((files) =>
    //                             this.postAppMessage({
    //                                 type: 'folder-change',
    //                                 data: {
    //                                     refFolder: true,
    //                                     schemaFolder: false,
    //                                     files: files,
    //                                 },
    //                             })
    //                         )
    //                 } catch {
    //                     this.postAppMessage({
    //                         type: 'folder-change',
    //                         data: {
    //                             refFolder: true,
    //                             schemaFolder: false,
    //                             files: [],
    //                         },
    //                     })
    //                 }
    //             })
    //         } catch {
    //             this.postAppMessage({
    //                 type: 'folder-change',
    //                 data: {
    //                     refFolder: false,
    //                     schemaFolder: false,
    //                     files: [],
    //                 },
    //             })
    //         }
    //     }
    // }
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
//             return window.showInformationMessage(
//                 "unable to open " + name + " from " + path
//             )
//         })
//     })
// }
