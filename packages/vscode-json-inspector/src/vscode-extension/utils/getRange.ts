import ts from 'typescript'
import vscode from 'vscode'

export function getRange(uri: vscode.Uri, node: ts.Node, onError?: () => void) {
    const program = ts.createProgram([uri.toString()], { allowJs: true })
    const sourceFile = program.getSourceFile(uri.toString())
    if (sourceFile) {
        const start = ts.getLineAndCharacterOfPosition(sourceFile, node.getStart(sourceFile, true))
        const end = ts.getLineAndCharacterOfPosition(sourceFile, node.getEnd())
        return new vscode.Range(start.line, start.character, end.line, end.character)
    }
    if (onError) onError()
    return undefined
}
