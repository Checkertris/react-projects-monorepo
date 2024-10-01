import { BaseWebview } from './baseWebview'
import {
    Disposable,
    type CancellationToken,
    type ExtensionContext,
    type WebviewView,
    type WebviewViewProvider,
    type WebviewViewResolveContext,
} from 'vscode'
import type { WebviewMessageEmitter } from './webviewMessageEmitter'
import { MessageSource, type Message } from '../misc'

export abstract class BaseWebviewProvider<T extends Message>
    extends BaseWebview<T>
    implements WebviewViewProvider
{
    constructor(
        public readonly contribute_id: string,
        view_index: string,
        messageEmitter: WebviewMessageEmitter<T>,
        context: ExtensionContext
    ) {
        super(MessageSource.WEBVIEW_VIEW, view_index, messageEmitter, context)
    }

    public resolveWebviewView(
        webviewView: WebviewView,
        context: WebviewViewResolveContext,
        _token: CancellationToken
    ) {
        webviewView.webview.options = {
            enableScripts: true,
            enableCommandUris: true,
        }

        const disposables: Disposable[] = []
        webviewView.onDidDispose(() => Disposable.from(...disposables).dispose())
        disposables.push(this.startWebview(webviewView.webview))
        disposables.concat(this.startWebviewView(webviewView)!)
    }

    abstract startWebviewView(webviewView: WebviewView): Disposable[] | Disposable | void
}
