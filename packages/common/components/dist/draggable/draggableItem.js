import { jsx as _jsx } from "react/jsx-runtime";
import { Slot } from '@radix-ui/react-slot';
import { useRef } from 'react';
import { useDraggableContext } from './context';
export const DraggableItem = (props) => {
    const { setStart, onDrop } = useDraggableContext();
    const self = useRef(null);
    return (_jsx(Slot, { ref: self, draggable: true, onDrop: () => onDrop(props.index), onDragStart: () => setStart(props.index), onDragOver: () => {
            if (self.current)
                self.current.focus();
        }, children: props.children }));
};
//# sourceMappingURL=draggableItem.js.map