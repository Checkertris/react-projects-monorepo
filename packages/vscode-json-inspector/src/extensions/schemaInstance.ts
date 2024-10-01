import type { Uri } from 'vscode'
import { FileInstance } from '~/lib'

export class SchemaInstance extends FileInstance {
    isValid: boolean = false
    schema?: 'placeholder'

    constructor(uri: Uri) {
        super(uri)
    }
}
