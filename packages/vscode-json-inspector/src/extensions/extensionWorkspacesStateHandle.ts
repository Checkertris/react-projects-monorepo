import { workspace, type Uri } from 'vscode'
import { WorkspaceStateHandle } from '~/lib'
import type { SchemaInstance } from './schemaInstance'

export const SERVICE_FOLDER_URI = 'service_folder_uri'
export const SCHEMA_ITEMS = 'schema_items'

type ExtensionWorkspaceState = {
    [SERVICE_FOLDER_URI]: Uri
    [SCHEMA_ITEMS]: SchemaInstance[]
}

export class ExtensionWorkspaceStateHandle extends WorkspaceStateHandle<ExtensionWorkspaceState> {
    getServiceFolderUri(): Uri | undefined {
        const uri: Uri | undefined = this.context.workspaceState.get(SERVICE_FOLDER_URI)
        if (!uri) return workspace.workspaceFolders?.[0]?.uri
        return uri
    }

    getSchemaItems(): SchemaInstance[] {
        const items: SchemaInstance[] | undefined = this.context.workspaceState.get(SCHEMA_ITEMS)
        if (!items) return []
        return items
    }

    setSchemaItems(items: SchemaInstance[]) {
        this.emitter.fire({ key: SCHEMA_ITEMS, value: items })
        this.context.workspaceState.update(SCHEMA_ITEMS, items)
    }

    setServiceFolderUri(uri: Uri) {
        this.emitter.fire({ key: SERVICE_FOLDER_URI, value: uri })
        this.context.workspaceState.update(SERVICE_FOLDER_URI, uri)
    }
}
