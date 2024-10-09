import { BaseWebviewContainer } from './baseWebviewContainer'
import {
    Disposable,
    type CancellationToken,
    type ExtensionContext,
    type WebviewView,
    type WebviewViewProvider,
    type WebviewViewResolveContext,
} from 'vscode'

export abstract class BaseWebviewProvider<T extends { type: string; data?: unknown }>
    extends BaseWebviewContainer<T>
    implements WebviewViewProvider
{
    constructor(view_index: string, context: ExtensionContext) {
        super(view_index, context)
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

        webviewView.onDidDispose(() =>
            Disposable.from(
                ...this.startWebviewView(webviewView),
                this.startWebview(webviewView.webview)
            ).dispose()
        )
    }

    abstract startWebviewView(webviewView: WebviewView): Disposable[]
}
