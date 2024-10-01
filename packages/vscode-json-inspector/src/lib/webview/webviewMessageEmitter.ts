import { EventEmitter, type Message } from '../misc'
import type { WebviewMessageEvent } from './webviewMessage'

export class WebviewMessageEmitter<T extends Message> extends EventEmitter<
    WebviewMessageEvent<T>,
    'WEBVIEW_MESSAGE'
> {}
