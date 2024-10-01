export type WorkspaceStateItem<T extends Record<string, unknown>> = {
    [K in keyof T]: {
        key: K
        value: T[K]
    }
}[keyof T]
