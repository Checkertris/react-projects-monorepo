import { Uri, workspace, type ExtensionContext, type FileSystemWatcher } from 'vscode'
import { ExtensionHandle, FileEdit } from '~/lib'
import { SchemaInstance } from './schemaInstance'
import {
    SERVICE_FOLDER_URI,
    type ExtensionWorkspaceStateHandle,
} from './extensionWorkspacesStateHandle'

export class ServiceFolderHandle extends ExtensionHandle {
    private static readonly service_folder_name = 'json-inspector'
    private static readonly schema_folder_name = 'schemas'
    private static readonly output_folder_name = 'output'
    private static readonly schema_file_glob_pattern = '*.schema.{ts,js}'
    public static readonly file_type = ['.schema.ts', '.schema.js']

    private watcher?: FileSystemWatcher
    private schemas: Map<string, SchemaInstance> = new Map()

    private static outputFolderUri(uri: Uri) {
        return Uri.joinPath(uri, this.service_folder_name, this.output_folder_name)
    }

    private static schemaFolderUri(uri: Uri) {
        return Uri.joinPath(uri, this.service_folder_name, this.schema_folder_name)
    }

    public static async createFolders(uri: Uri) {
        await FileEdit.editWorkspace([
            { type: 'folder', uri: this.schemaFolderUri(uri) },
            { type: 'folder', uri: this.outputFolderUri(uri) },
        ])
    }

    public static createWatcher(uri: Uri) {
        return workspace.createFileSystemWatcher(
            this.schemaFolderUri(uri).path + '/' + this.schema_file_glob_pattern
        )
    }

    constructor(
        private workspaceHandle: ExtensionWorkspaceStateHandle,
        context: ExtensionContext
    ) {
        super(context)
        workspaceHandle.onStateChange(({ key, value }) => {
            switch (key) {
                case SERVICE_FOLDER_URI:
                    this.onPathChange(value)
            }
        })

        const uri = workspaceHandle.getServiceFolderUri()
        if (uri) this.onPathChange(uri)
    }

    private onPathChange(uri: Uri) {
        this.watcher?.dispose()
        this.watcher = ServiceFolderHandle.createWatcher(uri)
        this.context.subscriptions.push(this.watcher)

        FileEdit.readDirectory(uri, (file) =>
            ServiceFolderHandle.file_type.some((type) => file.name.includes(type))
        ).then((files) => files.forEach((file) => this.updateSchema(file.uri, 'set')))

        this.watcher.onDidChange((uri) => this.updateSchema(uri, 'set'))

        this.watcher.onDidCreate((uri) => this.updateSchema(uri, 'set'))

        this.watcher.onDidDelete((uri) => this.updateSchema(uri, 'delete'))
    }

    private updateSchema(uri: Uri, action: 'set' | 'delete') {
        if (action == 'set') this.schemas.set(uri.path, new SchemaInstance(uri))
        if (action == 'delete') this.schemas.delete(uri.path)
        this.workspaceHandle.setSchemaItems(Array.from(this.schemas.values()))
    }
}
