export enum Origin {
    WebviewProvider,
    WebviewApp,
}

export interface Message {
    type: string
    data?: unknown
    origin: {
        type: Origin
        id?: string
    }
}
