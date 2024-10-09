import {
    Disposable,
    QuickPickItemKind,
    window,
    type InputBox,
    type QuickPick,
    type QuickPickItem,
} from 'vscode'
import type { GlobalController } from './globalController'

export abstract class QuickInputController<
    I extends QuickPick<QuickPickItem> | InputBox = QuickPick<QuickPickItem> | InputBox
> {
    protected disposables: Disposable[] = []
    constructor(protected input: I, protected readonly global: GlobalController) {
        global.apply(this.input)
    }

    public start() {
        this.input.show()
    }

    private dispose() {
        Disposable.from(...this.disposables).dispose()
        this.input.dispose()
    }

    public setPlaceholder(placeholder: string) {
        this.input.placeholder = placeholder
    }

    public runInputBox(controller: (controller: InputBoxController) => void) {
        this.dispose()
        const input = new InputBoxController(this.global)
        controller(input)
        input.start()
    }

    public runQuickPick(controller: (controller: QuickPickController<any>) => void) {
        this.dispose()
        const input = new QuickPickController(this.global)
        controller(input)
        input.start()
    }
}

const separator = { label: 'separator', kind: QuickPickItemKind.Separator }

export class QuickPickController<I extends QuickPickItem> extends QuickInputController<
    QuickPick<I>
> {
    constructor(global: GlobalController) {
        super(window.createQuickPick<I>(), global)
    }

    public async setItemsAsync(promise: Promise<I[][]>) {
        this.input.busy = true
        const items = await promise
        this.setItems(items)
        this.input.busy = false
    }

    public setItems(items: I[][]) {
        this.input.items = items.reduce((prev, group, index) => {
            if (index == 0) return group
            return [...prev, separator as I, ...group]
        }, [])
    }

    public onDidConfirm(action: (item: I) => void) {
        this.disposables.push(
            this.input.onDidAccept(() => {
                const confirm = window.createInputBox()
                confirm.placeholder = 'Confirm...'
                this.disposables.push(
                    confirm.onDidAccept(() => {
                        if (this.input.selectedItems[0]) action(this.input.selectedItems[0])
                        this.global.cancel()
                    })
                )
            })
        )
    }
}

export class InputBoxController extends QuickInputController<InputBox> {
    private validating?: Promise<string | undefined>

    constructor(global: GlobalController) {
        super(window.createInputBox(), global)
    }

    setPrompt(prompt: string) {
        this.input.prompt = prompt
    }

    onDidValidate(
        validate: (value: string) => Promise<string | undefined>,
        onValid: (value: string) => void
    ) {
        this.validating = validate('')
        this.disposables.push(
            this.input.onDidAccept(async () => {
                const value = this.input.value
                this.input.enabled = false
                this.input.busy = true
                if (!(await validate(value))) {
                    onValid(value)
                }
                this.input.enabled = true
                this.input.busy = false
            }),
            this.input.onDidChangeValue(async (text) => {
                const current = validate(text)
                this.validating = current
                const validationMessage = await current
                if (current === this.validating) {
                    this.input.validationMessage = validationMessage
                }
            })
        )
    }
}
