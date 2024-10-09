import { isExtends } from '@common/utils'
import {
    ZodBoolean,
    ZodEnum,
    ZodLiteral,
    ZodNativeEnum,
    ZodNumber,
    ZodString,
    ZodType,
    type EnumLike,
    type Primitive,
} from 'zod'
import {
    BooleanField,
    EnumField,
    LiteralField,
    NativeEnumField,
    NumberField,
    StringField,
} from '../ui/components/fields'
import type { ZodProps } from '~/types'

export function assign<T extends ZodType>(props: ZodProps<T>): JSX.Element {
    if (isExtends<ZodProps<ZodString>>(props)) return <StringField {...props} />
    if (isExtends<ZodProps<ZodNumber>>(props)) return <NumberField {...props} />
    if (isExtends<ZodProps<ZodBoolean>>(props)) return <BooleanField {...props} />
    if (isExtends<ZodProps<ZodLiteral<Primitive>>>(props)) return <LiteralField {...props} />
    if (isExtends<ZodProps<ZodEnum<[string, ...string[]]>>>(props)) return <EnumField {...props} />
    if (isExtends<ZodProps<ZodNativeEnum<EnumLike>>>(props)) return <NativeEnumField {...props} />
    throw ReferenceError('invalid props')
}
