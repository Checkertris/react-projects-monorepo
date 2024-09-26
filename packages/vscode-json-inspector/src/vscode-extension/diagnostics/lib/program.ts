import ts from 'typescript'
import { Uri } from 'vscode'

export class Program {
    private program: ts.Program = ts.createProgram([], {})
    private checker: ts.TypeChecker = this.program.getTypeChecker()
    private uris: Uri[]

    constructor(uris: Uri[]) {
        this.uris = uris
        this.refresh()
    }

    public update(uri: Uri) {
        this.uris.concat(uri)
        this.refresh()
    }

    private refresh() {
        this.program = ts.createProgram(
            this.uris.map((file) => file.path),
            { allowJs: true }
        )
        this.checker = this.program.getTypeChecker()
    }

    private isDefaultExportDeclaration(declarationNode: ts.Node) {
        if (!ts.isExportDeclaration(declarationNode)) return false
        let isDefault = false
        ts.forEachChild(declarationNode, (node) => {
            if (node.kind == ts.SyntaxKind.DefaultKeyword) isDefault = true
        })
        return isDefault
    }

    private isDefaultExportAssignment(assignmentNode: ts.Node) {
        if (!ts.isExportAssignment(assignmentNode)) return false
        if (
            this.checker.getSymbolAtLocation(assignmentNode)?.escapedName ===
            ts.InternalSymbolName.Default
        ) {
            return true
        }
        return false
    }

    private getNodeType(anyNode: ts.Node): ts.Type | undefined {
        if (ts.isIdentifier(anyNode)) return this.checker.getTypeAtLocation(anyNode)
        return anyNode.forEachChild((node) => {
            return this.getNodeType(node)
        })
    }

    private getDefaultExportNode(source: ts.SourceFile) {
        let exportNode
        return ts.forEachChild(source, (node) => {
            if (this.isDefaultExportAssignment(node)) exportNode = node
            if (this.isDefaultExportDeclaration(node)) exportNode = node
        })
        return exportNode
    }
}
