export function separate(strings, separator) {
    return strings.reduce((prev, str, index) => {
        return prev + str + (strings.length - 1 == index ? '' : separator);
    }, '');
}
//# sourceMappingURL=seperate.js.map