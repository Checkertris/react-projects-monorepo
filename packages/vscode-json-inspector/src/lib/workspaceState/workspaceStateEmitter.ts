import { EventEmitter, type Event } from '../misc/events'
import type { WorkspaceStateItem } from './workspaceStateItem'

export class WorkspaceStateEmitter<T extends Record<string, unknown>> extends EventEmitter<
    WorkspaceStateItem<T>,
    'WORKSPACE_STATE'
> {}

export type WorkspaceStateEvent<T extends Record<string, unknown>> = Event<
    WorkspaceStateItem<T>,
    'WORKSPACE_STATE'
>
