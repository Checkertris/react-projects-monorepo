import fs from 'fs';
import { flatten } from './transform';
import { seperate } from './string';
function readDirectory(root, options) {
    const filter = (file) => !new RegExp(seperate(options?.ignore ? options.ignore : [], '|')).test(file);
    let dirs = fs.readdirSync(root).filter(filter);
    if (options?.type === 'file')
        dirs = dirs.filter((path) => fs.statSync(path).isFile());
    if (options?.type === 'folder')
        dirs = dirs.filter((path) => fs.statSync(path).isDirectory());
    return dirs.map((file) => root + '/' + file);
}
export function readDirectoryRecursive(root, options) {
    const dirs = readDirectory(root, options).map((path) => readDirectoryRecursive(path, options));
    if (options?.includeRoot)
        return [root, ...flatten(dirs)];
    return flatten(dirs);
}
//# sourceMappingURL=fileSystem.js.map