import vscode from 'vscode'
import type { __brand } from '@common/utils'

export type Event<T, B> = vscode.Event<T> & { [__brand]: B }
