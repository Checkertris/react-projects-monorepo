import vscode from 'vscode'

export interface WsEditAction {
    type: 'file' | 'folder'
    path: string
    ignoreIfExists?: boolean
}

export interface WsEditOptions {
    actionDescription?: string
    ignoreIfExists?: boolean
}

export function editWorkspace(edits: WsEditAction[], options?: WsEditOptions) {
    if (vscode.workspace.workspaceFolders) {
        const wsEdit = new vscode.WorkspaceEdit()
        edits.forEach((edit) => {
            const uri = vscode.Uri.file(edit.path)
            const relativePath = vscode.workspace.asRelativePath(uri, true)
            const ignoreIfExists = edit?.ignoreIfExists
                ? edit.ignoreIfExists
                : options?.ignoreIfExists
                  ? options.ignoreIfExists
                  : true

            vscode.workspace.fs.stat(uri).then(() => {
                if (ignoreIfExists) {
                    vscode.window.showInformationMessage(
                        edit.type + ' already exists at ' + relativePath
                    )
                    return
                }
                switch (edit.type) {
                    case 'file':
                        wsEdit.createFile(uri, {
                            ignoreIfExists,
                        })
                        break
                    case 'folder':
                        vscode.workspace.fs.createDirectory(uri)
                }
                vscode.window.showInformationMessage(edit.type + ' created at ' + relativePath)
            })
        })
        vscode.workspace.applyEdit(wsEdit)
    } else {
        if (options && options.actionDescription) {
            vscode.window.showErrorMessage('no workspace detected, ' + options.actionDescription)
        } else {
            vscode.window.showErrorMessage('no workspace detected, unable to create files')
        }
    }
}
