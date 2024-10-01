import ts from 'typescript'
import { Range, Uri } from 'vscode'

export class Program {
    private _program: ts.Program = ts.createProgram([], {})
    private _checker: ts.TypeChecker = this._program.getTypeChecker()
    uris: Uri[] = []

    constructor(...uris: Uri[]) {
        this.updateInternal(uris)
    }

    update(uri: Uri) {
        this.updateInternal([uri])
    }

    checker() {
        return this._checker
    }

    getDefaultExport(uri: Uri) {
        const node = this.getDefaultExportNode(uri)
        const type = this.getType(node!)
        return { node, type }
    }

    private updateInternal(uris: Uri[]) {
        this.uris = this.uris.concat(uris)
        this._program = ts.createProgram(
            this.uris.map((file) => file.path),
            { allowJs: true }
        )
        this._checker = this._program.getTypeChecker()
    }

    private getType(node: ts.Node): ts.Type | undefined {
        if (ts.isIdentifier(node)) return this._checker.getTypeAtLocation(node)
        return node.forEachChild((child) => {
            return this.getType(child)
        })
    }

    private getSourceFile(uri: Uri) {
        const source = this._program.getSourceFile(uri.path)
        if (!source) throw ReferenceError('⚠️ no source file found in uri')
        return source
    }

    private getDefaultExportNode(uri: Uri) {
        let targetNode
        return ts.forEachChild(this.getSourceFile(uri), (node) => {
            if (node.getFullText().includes('default')) targetNode = node
        })
        return targetNode
    }

    public getRange(uri: Uri, node: ts.Node) {
        const sourceFile = this.getSourceFile(uri)
        const start = ts.getLineAndCharacterOfPosition(sourceFile, node.getStart(sourceFile, true))
        const end = ts.getLineAndCharacterOfPosition(sourceFile, node.getEnd())
        return new Range(start.line, start.character, end.line, end.character)
    }
}
