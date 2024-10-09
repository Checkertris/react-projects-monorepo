import { ZodLiteral, type Primitive } from 'zod'
import type { ZodProps } from '~/types'

export const LiteralField = ({ zod }: ZodProps<ZodLiteral<Primitive>>) => {
    return <label>{String(zod.value)}</label>
}
