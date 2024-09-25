export class CommandSchema {
    constructor(
        public readonly contributeId: string,
        public readonly activate: (callback: () => void) => Promise<void>
    ) {}
}
