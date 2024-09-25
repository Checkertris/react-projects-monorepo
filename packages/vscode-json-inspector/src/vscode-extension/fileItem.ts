import { FileType, QuickPickItem, Uri, workspace } from 'vscode'
import { asWorkspacePath } from './utils/asWorkspacePath'

export class FileItem implements QuickPickItem {
    readonly label: string
    readonly description?: string
    readonly uri: Uri
    readonly name?: string
    readonly type: FileType

    constructor(uri: Uri, type: FileType, isRoot: boolean = false) {
        this.uri = uri
        this.type = type
        const tail = uri.fsPath.split('/').pop()
        if (tail) this.name = tail
        this.label = asWorkspacePath(uri)
        if (isRoot) {
            this.description = '- workspace root'
        }
    }
}
