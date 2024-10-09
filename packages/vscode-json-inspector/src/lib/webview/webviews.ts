import { Handle } from '../handle'
import type { BaseWebviewProvider } from './baseWebviewProvider'
import { Disposable, window, type ExtensionContext } from 'vscode'
import type { BaseWebviewContainer } from './baseWebviewContainer'
import type { Message } from '../../../shared/webviewMessages'

export class Webviews<T extends Message> extends Handle {
    private webviews: Set<BaseWebviewContainer<T>> = new Set()

    constructor(context: ExtensionContext) {
        super(context)
        context.subscriptions.push(new Disposable(() => this.webviews.clear()))
    }

    registerProvider(
        id: string,
        constructor: new (context: ExtensionContext) => BaseWebviewProvider<T>
    ) {
        const provider = new constructor(this.context)
        this.webviews.add(provider)
        this.context.subscriptions.push(window.registerWebviewViewProvider(id, provider))
    }

    postToAllWebviews(message: T) {
        for (var webview of this.webviews) {
            webview.postToWebview(message)
        }
    }
}
