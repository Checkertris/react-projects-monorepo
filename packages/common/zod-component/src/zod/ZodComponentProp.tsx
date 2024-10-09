import { ZodType } from 'zod'
import { Zod } from './zod'

export abstract class ZodComponentProp<T extends ZodType = ZodType, P = unknown> extends Zod<T> {
    public readonly _prop: P = {} as P

    abstract _valueToProp(value: T['_type']): P
}
