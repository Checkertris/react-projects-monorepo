import { useContext, type Context } from 'react'
import { isExtends } from '../typeTransforms'

export const useNonNullableContext = <T>(context: Context<any>) => {
    const contextValue = useContext(context)
    if (isExtends<T>(context)) return contextValue
    else throw ReferenceError('invalid context value')
}
