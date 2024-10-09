import { type InputBox, type QuickPick, type QuickPickItem } from 'vscode'

export interface GlobalParameters {
    onCancel?: () => void
    showSteps?: boolean
    totalSteps?: number
    title?: string
}

export class GlobalController {
    private step: number = 1

    constructor(private readonly params: GlobalParameters) {}

    apply(input: QuickPick<QuickPickItem> | InputBox) {
        if (this.params.showSteps && this.params.totalSteps) {
            input.totalSteps = this.params.totalSteps
            input.step = this.step
            this.step++
        }
        input.title = this.params.title
    }

    cancel() {
        if (this.params.onCancel) this.params.onCancel()
    }
}
