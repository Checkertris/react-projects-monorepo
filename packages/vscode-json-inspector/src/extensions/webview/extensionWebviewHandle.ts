import { Uri, workspace, type ExtensionContext } from 'vscode'
import { APP_READY, FileEdit, MessageAction, WebviewHandle, type WebviewMessageEvent } from '~/lib'
import {
    ExtensionWorkspaceStateHandle,
    SCHEMA_ITEMS,
    SERVICE_FOLDER_URI,
} from '../extensionWorkspacesStateHandle'
import type { SchemaInstance } from '../schemaInstance'

export const SERVICE_FOLDER_PATH = 'service_folder_path'
export const HAS_WORKSPACE = 'has_workspace'
export const SCHEMA_NAMES = 'schema_names'

export type ExtensionWebviewMessage =
    | { type: typeof SERVICE_FOLDER_PATH; data: string; action: MessageAction.SET_STATE }
    | { type: typeof HAS_WORKSPACE; data: boolean; action: MessageAction.SET_STATE }
    | { type: typeof SCHEMA_NAMES; data: string[]; action: MessageAction.SET_STATE }

export class ExtensionWebviewHandle extends WebviewHandle<ExtensionWebviewMessage> {
    constructor(
        private workspaceHandle: ExtensionWorkspaceStateHandle,
        context: ExtensionContext
    ) {
        super(context)

        context.subscriptions.push(
            workspace.onDidChangeWorkspaceFolders(() => this.postHasWorkspace())
        )

        context.subscriptions.push(
            workspaceHandle.onStateChange(({ key, value }) => {
                switch (key) {
                    case SERVICE_FOLDER_URI:
                        this.postServiceFolderPath(value)
                        break
                    case SCHEMA_ITEMS:
                        this.postSchemaNames(value)
                }
            })
        )
    }

    private postSchemaNames(schemas: SchemaInstance[]) {
        this.postMessage({
            type: SCHEMA_NAMES,
            data: schemas.map((s) => s.name),
            action: MessageAction.SET_STATE,
        })
    }

    private postHasWorkspace() {
        this.postMessage({
            type: HAS_WORKSPACE,
            data: !!workspace.name,
            action: MessageAction.SET_STATE,
        })
    }

    private postServiceFolderPath(uri: Uri) {
        this.postMessage({
            type: SERVICE_FOLDER_PATH,
            data: './' + FileEdit.formatPath(uri, false, true),
            action: MessageAction.SET_STATE,
        })
    }

    protected override onDidReceiveMessage(
        event: WebviewMessageEvent<ExtensionWebviewMessage>
    ): void {
        switch (event.message.type) {
            case APP_READY:
                this.postHasWorkspace()
                this.postSchemaNames(this.workspaceHandle.getSchemaItems())
                const uri = this.workspaceHandle.getServiceFolderUri()
                if (uri) this.postServiceFolderPath(uri)
        }
    }
}
