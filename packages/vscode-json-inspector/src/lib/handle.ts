import { error } from 'console'
import type { ExtensionContext } from 'vscode'

export abstract class Handle {
    constructor(protected readonly context: ExtensionContext) {}
    public static logInfo(message: string, ...info: unknown[]) {
        console.log(`✨"${message.toUpperCase()}" =>`, ...info)
    }

    public static logError(message: string, ...info: unknown[]) {
        console.error(`❗"${message.toUpperCase()}" =>`, ...info)
    }
}
