import { QuickPickItemKind, Uri, type QuickPickItem } from 'vscode'
import { FileEdit } from '../fileEdit'

export abstract class FileItem implements QuickPickItem {
    description: string = ''
    name: string
    abstract label: string
    kind = QuickPickItemKind.Default

    constructor(readonly uri: Uri) {
        this.name = FileEdit.getName(uri)
    }
}
