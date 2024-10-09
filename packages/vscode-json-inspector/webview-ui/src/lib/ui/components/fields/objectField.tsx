import type { ZodProps } from '~/types'
import { ZodObject, type ZodRawShape } from 'zod'
import { assign } from '~/lib/utils'

export const ObjectField = (props: ZodProps<ZodObject<ZodRawShape>>) => {
    return Object.entries(props.zod.shape).map(([name, zod]) =>
        assign({ zod, path: props.path + '.' + name })
    )
}
