export function findInNestedArray(array, find) {
    return array.find((group) => group.some(find))?.find(find);
}
//# sourceMappingURL=findInNestedArray.js.map