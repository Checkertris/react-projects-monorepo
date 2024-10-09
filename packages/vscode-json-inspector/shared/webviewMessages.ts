export interface Message {
    type: string
    data?: unknown
    action?: MessageAction
}

export enum MessageAction {
    SetState,
    None,
}

export const APP_READY = 'app-ready'

export type DefaultWebviewMessage = {
    type: typeof APP_READY
    data: object
    action?: MessageAction.None
}
