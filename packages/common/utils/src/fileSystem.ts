import fs from 'fs'
import { flatten } from './transform'
import { seperate } from './string'

interface ReadDirectoryOptions {
    ignore?: string[]
    type?: 'file' | 'folder'
    includeRoot?: boolean
}

function readDirectory(root: string, options?: ReadDirectoryOptions) {
    const filter = (file: string) =>
        !new RegExp(seperate(options?.ignore ? options.ignore : [], '|')).test(file)
    let dirs = fs.readdirSync(root).filter(filter)
    if (options?.type === 'file') dirs = dirs.filter((path) => fs.statSync(path).isFile())
    if (options?.type === 'folder') dirs = dirs.filter((path) => fs.statSync(path).isDirectory())
    return dirs.map((file) => root + '/' + file)
}

export function readDirectoryRecursive(root: string, options?: ReadDirectoryOptions): string[] {
    const dirs = readDirectory(root, options).map((path) => readDirectoryRecursive(path, options))
    if (options?.includeRoot) return [root, ...flatten(dirs)]
    return flatten(dirs)
}
