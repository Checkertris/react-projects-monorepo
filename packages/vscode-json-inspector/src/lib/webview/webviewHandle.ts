import { ExtensionHandle } from '../extensionHandle'
import type { BaseWebviewProvider } from './baseWebviewProvider'
import { window, type ExtensionContext } from 'vscode'
import { WebviewMessageEmitter } from './webviewMessageEmitter'
import type { WebviewMessageEvent } from './webviewMessage'
import { MessageSource, type Message } from '../misc'

export abstract class WebviewHandle<T extends Message> extends ExtensionHandle {
    private messageEmitter = new WebviewMessageEmitter<T>()

    constructor(context: ExtensionContext) {
        super(context)

        context.subscriptions.push(
            this.messageEmitter.onEvent((event) => this.onDidReceiveMessage(event))
        )
    }

    registerWebviewProvider(constructor: WebviewProviderConstructor<T>) {
        const provider = new constructor(this.messageEmitter, this.context)
        this.context.subscriptions.push(
            window.registerWebviewViewProvider(provider.contribute_id, provider)
        )
    }

    protected abstract onDidReceiveMessage(event: WebviewMessageEvent<T>): void

    protected postMessage(message: T) {
        this.messageEmitter.fire({
            message,
            source: { type: MessageSource.WEBVIEW_HANDLE },
        })
    }
}

type WebviewProviderConstructor<T extends Message> = new (
    emitter: WebviewMessageEmitter<T>,
    context: ExtensionContext
) => BaseWebviewProvider<T>
