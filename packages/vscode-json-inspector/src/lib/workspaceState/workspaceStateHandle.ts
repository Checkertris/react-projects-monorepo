import { type ExtensionContext } from 'vscode'
import { ExtensionHandle } from '../extensionHandle'
import { WorkspaceStateEmitter } from './workspaceStateEmitter'

export abstract class WorkspaceStateHandle<
    T extends Record<string, unknown>,
> extends ExtensionHandle {
    protected emitter = new WorkspaceStateEmitter<T>()

    constructor(context: ExtensionContext) {
        super(context)
        console.log('📝 "INITIAL WORKSPACE STATE" => ', this.getWorkspaceState())
    }

    onStateChange = this.emitter.onEvent

    getWorkspaceState(): Partial<T> {
        return this.context.workspaceState
            .keys()
            .reduce((prev, key) => ({ ...prev, [key]: this.context.workspaceState.get(key) }), {})
    }
}
