import type { ReactNode } from 'react'
import type { AnyZodObject } from 'zod'
import { Zod } from './zod'
import type { ZodComponentProp } from './ZodComponentProp'

type Props<T extends AnyZodObject> = {
    [K in keyof ReturnType<T['shape']>]: ReturnType<T['shape']>[K] extends ZodComponent
        ? ReactNode
        : ReturnType<T['shape']>[K]['_output']
}

export class ZodComponent<T extends AnyZodObject = AnyZodObject> extends Zod<T> {
    public readonly component: (props: Props<T>) => JSX.Element

    constructor(zod: T, component: (props: Props<T>) => JSX.Element) {
        super(zod)
        this.component = component
    }

    build(value: T['_type']): JSX.Element {
        const shape = this.zod.shape()
        const props = Object.entries(value).reduce((prev, [key, value]) => {
            if (!isZodComponentProp(shape[key])) return { ...prev, [key]: value }
            return { ...prev, [key]: shape[key]._valueToProp(value) }
        }, {} as Props<T>)

        return <this.component {...props} />
    }
}

function isZodComponentProp(value: ZodComponentProp | Zod): value is ZodComponentProp {
    return !!value['_prop' as keyof typeof value]
}
