import vscode from 'vscode'
import * as extension from '~/vscode-extension'
import * as utils from '@common/utils'

interface ReadDirectoryOptions {
    ignore?: string[]
    onlyInclude?: string[]
    type?: vscode.FileType
}

export async function readDirectory(
    root: vscode.Uri,
    options?: ReadDirectoryOptions
): Promise<extension.FileInfo[]> {
    const dirs = await vscode.workspace.fs.readDirectory(root)
    dirs.filter(([file, type]) => {
        if (options?.type && type !== options.type) return false
        if (options?.onlyInclude)
            return new RegExp(utils.seperate(options.onlyInclude, '|')).test(file)
        if (options?.ignore) return !RegExp(utils.seperate(options.ignore, '|')).test(file)
        return true
    })

    return dirs.map(([name, type]) => ({
        uri: vscode.Uri.joinPath(root, name),
        type,
        name,
    }))
}

async function readDirectoryRecursive(
    root: vscode.Uri,
    options: ReadDirectoryOptions
): Promise<extension.FileInfo[]> {
    return readDirectory(root, options)
        .then((files) =>
            Promise.all(files.map(async (file) => await readDirectoryRecursive(file.uri, options)))
        )
        .then((files) => utils.flatten(files))
}

export async function readWorkspaceFolders(
    options: ReadDirectoryOptions
): Promise<extension.FileInfo[]> {
    const folders = vscode.workspace.workspaceFolders
    if (folders) {
        return await Promise.all(
            folders.map(async (folder) => await readDirectoryRecursive(folder.uri, options))
        ).then((files) => [
            ...folders.map((folder) => ({
                type: 'rootFolder' as const,
                uri: folder.uri,
                name: folder.name,
            })),
            ...utils.flatten(files),
        ])
    }
    return []
}
