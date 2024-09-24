import vscode from 'vscode'
import * as extension from '~/vscode-extension'

function getUri(webview: vscode.Webview, extensionUri: vscode.Uri, pathList: string[]) {
    return webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, ...pathList))
}

export abstract class WebviewContainer<
    C extends vscode.WebviewPanel | vscode.WebviewView,
    R extends { type: string; data?: unknown } = { type: string; data?: unknown },
    D extends { type: string; data?: unknown } = { type: string; data?: unknown },
> {
    protected viewContainer?: C

    constructor(
        protected readonly extensionContext: vscode.ExtensionContext,
        public readonly index: string
    ) {}

    protected setAndStartWebview(viewContainer: C) {
        const disposables: vscode.Disposable[] = []

        this.viewContainer = viewContainer
        this.viewContainer.webview.html = this.getWebviewHtml(this.viewContainer.webview)

        disposables.push(
            this.viewContainer.webview.onDidReceiveMessage(this.onReceiveAppMessage.bind(this))
        )
        disposables.concat(this.onWebviewStart(this.viewContainer))

        this.viewContainer.onDidDispose(() => {}, {}, disposables)
    }

    protected abstract onReceiveAppMessage(message: R | extension.AppMessage): void

    protected abstract onWebviewStart(webviewView: C): vscode.Disposable[]

    protected postAppMessage(message: D) {
        if (this.viewContainer?.webview) {
            this.viewContainer.webview.postMessage(message)
        }
    }

    protected getWebviewHtml(webview: vscode.Webview) {
        const stylesUri = getUri(webview, this.extensionContext.extensionUri, [
            'webview-ui',
            'build',
            'assets',
            `${this.index}.css`,
        ])
        const codiconFontUri = getUri(webview, this.extensionContext.extensionUri, [
            'webview-ui',
            'build',
            'assets',
            'codicon.ttf',
        ])
        const scriptUri = getUri(webview, this.extensionContext.extensionUri, [
            'webview-ui',
            'build',
            'views',
            `${this.index}.js`,
        ])

        const nonce = extension.getNonce()

        /* eslint no-console: "error" */
        console.log('webview data: ', {
            index: this.index,
            stylesUri: stylesUri.toString(),
            codiconFontUri: codiconFontUri.toString(),
            scriptUri: scriptUri.toString(),
            nonce,
        })

        /* eslint-disable  @typescript-eslint/restrict-template-expressions */
        return `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'nonce-${nonce}'; font-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
              <link rel="stylesheet" type="text/css" href="${stylesUri}">
              <title>${this.index}</title>
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
