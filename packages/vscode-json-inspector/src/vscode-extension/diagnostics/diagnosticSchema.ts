// import vscode, { ExtensionContext } from 'vscode'
// import ts from 'typescript'
// import { DefaultExportWatcher } from './lib/defaultExportWatcher'
// import { getRange } from '../utils'

// export class DiagnosticSchema {
//     private collection?: vscode.DiagnosticCollection
//     private disposables: vscode.Disposable[] = []

//     constructor(public readonly name: string) {}

//     apply(collection: vscode.DiagnosticCollection, context: ExtensionContext) {
//         this.collection = collection
//         return this.disposables
//     }

//     public registerDefaultExport(
//         fileType: string,
//         exportTypeRef: vscode.Uri,
//         onValidExport?: (
//             uri: vscode.Uri,
//             node: ts.Node,
//             collection: vscode.DiagnosticCollection
//         ) => void
//     ) {
//         const watcher = new DefaultExportWatcher('**/*.' + fileType, exportTypeRef)
//         this.disposables.push(watcher)

//         if (onValidExport)
//             watcher.onValidExport = (uri, node) => {
//                 if (this.collection) onValidExport(uri, node, this.collection)
//             }

//         watcher.onLackExport = (uri) => {
//             this.collection?.set(uri, [
//                 new vscode.Diagnostic(
//                     new vscode.Range(0, 0, 0, 2),
//                     `file type ${fileType} requires a default export`,
//                     vscode.DiagnosticSeverity.Error
//                 ),
//             ])
//         }

//         watcher.onInvalidExport = (uri, node) => {
//             const range = getRange(uri, node)
//             if (range) {
//                 this.collection?.set(uri, [
//                     new vscode.Diagnostic(
//                         range,
//                         `default export is not assignable to ${watcher.exportTypeLabel} `,
//                         vscode.DiagnosticSeverity.Error
//                     ),
//                 ])
//             }
//         }
//         return this
//     }
// }
