import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { DraggableContext } from './context';
export const DraggableProvider = ({ onMove, children }) => {
    const [start, setStart] = useState();
    const onDrop = (index) => (start ? onMove(start, index) : undefined);
    return (_jsx(DraggableContext.Provider, { value: { setStart, onDrop }, children: children }));
};
//# sourceMappingURL=draggableProvider.js.map