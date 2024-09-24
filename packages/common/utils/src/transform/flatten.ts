export function flatten<T>(lists: T[][]): T[] {
    return lists.reduce((prev, list) => prev.concat(list), [])
}
