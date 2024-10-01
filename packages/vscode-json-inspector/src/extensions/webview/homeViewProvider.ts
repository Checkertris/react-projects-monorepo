import type { ExtensionContext, WebviewView } from 'vscode'
import { BaseWebviewProvider, WebviewMessageEmitter, type WebviewMessageEvent } from '~/lib'
import type { ExtensionWebviewMessage } from './extensionWebviewHandle'
import { HOME_VIEW } from '../constants'

const VIEW_INDEX = 'home'

export class HomeViewProvider extends BaseWebviewProvider<ExtensionWebviewMessage> {
    constructor(
        messageEmitter: WebviewMessageEmitter<ExtensionWebviewMessage>,
        context: ExtensionContext
    ) {
        console.log('🚀 ~ HomeViewProvider ~ messageEmitter:', messageEmitter)
        super(HOME_VIEW, VIEW_INDEX, messageEmitter, context)
    }

    startWebviewView(webviewView: WebviewView) {}

    protected override onDidReceiveMessage(
        message: WebviewMessageEvent<ExtensionWebviewMessage>
    ): void {}
}
