import * as extension from '~/vscode-extension'

const REFERENCE_FOLDER_PATH_STATE = 'source-folder-path'

export class JsonInspectorContext extends extension.Context {
    public static getReferenceFolderPath(): string | undefined {
        return this.getContext().workspaceState.get(REFERENCE_FOLDER_PATH_STATE)
    }

    public static setReferenceFolderPath(path: string) {
        this.getContext().workspaceState.update(REFERENCE_FOLDER_PATH_STATE, path)
    }
}
