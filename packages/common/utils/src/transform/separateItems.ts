export function separateItems<T, U>(items: T[][], separator: U) {
    return items.reduce(
        (prev, item, index) => {
            if (index == 0) return item
            return [...prev, separator, ...item]
        },
        [] as (T | U)[]
    )
}
