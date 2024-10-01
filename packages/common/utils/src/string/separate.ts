export function separate(strings: string[], separator: string) {
    return strings.reduce((prev, str, index) => {
        if (index == 0) return str
        return prev + separator + str
    }, '')
}
