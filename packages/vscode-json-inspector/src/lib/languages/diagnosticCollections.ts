import { languages, window, type DiagnosticCollection, type TextDocument } from 'vscode'
import { Handle } from '../handle'

export class DiagnosticCollections extends Handle {
    register(
        name: string,
        onView: (document: TextDocument, collection: DiagnosticCollection) => void
    ) {
        const collection = languages.createDiagnosticCollection(name)

        this.context.subscriptions.push(collection)
        if (window.activeTextEditor) {
            onView(window.activeTextEditor.document, collection)
        }
        this.context.subscriptions.push(
            window.onDidChangeActiveTextEditor((editor) => {
                if (editor) {
                    onView(editor.document, collection)
                }
            })
        )
    }
}
