import type { ReactNode } from 'react'
import type { ZodComponent } from './zodComponent'
import { ZodComponentProp } from './ZodComponentProp'
import { z, ZodDiscriminatedUnion, ZodLiteral, ZodObject } from 'zod'

type ZodComponentUnion<T extends Record<string, ZodComponent>> = {
    [K in keyof T]: ZodObject<{ type: ZodLiteral<K>; props: T[K] }>
}[keyof T]

export class ZodChildUnion<T extends Record<string, ZodComponent>> extends ZodComponentProp<
    ZodDiscriminatedUnion<'type', [ZodComponentUnion<T>, ...ZodComponentUnion<T>[]]>,
    ReactNode
> {
    constructor(private readonly children: T) {
        const entries = Object.entries(children).map(([key, child]) =>
            z.object({
                type: z.literal(key),
                props: child,
            })
        )

        super(
            z.discriminatedUnion(
                'type',
                entries as [ZodComponentUnion<T>, ...ZodComponentUnion<T>[]]
            )
        )
    }

    override _valueToProp<K extends keyof T>(value: { type: K; props: T[K] }) {
        const child = this.children[value.type]
        return child!.build(value.props)
    }
}
