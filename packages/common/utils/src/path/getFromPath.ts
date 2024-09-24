import type { Path, ValueFromPath } from '../types'

export function getFromPath<O, K extends Path<O>>(obj: O, path: K): ValueFromPath<O, K>
export function getFromPath(obj: Record<string, unknown>, path: string): unknown {
    const keys = path.split('.')

    let currentObj = obj
    for (const key of keys) {
        const value = currentObj[key]
        if (value === undefined || value === null) {
            return undefined
        }

        currentObj = value as Record<string, unknown>
    }

    return currentObj
}
