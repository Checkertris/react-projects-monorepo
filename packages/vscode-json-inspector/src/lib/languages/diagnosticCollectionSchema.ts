import type { DiagnosticCollection, TextDocument } from 'vscode'

export class DiagnosticCollectionSchema {
    constructor(
        public readonly name: string,
        public readonly onView: (document: TextDocument, collection: DiagnosticCollection) => void
    ) {}
}
