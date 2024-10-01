import { ExtensionHandle } from '../extensionHandle'
import { Uri, type ExtensionContext, type Webview } from 'vscode'
import type { WebviewMessageEmitter } from './webviewMessageEmitter'
import type { WebviewMessageEvent } from './webviewMessage'
import { getNonce, MessageSource, type Message } from '../misc'

export abstract class BaseWebview<T extends Message> extends ExtensionHandle {
    private webview?: Webview

    constructor(
        private readonly source: MessageSource,
        private readonly view_index: string,
        protected readonly messageEmitter: WebviewMessageEmitter<T>,
        context: ExtensionContext
    ) {
        super(context)

        context.subscriptions.push(
            messageEmitter.onEvent((event) => {
                this.onDidReceiveMessage(event)
                this.webview?.postMessage(event)
            })
        )
    }

    protected startWebview(webview: Webview) {
        this.webview = webview
        webview.html = this.getWebviewHtml(webview)

        return webview.onDidReceiveMessage((message: T) => {
            const event = {
                message,
                source: {
                    type: MessageSource.APP,
                    details: { view_index: this.view_index },
                },
            }
            this.messageEmitter.fire(event)
            this.onDidReceiveMessage(event)
        })
    }

    protected abstract onDidReceiveMessage(message: WebviewMessageEvent<T>): void

    protected postMessage(message: T) {
        const event: WebviewMessageEvent<T> = {
            message,
            source: {
                type: this.source,
                details: { view_index: this.view_index },
            },
        }
        this.webview?.postMessage(event)
        this.messageEmitter.fire(event)
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

        console.log('🖨️ "WEBVIEW CREATED" =>', {
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
