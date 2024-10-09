import { Disposable } from 'vscode'
import { getNonce } from './getNonce'

export class Emitter<T extends object> extends Disposable {
    private listeners: Map<string, (event: T) => void> = new Map()

    constructor() {
        super(() => {
            this.listeners.clear()
            this.fire = () => console.error('Event trigger => event already disposed')
            this.addListener = () => {
                console.error('Event addListener => event already disposed')
                return new Disposable(() => {})
            }
        })
    }

    public fire(event: T) {
        console.log(`⭐ EVENT =>`, event)
        for (var listener of this.listeners.values()) {
            listener(event)
        }
    }

    public addListener(listener: (event: T) => void) {
        const nonce = getNonce(5)
        this.listeners.set(nonce, listener)
        return new Disposable(() => this.listeners.delete(nonce))
    }
}

export interface Event<T> {
    (listener: (e: T) => any): Disposable
}
