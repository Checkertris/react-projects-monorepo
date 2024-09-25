import { FileType, Uri, workspace } from 'vscode'
import * as utils from '@common/utils'
import { FileItem } from '../fileItem'
import { DEFAULT_IGNORE } from 'static'

interface ReadDirectoryOptions {
    ignore?: string[]
    onlyInclude?: string[]
    type?: FileType
}

async function readDirectory(root: Uri, options?: ReadDirectoryOptions): Promise<FileItem[]> {
    return workspace.fs
        .readDirectory(root)
        .then((files) =>
            files.filter(([file, type]) => {
                if (options?.type && type !== options?.type) return false
                if (options?.onlyInclude)
                    return new RegExp(
                        utils.seperate(DEFAULT_IGNORE.concat(options.onlyInclude), '|')
                    ).test(file)
                if (options?.ignore) return !RegExp(utils.seperate(options.ignore, '|')).test(file)
                return true
            })
        )
        .then((files) => files.map(([name, type]) => new FileItem(Uri.joinPath(root, name), type)))
}

async function readDirectoryRecursive(uri: Uri, includeRoot: boolean): Promise<FileItem[]> {
    const dirs = await readDirectory(uri, {
        ignore: DEFAULT_IGNORE,
        type: FileType.Directory,
    }).then((dirs) =>
        Promise.all(dirs.map(async (file) => await readDirectoryRecursive(file.uri, true)))
    )
    if (includeRoot) return [new FileItem(uri, FileType.Directory), ...utils.flatten(dirs)]
    else return utils.flatten(dirs)
}

export async function getAllWorkspaceFolders(): Promise<FileItem[]> {
    const wsFolders = workspace.workspaceFolders
    if (wsFolders) {
        return await Promise.all(
            wsFolders.map(async (folder) => await readDirectoryRecursive(folder.uri, false))
        ).then((files) => [
            ...wsFolders.map((folder) => new FileItem(folder.uri, FileType.Directory, true)),
            ...utils.flatten(files),
        ])
    }
    return []
}
