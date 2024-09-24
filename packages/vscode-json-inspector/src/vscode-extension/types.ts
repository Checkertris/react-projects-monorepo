import vscode from 'vscode'

export interface FileInfo {
    type: vscode.FileType | 'rootFolder'
    uri: vscode.Uri
    name: string
}

export type FileQuickpick = vscode.QuickPickItem & FileInfo

export type AppMessage = { type: 'app-ready' }
