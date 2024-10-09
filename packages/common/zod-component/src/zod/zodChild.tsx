import type { ReactNode } from 'react'
import type { ZodComponent } from './zodComponent'
import { ZodComponentProp } from './ZodComponentProp'

export class ZodChild<T extends ZodComponent> extends ZodComponentProp<T, ReactNode> {
    override _valueToProp(value: T['_type']): ReactNode {
        return this.zod.build(value)
    }
}
