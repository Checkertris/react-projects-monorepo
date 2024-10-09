import { Handle } from '../handle'
import { Uri, type ExtensionContext, type Webview } from 'vscode'
import { getNonce } from '../misc'
import {
    APP_READY,
    type DefaultWebviewMessage,
    type Message,
} from '../../../shared/webviewMessages'

export abstract class BaseWebviewContainer<T extends Message> extends Handle {
    private webview?: Webview
    private postedMessages: Set<T> = new Set()

    constructor(private readonly view_index: string, context: ExtensionContext) {
        super(context)
    }

    public postToWebview(e: T) {
        if (!this.webview) return this.postedMessages.add(e)
        return this.webview.postMessage(e)
    }

    protected abstract onDidReceiveWebviewMessage(e: T | DefaultWebviewMessage): void

    protected startWebview(webview: Webview) {
        this.webview = webview
        webview.html = this.getWebviewHtml(webview)
        return webview.onDidReceiveMessage((e: T | DefaultWebviewMessage) => {
            this.onDidReceiveWebviewMessage(e)

            if (e.type == APP_READY) {
                for (var message of this.postedMessages) {
                    webview.postMessage(message)
                }
            }
        })
    }

    private getUri(webview: Webview, ...segments: string[]) {
        return webview.asWebviewUri(Uri.joinPath(this.context.extensionUri, ...segments))
    }

    private getWebviewHtml(webview: Webview) {
        const stylesUri = this.getUri(
            webview,
            'webview-ui',
            'dist',
            'assets',
            `${this.view_index}.css`
        )
        const codiconFontUri = this.getUri(webview, 'webview-ui', 'dist', 'assets', 'codicon.ttf')
        const scriptUri = this.getUri(
            webview,
            'webview-ui',
            'dist',
            'views',
            `${this.view_index}.js`
        )
        const nonce = getNonce()

        Handle.logInfo('webview created', {
            index: this.view_index,
            scriptUri: scriptUri?.path,
            stylesUri: stylesUri?.path,
            codiconFontUri: codiconFontUri?.path,
            cspSource: webview.cspSource,
            nonce,
        })

        return `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'nonce-${nonce}'; font-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
              <link rel="stylesheet" type="text/css" href="${stylesUri}">
              <title>${this.view_index}</title>
              <style nonce="${nonce}">
                @font-face {
                  font-family: "codicon";
                  font-display: block;
                  src: url("${codiconFontUri}") format("truetype");
                }
              </style>
            </head>
            <body>
              <div id="root"></div>
              <script type="module" nonce="${nonce}" src="${scriptUri}"></script>
            </body>
          </html>
        `
    }
}
