import { ZodType } from 'zod'

export type EnumLike = {
    [k: string]: string | number
    [nu: number]: string
}

export interface ZodProps<T extends ZodType> {
    zod: T
    path: string
}
