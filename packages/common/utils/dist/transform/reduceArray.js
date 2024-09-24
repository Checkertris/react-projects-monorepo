export function reduceArray(array, transform) {
    return array.reduce((prev, item, index) => {
        if (transform?.filter ? transform.filter(item, index) : true) {
            const key = transform?.key ? transform.key(item, index) : index;
            const value = transform?.value ? transform.value(item, index) : item;
            return { ...prev, [key]: value };
        }
        return prev;
    }, {});
}
//# sourceMappingURL=reduceArray.js.map