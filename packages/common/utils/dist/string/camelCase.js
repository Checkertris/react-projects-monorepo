export const camelCase = (str) => {
    return str
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join();
};
//# sourceMappingURL=camelCase.js.map