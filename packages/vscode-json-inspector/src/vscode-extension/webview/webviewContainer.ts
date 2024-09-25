import { disposeAndClear, getNonce } from '../utils'
import { Message, Origin } from '../types'
import {
    ExtensionContext,
    Uri,
    Webview,
    WebviewPanel,
    WebviewView,
    Disposable,
    window,
} from 'vscode'

function getUri(webview: Webview, extensionUri: Uri, pathList: string[]) {
    return webview.asWebviewUri(Uri.joinPath(extensionUri, ...pathList))
}

export abstract class WebviewContainer<C extends WebviewPanel | WebviewView> {
    protected viewContainer?: C

    constructor(
        public readonly viewIndex: string,
        private readonly context: ExtensionContext,
        private readonly listeners: ((message: Message) => void)[]
    ) {}

    protected abstract onWebviewStart(webviewView: C): Disposable[]

    public abstract onDidReceiveMessage(message: Message): void

    protected postMessage(type: string, data?: unknown) {
        const message = {
            type,
            data,
            origin: { type: Origin.WebviewProvider, id: this.viewIndex },
        }
        this.activateListeners(message)
        if (this.viewContainer?.webview) this.viewContainer.webview.postMessage(message)
        else window.showInformationMessage('no view container present')
    }

    protected setAndStartWebview(viewContainer: C) {
        const disposables: Disposable[] = []

        this.viewContainer = viewContainer
        this.viewContainer.webview.html = this.getWebviewHtml(this.viewContainer.webview)

        disposables.concat(this.onWebviewStart(this.viewContainer))
        disposables.push(
            this.viewContainer.webview.onDidReceiveMessage(this.activateListeners.bind(this))
        )
        this.viewContainer.onDidDispose(() => disposeAndClear(disposables))
    }

    private activateListeners(message: Message) {
        this.listeners.forEach((listener) => listener(message))
    }

    private getWebviewHtml(webview: Webview) {
        const stylesUri = getUri(webview, this.context.extensionUri, [
            'webview-ui',
            'build',
            'assets',
            `${this.viewIndex}.css`,
        ])
        const codiconFontUri = getUri(webview, this.context.extensionUri, [
            'webview-ui',
            'build',
            'assets',
            'codicon.ttf',
        ])
        const scriptUri = getUri(webview, this.context.extensionUri, [
            'webview-ui',
            'build',
            'views',
            `${this.viewIndex}.js`,
        ])

        const nonce = getNonce()

        console.log('webview data: ', {
            index: this.viewIndex,
            stylesUri: stylesUri.toString(),
            codiconFontUri: codiconFontUri.toString(),
            scriptUri: scriptUri.toString(),
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
              <title>${this.viewIndex}</title>
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
