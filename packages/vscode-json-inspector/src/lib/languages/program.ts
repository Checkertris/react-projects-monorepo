import ts from 'typescript'
import { Range, Uri } from 'vscode'
import { Handle } from '../handle'

export class Program {
    public readonly program: ts.Program
    private readonly checker: ts.TypeChecker

    constructor(...uris: Uri[]) {
        this.program = ts.createProgram(
            uris.map((file) => file.path),
            { allowJs: true }
        )
        this.checker = this.program.getTypeChecker()
    }

    public export(name: string, uri: Uri) {
        let results: ts.Node | undefined
        ts.forEachChild(this.sourceFile(uri), (node) => {
            if (node.getFullText().includes('export')) {
                const type = this.checker.getTypeAtLocation(node)
                if (name == this.checker.typeToString(type)) results = node
            }
        })
        if (!results) throw Handle.logError('no export', name, uri)
        return results
    }

    public defaultExport(uri: Uri) {
        let results: ts.Node | undefined
        ts.forEachChild(this.sourceFile(uri), (node) => {
            if (node.getFullText().includes('default')) results = node
        })
        if (!results) Handle.logError('no default export', uri)
        return results
    }

    public areAssignable(type1: ts.Type, type2: ts.Type) {
        return this.checker.isTypeAssignableTo(type1, type2)
    }

    public typeToString(type: ts.Type) {
        return this.checker.typeToString(type)
    }

    public getType(node: ts.Node) {
        const type = this.checker.getTypeAtLocation(node)
        if (!type) throw Handle.logError('no type in node', node)
        return type
    }

    public range(uri: Uri, node: ts.Node) {
        const sourceFile = this.sourceFile(uri)
        const start = ts.getLineAndCharacterOfPosition(sourceFile, node.getStart(sourceFile, true))
        const end = ts.getLineAndCharacterOfPosition(sourceFile, node.getEnd())
        return new Range(start.line, start.character, end.line, end.character)
    }

    private sourceFile(uri: Uri) {
        const source = this.program.getSourceFile(uri.path)
        if (!source) throw Handle.logError('no source file', uri)
        return source
    }
}
