import { window, type QuickPick, type QuickPickItem, type InputBox } from 'vscode'
import { separateItems } from '@common/utils/src/transform/separateItems'
import { Separator } from './separator'

export abstract class Input<S extends object, T extends QuickPick<any> | InputBox = any> {
    private nextInput: Input<S> | null = null

    constructor(protected input: T) {}

    public show(state: S) {
        this.input.show()
        this.input.onDidAccept(() => {
            const newState = this.tryAccept(state)
            console.log('🚀 ~ Input ~ this.input.onDidAccept ~ newState:', newState)
            if (newState) {
                this.nextInput?.show(newState)
            }
            this.input.hide()
        })
    }

    protected abstract tryAccept(state: S): S | void

    public nextQuickpick<T extends QuickPickItem>(
        assign: (quickpick: QuickPick<T>, input: QuickpickInput<T, S>) => void
    ) {
        const input = new QuickpickInput<T, S>()
        assign(input.input, input)
        this.nextInput = input
    }

    public nextInputBox(assign: (quickpick: InputBox, input: TextInput<S>) => void) {
        const input = new TextInput<S>()
        assign(input.input, input)
        this.nextInput = input
    }
}

export class TextInput<S extends object> extends Input<S, InputBox> {
    private accept: (state: S, value: string) => S | void = (state: S) => state
    constructor() {
        super(window.createInputBox())
    }

    protected override tryAccept(state: S): void | S {
        return this.accept(state, this.input.value)
    }

    public onDidAccept(action: (state: S, value: string) => S | void) {
        this.accept = action
    }
}

export class QuickpickInput<T extends QuickPickItem, S extends object = { item: T }> extends Input<
    S,
    QuickPick<T>
> {
    private accept: (state: S, item?: T) => S | void = (state: S) => state

    constructor() {
        super(window.createQuickPick())
    }

    static quickpickGroup<T extends QuickPickItem>(items: T[][]) {
        return separateItems(items, new Separator()) as T[]
    }

    protected override tryAccept(state: S): void | S {
        return this.accept(state, this.input.items[0])
    }

    public onDidAccept(action: (state: S, item?: T) => S | void) {
        this.accept = action
    }

    static createQuickPick<T extends QuickPickItem, S extends object>(
        assign: (quickpick: QuickPick<T>, input: QuickpickInput<T, S>) => Promise<void>
    ) {
        const input = new QuickpickInput<T, S>()
        assign(input.input, input)
        return input
    }
}
