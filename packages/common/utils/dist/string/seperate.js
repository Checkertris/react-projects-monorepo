export function seperate(strs, seperator) {
    return strs.reduce((prev, str, index) => {
        return prev + str + (strs.length - 1 == index ? '' : seperator);
    }, '');
}
//# sourceMappingURL=seperate.js.map