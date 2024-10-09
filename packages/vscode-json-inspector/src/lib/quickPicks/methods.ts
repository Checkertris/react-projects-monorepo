import type { QuickPickItem } from 'vscode'
import { GlobalController, type GlobalParameters } from './globalController'
import { InputBoxController, QuickPickController } from './quickInputController'

export function startQuickPick<T extends QuickPickItem>(
    params: GlobalParameters,
    control: (controller: QuickPickController<T>) => void
) {
    const input = new QuickPickController<T>(new GlobalController(params))
    control(input)
    input.start()
}

export function startInputBox(
    params: GlobalParameters,
    control: (controller: InputBoxController) => void
) {
    const input = new InputBoxController(new GlobalController(params))
    control(input)
    input.start()
}
