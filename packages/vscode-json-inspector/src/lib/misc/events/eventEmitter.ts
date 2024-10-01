import vscode, { Disposable } from 'vscode'
import type { Event } from './event'

export abstract class EventEmitter<T extends object, B extends string> extends Disposable {
    private emitter = new vscode.EventEmitter<T>()
    public readonly onEvent = event<T, B>(this.emitter.event)

    constructor() {
        super(() => this.emitter.dispose())
    }

    public fire(event: T) {
        console.log(`⭐ "EVENT" =>`, event)
        this.emitter.fire(event)
    }
}

function event<T, B>(event: vscode.Event<T>) {
    return event as Event<T, B>
}
