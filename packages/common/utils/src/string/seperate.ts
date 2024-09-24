export function seperate(strs: string[], seperator: string) {
    return strs.reduce((prev, str, index) => {
        return prev + str + (strs.length - 1 == index ? '' : seperator)
    }, '')
}
