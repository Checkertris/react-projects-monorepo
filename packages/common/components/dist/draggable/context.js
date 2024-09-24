import { useNonNullableContext } from '@common/utils';
import { createContext } from 'react';
export const DraggableContext = createContext(undefined);
export const useDraggableContext = () => useNonNullableContext(DraggableContext);
//# sourceMappingURL=context.js.map