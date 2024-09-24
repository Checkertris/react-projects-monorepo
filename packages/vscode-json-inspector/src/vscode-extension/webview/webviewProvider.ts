import vscode from 'vscode'
import { WebviewContainer } from './webviewContainer'

export abstract class WebviewProvider<
        R extends { type: string; data?: unknown } = { type: string; data?: unknown },
        D extends { type: string; data?: unknown } = { type: string; data?: unknown },
    >
    extends WebviewContainer<vscode.WebviewView, R, D>
    implements vscode.WebviewViewProvider
{
    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        /* eslint-disable  @typescript-eslint/no-unused-vars */
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken
    ) {
        webviewView.webview.options = {
            enableScripts: true,
            enableCommandUris: true,
        }
        this.setAndStartWebview(webviewView)
    }
}
