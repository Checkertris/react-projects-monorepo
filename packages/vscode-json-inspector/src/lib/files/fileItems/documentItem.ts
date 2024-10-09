import { Uri } from 'vscode'
import { FileItem } from './fileItem'
import { FileEdit } from '../fileEdit'

export class DocumentIdem extends FileItem {
    label: string

    constructor(uri: Uri) {
        super(uri)
        this.label = FileEdit.getName(uri)
    }
}
