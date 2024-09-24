import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
export const toggle = (toggleShell) => {
    const Shell = toggleShell;
    const Comp = ({ defaultOpen, label, children }) => {
        const [open, setOpen] = useState(defaultOpen ? defaultOpen : false);
        return (_jsx(Shell, { label: label, open: open, onClick: () => setOpen(!open), children: open && _jsx("div", { children: children }) }));
    };
    return Comp;
};
//# sourceMappingURL=toggle.js.map