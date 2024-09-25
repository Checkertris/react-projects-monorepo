import vscode from 'vscode'

export function disposeAndClear(disposables: vscode.Disposable[]) {
    while (disposables.length) {
        const x = disposables.pop()
        if (x) {
            x.dispose()
        }
    }
}
