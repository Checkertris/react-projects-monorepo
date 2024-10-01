import { EventEmitter } from '../misc/events'

export class CommandEmitter extends EventEmitter<{ type: string }, 'COMMAND_EVENT'> {}
