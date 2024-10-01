import type { Message, MessageAction, MessageEvent } from '../misc/message'

export const APP_READY = 'app-ready'

export type WebviewMessageEvent<T extends Message> = MessageEvent<
    T | { type: typeof APP_READY; action: MessageAction.EMIT; data: object }
>
