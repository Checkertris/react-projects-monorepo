import { Uri, workspace } from 'vscode'
import { UriInstance } from './uriInstance'
import { FileEdit } from '../fileEdit'

export class FolderInstance extends UriInstance {
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
