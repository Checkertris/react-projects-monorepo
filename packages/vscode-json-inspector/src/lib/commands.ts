import { commands, type ExtensionContext } from 'vscode'
import { Handle } from './handle'
import { Emitter } from './misc'

export class Commands extends Handle {
    private emitter = new Emitter<{ command_id: string }>()

    constructor(context: ExtensionContext) {
        super(context)
        context.subscriptions.push(this.emitter)
    }

    public register(id: string, command: (emit: () => void) => void) {
        this.context.subscriptions.push(
            commands.registerCommand(id, () => command(() => this.emitter.fire({ command_id: id })))
        )
    }

    public onCommand(id: string, callback: () => void) {
        this.context.subscriptions.push(
            this.emitter.addListener((event) => {
                if (event.command_id === id) callback()
            })
        )
    }
}
