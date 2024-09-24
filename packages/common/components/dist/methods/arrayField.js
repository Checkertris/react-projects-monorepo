import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
export function arrayField(arrayFieldShell) {
    const Shell = arrayFieldShell;
    const Comp = ({ defaultCount, max, onAdd, onRemove, cell: Cell }) => {
        const [count, setCount] = useState(defaultCount);
        function addInternal() {
            if (max && count >= max)
                return;
            setCount(count + 1);
            onAdd();
        }
        return (_jsx(Shell, { onAdd: addInternal, onRemove: onRemove, cells: [...Array(count).keys()].map((index) => (_jsx(Cell, { index: index }, index))) }));
    };
    return Comp;
}
//# sourceMappingURL=arrayField.js.map