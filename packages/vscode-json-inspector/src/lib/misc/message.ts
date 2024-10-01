export enum MessageAction {
    EMIT = 'emit',
    SET_STATE = 'app-state',
}

export enum MessageSource {
    APP = 'app',
    WEBVIEW_VIEW = 'webview-view',
    WEBVIEW_PANEL = 'webview-panel',
    WEBVIEW_HANDLE = 'webview-handle',
    EXTERNAL = 'external',
}

export interface Message {
    type: string
    data?: unknown
    action: MessageAction
}

export interface MessageEvent<T extends Message = Message> {
    message: T
    source: {
        type: MessageSource
        details?: { [K in string]: unknown }
    }
}
