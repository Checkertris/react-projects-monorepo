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
import { Program } from './program'
import { isExtends } from '@common/utils'

type CheckResults =
    | { state: 'lack'; node?: ts.Node; program?: Program }
    | { state: 'invalid' | 'valid'; node: ts.Node; program: Program }

export class DefaultExportChecker {
    private readonly type: ts.Type
    private readonly label: string
    private readonly uri: Uri

    constructor(context: ExtensionContext, nodeName: string, nodePath: string[]) {
        this.uri = Uri.joinPath(context.extensionUri, ...nodePath)
        const program = new Program(this.uri)
        this.type = program.getType(program.export(nodeName, this.uri))
        this.label = program.typeToString(this.type)
    }

    public async import<T>(uri: Uri) {
        return new Promise<T>(async (resolve, reject) => {
            const { state } = this.check(uri)
            if (state == 'valid') {
                const imports = await import(uri.fsPath)
                if (!imports.default) {
                    reject('no default found')
                } else if (!isExtends<T>(imports.default)) {
                    reject('default export does not extend target type')
                } else {
                    resolve(imports.default)
                }
            }
        })
    }

    public viewFile(collection: DiagnosticCollection, document: TextDocument) {
        const { state, node, program } = this.check(document.uri)
        if (state == 'lack') {
            collection.set(document.uri, [
                new Diagnostic(
                    new Range(0, 0, 0, 2),
                    `default export required`,
                    DiagnosticSeverity.Error
                ),
            ])
        }
        if (state == 'invalid') {
            collection.set(document.uri, [
                new Diagnostic(
                    program.range(document.uri, node),
                    `default export is not assignable to ${this.label} `,
                    DiagnosticSeverity.Error
                ),
            ])
        }
    }

    private check(uri: Uri): CheckResults {
        const program = new Program(uri, this.uri)
        const node = program.defaultExport(uri)
        if (!node) return { state: 'lack' }
        if (!program.areAssignable(program.getType(node), this.type)) {
            return { state: 'invalid', program, node }
        } else {
            return { state: 'valid', program, node }
        }
    }
}
