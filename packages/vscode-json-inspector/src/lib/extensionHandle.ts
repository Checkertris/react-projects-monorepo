import type { ExtensionContext } from 'vscode'

export abstract class ExtensionHandle {
    constructor(protected readonly context: ExtensionContext) {}
}
