import { useController } from 'react-hook-form'
import type { ZodProps } from '~/types'
import { ZodType } from 'zod'

interface Field<T> {
    onChange: (value: T) => void
    defaultValue: T
}

export function useField<T extends ZodType>({ path }: ZodProps<T>): Field<T['_type']> {
    const {
        field: { value, onChange },
    } = useController({ name: path })

    return {
        onChange: onChange,
        defaultValue: value,
    }
}
