import ts from 'typescript'
import vscode from 'vscode'

function isDefaultExportDeclaration(node: ts.Node) {
    let isExport = false
    let isDefault = false
    ts.forEachChild(node, (child) => {
        switch (child.kind) {
            case ts.SyntaxKind.ExportKeyword:
                isExport = true
                break
            case ts.SyntaxKind.DefaultKeyword:
                isDefault = true
        }
    })
    if (isExport && isDefault) return true
    return false
}

function getDefaultExport(sourceFile: ts.SourceFile, checker: ts.TypeChecker) {
    return ts.forEachChild(sourceFile, (node) => {
        if (ts.isExportAssignment(node)) {
            //is export assignment
            if (checker.getSymbolAtLocation(node)?.escapedName === ts.InternalSymbolName.Default) {
                return node
            }
        } else if (isDefaultExportDeclaration(node)) {
            //is export declaration
            return node
        }
        return
    })
}

function getIdentifierType(node: ts.Node, checker: ts.TypeChecker) {
    if (ts.isIdentifier(node)) {
        return checker.getTypeAtLocation(node)
    } else {
        let type: ts.Type | undefined
        node.forEachChild((child) => {
            if (ts.isIdentifier(child)) {
                type = checker.getTypeAtLocation(child)
            } else {
                type = getIdentifierType(child, checker)
            }
        })
        return type
    }
}

export interface NodeInfo {
    type: ts.Type
    checker: ts.TypeChecker
    source: ts.SourceFile
    node: ts.Node
    program: ts.Program
}

export function getDefaultExportInfo(file: vscode.Uri) {
    const program = ts.createProgram([file.toString()], { allowJs: true })
    const checker = program.getTypeChecker()
    const source = program.getSourceFile(file.toString())
    if (source) {
        const node = getDefaultExport(source, checker)
        if (node) {
            const type = getIdentifierType(node, checker)
            if (type) {
                return { type, node, typeString: checker.typeToString(type) }
            } else {
                // console.log("no idenfifier found in default export at" + file)
            }
        } else {
            // console.log("no default export found in " + file)
        }
    } else {
        //   console.log("unable to find file at path " + file)
    }
    return undefined
}

export function isTypeAssignable(
    uri1: vscode.Uri,
    uri2: vscode.Uri,
    type1: ts.Type,
    type2: ts.Type
) {
    return ts
        .createProgram([uri1.toString(), uri2.toString()], { allowJs: true })
        .getTypeChecker()
        .isTypeAssignableTo(type1, type2)
}
