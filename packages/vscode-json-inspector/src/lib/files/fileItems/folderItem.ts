import { Uri, workspace } from 'vscode'
import { FileItem } from './fileItem'
import { FileEdit } from '../fileEdit'

export class FolderItem extends FileItem {
    label: string = '/'

    constructor(uri: Uri) {
        super(uri)
        if (FileEdit.isRoot(uri)) {
            this.description = '- workspace root '
        } else {
            this.label += FileEdit.formatPath(uri, false, false)
        }
        this.description += '• ' + workspace.getWorkspaceFolder(uri)?.name
    }
}
