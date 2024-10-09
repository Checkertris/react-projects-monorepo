import { type ExtensionContext } from 'vscode'
import { Handle } from './handle'
import { Emitter } from './misc/emitter'

type WorkspaceStateItem<T extends Record<string, unknown>> = {
    [K in keyof T]: {
        key: K
        value: T[K]
    }
}[keyof T]

type PartialUndefined<T> = Partial<{
    [K in keyof T]: T[K] | undefined
}>

export class WorkspaceState<T extends Record<string, unknown>> extends Handle {
    protected emitter = new Emitter<WorkspaceStateItem<T>>()

    constructor(context: ExtensionContext, private readonly defaultState?: PartialUndefined<T>) {
        super(context)
        this.initialise()
    }

    public onStateChange(listener: (event: WorkspaceStateItem<T>) => void) {
        this.emitter.addListener(listener)
    }

    public update<K extends keyof T>(key: K & string, value: T[K]) {
        this.context.workspaceState.update(key, value)
    }

    public get<K extends keyof T>(key: K & string): undefined | T[K] {
        return this.context.workspaceState.get(key)
    }

    private reset() {
        if (!this.defaultState) return
        for (var key in Object.entries(this.defaultState)) {
            this.context.workspaceState.update(key, this.defaultState[key])
        }
        this.logWorkspaceState()
    }

    private initialise() {
        if (!this.defaultState) return
        for (var key in Object.entries(this.defaultState)) {
            const value = this.context.workspaceState.get(key)
            if (!value) this.context.workspaceState.update(key, this.defaultState[key])
        }
        this.logWorkspaceState()
    }

    private logWorkspaceState() {
        Handle.logInfo(
            'initial workspace state',
            this.context.workspaceState
                .keys()
                .reduce(
                    (prev, key) => ({ ...prev, [key]: this.context.workspaceState.get(key) }),
                    {}
                )
        )
    }
}
