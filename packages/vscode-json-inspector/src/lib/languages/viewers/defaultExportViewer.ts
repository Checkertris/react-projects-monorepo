import ts from 'typescript'
import {
    Diagnostic,
    DiagnosticSeverity,
    Range,
    Uri,
    type DiagnosticCollection,
    type ExtensionContext,
    type TextDocument,
} from 'vscode'
import { Program } from '../program'

export class DefaultExportViewer {
    type: ts.Type
    label: string
    uri: Uri

    constructor(context: ExtensionContext, referencePath: string[]) {
        this.uri = Uri.joinPath(context.extensionUri, ...referencePath)
        const program = new Program(this.uri)
        const reference = program.getDefaultExport(this.uri)
        if (!reference.type) throw ReferenceError('⚠️ no default export found')

        this.type = reference.type!
        this.label = program.checker().typeToString(reference.type!)
    }

    viewFile(collection: DiagnosticCollection, document: TextDocument, onValid: () => void) {
        const program = new Program(document.uri, this.uri)
        const { node, type } = program.getDefaultExport(document.uri)

        if (!node) {
            collection.set(document.uri, [
                new Diagnostic(
                    new Range(0, 0, 0, 2),
                    `default export required`,
                    DiagnosticSeverity.Error
                ),
            ])
        } else if (!program.checker().isTypeAssignableTo(type!, this.type!)) {
            collection.set(document.uri, [
                new Diagnostic(
                    program.getRange(document.uri, node),
                    `default export is not assignable to ${this.label} `,
                    DiagnosticSeverity.Error
                ),
            ])
        } else {
            onValid()
        }
    }
}
