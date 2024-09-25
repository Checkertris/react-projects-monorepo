export enum Origin {
    WebviewProvider = 'WEBVIEW_PROVIDER',
    WebviewApp = 'WEBVIEW_APP',
}

export interface Message {
    type: string
    data?: unknown
    origin: {
        type: Origin
        id?: string
    }
}
