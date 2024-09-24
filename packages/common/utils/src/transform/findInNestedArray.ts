export function findInNestedArray<T>(array: T[][], find: (item: T) => boolean) {
    return array.find((group) => group.some(find))?.find(find)
}
