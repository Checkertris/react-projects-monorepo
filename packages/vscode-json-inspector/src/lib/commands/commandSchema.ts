export class CommandSchema {
    constructor(
        public command_id: string,
        public execute: (emit: () => void) => Promise<void>
    ) {}
}
