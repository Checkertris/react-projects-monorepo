import { jsx as _jsx } from "react/jsx-runtime";
import { arrayField } from './arrayField';
import { DraggableItem, DraggableProvider } from '~/draggable';
export function arrayFieldMovable(arrayFieldShell) {
    const ArrayField = arrayField(arrayFieldShell);
    const Comp = (props) => (_jsx(DraggableProvider, { onMove: props.onMove, children: _jsx(ArrayField, { ...props, cell: ({ index }) => (_jsx(DraggableItem, { index: index, children: _jsx(props.cell, { index: index }) })) }) }));
    return Comp;
}
//# sourceMappingURL=arrayFieldMovable.js.map