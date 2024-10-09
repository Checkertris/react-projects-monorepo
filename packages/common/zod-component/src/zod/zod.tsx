import { z, ZodType, type ParseInput } from 'zod'

export abstract class Zod<T extends ZodType = ZodType> extends ZodType<
    T['_output'],
    T['_def'],
    T['_input']
> {
    constructor(protected readonly zod: T) {
        super(zod._def)
    }

    _parse(input: ParseInput) {
        return this.zod._parse(input)
    }
}

const m = z.undefined()
