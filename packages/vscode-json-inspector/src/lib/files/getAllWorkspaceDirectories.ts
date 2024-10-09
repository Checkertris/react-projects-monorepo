import { FileType, Uri, workspace } from 'vscode'
import { flatten } from '@common/utils'
import type { FileItem } from '.'
import { DocumentIdem, ErrorAction, FolderItem } from '~/lib'
import { SystemFilter } from '../misc/systemFilter'

export interface FileData {
    uri: Uri
    name: string
    type: FileType
}

export async function getAllWorkspaceDirectories() {
    if (!workspace.workspaceFolders) return []
    let folders: FolderItem[][] = []

    for (var folder of workspace.workspaceFolders) {
        const filter = new SystemFilter()
        folders.push(await getAllDirectories(folder.uri, filter.filter))

        try {
            await filter.test()
        } catch (err) {
            if (err instanceof ErrorAction) err.execute()
            return folders
        }
    }
    return folders
}

async function getAllDirectories(
    root: Uri,
    filter?: (file: FileData) => boolean
): Promise<FileItem[]> {
    const rootInstance = new FolderItem(root)
    const immediateDirs = await readDirectory(root, (file) => {
        if (file.type != FileType.Directory) return false
        if (filter) return filter(file)
        return true
    })
    const restDirs = immediateDirs.map((dir) => getAllDirectories(dir.uri, filter))
    return [rootInstance, ...flatten(await Promise.all(restDirs))]
}

async function readDirectory(root: Uri, filter?: (file: FileData) => boolean): Promise<FileItem[]> {
    const dirs = await workspace.fs.readDirectory(root)
    let fileData = dirs.map(([name, type]) => ({ name, type, uri: Uri.joinPath(root, name) }))
    if (filter) fileData = fileData.filter(filter)
    const instances = fileData.map((file) => {
        switch (file.type) {
            case FileType.Directory:
                return new FolderItem(file.uri)
            default:
                return new DocumentIdem(file.uri)
        }
    })
    return instances
}
