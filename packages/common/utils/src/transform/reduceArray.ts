interface ArrayTransforms<T, KOut extends PropertyKey, VOut> {
    key?: (item: T, index: number) => KOut
    value?: (item: T, index: number) => VOut
    filter?: (item: T, index: number) => boolean
}

export function reduceArray<T, KOut extends PropertyKey = number, VOut = T>(
    array: T[],
    transform?: ArrayTransforms<T, KOut, VOut>
) {
    return array.reduce(
        (prev, item, index) => {
            if (transform?.filter ? transform.filter(item, index) : true) {
                const key = transform?.key ? transform.key(item, index) : index
                const value = transform?.value ? transform.value(item, index) : item
                return { ...prev, [key]: value }
            }
            return prev
        },
        {} as Record<KOut, VOut>
    )
}
