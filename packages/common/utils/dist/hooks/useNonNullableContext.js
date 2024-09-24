import { useContext } from 'react';
import { isExtends } from '../typeTransforms';
export const useNonNullableContext = (context) => {
    const contextValue = useContext(context);
    if (isExtends(context))
        return contextValue;
    else
        throw ReferenceError('invalid context value');
};
//# sourceMappingURL=useNonNullableContext.js.map