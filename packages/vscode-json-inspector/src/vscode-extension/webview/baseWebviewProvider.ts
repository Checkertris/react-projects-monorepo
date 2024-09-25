import { WebviewContainer } from './webviewContainer'
import { Message } from '../types'
import {
    CancellationToken,
    ExtensionContext,
    WebviewView,
    WebviewViewProvider,
    WebviewViewResolveContext,
} from 'vscode'

export abstract class BaseWebviewProvider
    extends WebviewContainer<WebviewView>
    implements WebviewViewProvider
{
    constructor(
        public readonly contributeId: string,
        viewIndex: string,
        context: ExtensionContext,
        listeners: ((message: Message) => void)[]
    ) {
        super(viewIndex, context, listeners)
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
        this.setAndStartWebview(webviewView)
    }
}
