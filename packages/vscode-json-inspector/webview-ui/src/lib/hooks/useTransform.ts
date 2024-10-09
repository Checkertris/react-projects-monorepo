import { useWatch, type FieldPathByValue, type FieldValues } from 'react-hook-form'

export function useTransform<F extends FieldValues, T, U>(
    path: FieldPathByValue<F, T>,
    transform: (value: T) => U
) {
    return transform(useWatch({ name: path }))
}
