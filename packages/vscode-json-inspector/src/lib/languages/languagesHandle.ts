import { languages, window } from 'vscode'
import { ExtensionHandle } from '../extensionHandle'
import { DiagnosticCollectionSchema } from './diagnosticCollectionSchema'

export class LanguagesHandle extends ExtensionHandle {
    register(schema: DiagnosticCollectionSchema) {
        const collection = languages.createDiagnosticCollection(schema.name)

        this.context.subscriptions.push(collection)
        if (window.activeTextEditor) {
            schema.onView(window.activeTextEditor.document, collection)
        }
        this.context.subscriptions.push(
            window.onDidChangeActiveTextEditor((editor) => {
                if (editor) {
                    schema.onView(editor.document, collection)
                }
            })
        )
    }
}
