import vscode from 'vscode'
import { WebviewContainer } from './webviewContainer'

export abstract class WebviewPanelInstance<
    R extends { type: string; data?: unknown } = { type: string; data?: unknown },
    D extends { type: string; data?: unknown } = { type: string; data?: unknown },
> extends WebviewContainer<vscode.WebviewPanel, R, D> {
    constructor(
        context: vscode.ExtensionContext,
        viewIndex: string,
        viewId: string,
        panelTitle: string,
        column: vscode.ViewColumn
    ) {
        super(context, viewIndex)
        const panel = vscode.window.createWebviewPanel(viewId, panelTitle, column, {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.joinPath(this.extensionContext.extensionUri, 'build')],
        })
        this.setAndStartWebview(panel)
    }
}
