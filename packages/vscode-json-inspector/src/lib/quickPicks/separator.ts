import { QuickPickItemKind, type QuickPickItem } from 'vscode'

export class Separator implements QuickPickItem {
    label = 'separator'
    kind = QuickPickItemKind.Separator
}
