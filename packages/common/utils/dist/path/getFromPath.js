export function getFromPath(obj, path) {
    const keys = path.split('.');
    let currentObj = obj;
    for (const key of keys) {
        const value = currentObj[key];
        if (value === undefined || value === null) {
            return undefined;
        }
        currentObj = value;
    }
    return currentObj;
}
//# sourceMappingURL=getFromPath.js.map