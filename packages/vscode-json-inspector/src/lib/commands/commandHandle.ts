import { commands, type ExtensionContext } from 'vscode'
import { ExtensionHandle } from '../extensionHandle'
import { CommandSchema } from './commandSchema'
import { CommandEmitter } from './commandEmitter'

export class CommandHandle extends ExtensionHandle {
    private emitter = new CommandEmitter()

    constructor(context: ExtensionContext) {
        super(context)
    }

    public register(command: CommandSchema) {
        this.context.subscriptions.push(
            commands.registerCommand(command.command_id, async () =>
                command.execute(() => this.emitter.fire({ type: command.command_id }))
            )
        )
    }

    public onCommandExecute(command_id: string, callback: () => void) {
        this.context.subscriptions.push(
            this.emitter.onEvent((event) => {
                if (event.type === command_id) callback()
            })
        )
    }
}
