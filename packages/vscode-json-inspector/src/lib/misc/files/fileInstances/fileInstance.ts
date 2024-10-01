import { Uri } from 'vscode'
import { UriInstance } from './uriInstance'
import { FileEdit } from '../fileEdit'

export class FileInstance extends UriInstance {
    label: string

    constructor(uri: Uri) {
        super(uri)
        this.label = FileEdit.getName(uri)
    }
}
