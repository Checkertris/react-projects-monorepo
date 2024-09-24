export function replaceKeys(object, transform) {
    return Object.entries(object).reduce((prev, [key, value]) => {
        return { ...prev, [transform(key)]: value };
    }, {});
}
//# sourceMappingURL=replaceKeys.js.map