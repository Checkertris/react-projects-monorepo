import { jsx as _jsx } from "react/jsx-runtime";
export function objectField(item, container) {
    const Item = item;
    const Container = container;
    const Comp = ({ items }) => {
        return (_jsx(Container, { children: items.map((item, index) => (_jsx(Item, { label: item.label, error: item.error, children: item.children }, index))) }));
    };
    return Comp;
}
//# sourceMappingURL=objectField.js.map