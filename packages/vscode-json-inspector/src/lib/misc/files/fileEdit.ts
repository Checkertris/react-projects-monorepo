import { FileType, Uri, window, workspace, WorkspaceEdit } from 'vscode'
import { flatten } from '@common/utils'
import type { UriInstance } from '.'
import { FileInstance, FolderInstance } from '~/lib'

export interface WsEditAction {
    type: 'file' | 'folder'
    uri: Uri
}

const NO_WORKSPACE_MESSAGE = 'no workspace detected, unable to create files'

export interface FileData {
    uri: Uri
    name: string
    type: FileType
}

export class FileEdit {
    //File Edit
    static getName(uri: Uri) {
        return uri.path.split('/').pop()!
    }
    static multiRoot(): boolean {
        return !!(workspace.workspaceFolders && workspace.workspaceFolders.length > 1)
    }

    static isRoot(uri: Uri): boolean {
        return !!workspace.workspaceFolders?.find((folder) => folder.uri.path == uri.path)
    }

    static formatPath(uri: Uri, rootPlaceholder: boolean, includeWorkspaceFolders: boolean) {
        if (this.isRoot(uri)) return rootPlaceholder ? 'root' : ''
        if (!includeWorkspaceFolders) return workspace.asRelativePath(uri, false)
        return workspace.asRelativePath(uri, this.multiRoot())
    }

    public static async readDirectory(
        dir: Uri,
        filter: (file: FileData) => boolean = () => true
    ): Promise<UriInstance[]> {
        return workspace.fs
            .readDirectory(dir)
            .then((files) =>
                files
                    .map(([name, type]) => ({ name, type, uri: Uri.joinPath(dir, name) }))
                    .filter(filter)
            )
            .then((files) =>
                files.map((file) => {
                    const uri = Uri.joinPath(dir, file.name)
                    if (file.type === FileType.Directory) return new FolderInstance(uri)
                    return new FileInstance(uri)
                })
            )
    }

    public static async getAllDirectories(
        uri: Uri,
        filter: (file: FileData) => boolean = () => true
    ): Promise<UriInstance[]> {
        return [
            new FolderInstance(uri),
            ...flatten(
                await this.readDirectory(
                    uri,
                    (file) => file.type == FileType.Directory && filter(file)
                ).then((dirs) =>
                    Promise.all(
                        dirs.map(async (dir) => await this.getAllDirectories(dir.uri, filter))
                    )
                )
            ),
        ]
    }

    public static async editWorkspace(edits: WsEditAction[], ignoreIfExists: boolean = true) {
        if (!workspace.workspaceFolders) window.showErrorMessage(NO_WORKSPACE_MESSAGE)
        const wsEdit = new WorkspaceEdit()
        edits.forEach(async (edit) => {
            switch (edit.type) {
                case 'file':
                    wsEdit.createFile(edit.uri, {
                        ignoreIfExists,
                        overwrite: !ignoreIfExists,
                    })
                    break
                case 'folder':
                    workspace.fs.createDirectory(edit.uri)
            }

            try {
                await workspace.fs.stat(edit.uri)
                window.showInformationMessage(
                    edit.type + ' already exists at ~' + FileEdit.formatPath(edit.uri, true, true)
                )
            } catch {
                window.showInformationMessage(
                    edit.type + ' created at ~' + FileEdit.formatPath(edit.uri, true, true)
                )
            }
        })
        workspace.applyEdit(wsEdit)
    }
}
