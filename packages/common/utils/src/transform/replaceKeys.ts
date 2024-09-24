export function replaceKeys<K extends PropertyKey, V>(
    object: Record<PropertyKey, V>,
    transform: (key: string) => K
) {
    return Object.entries(object).reduce(
        (prev, [key, value]) => {
            return { ...prev, [transform(key)]: value }
        },
        {} as Record<K, V>
    )
}
