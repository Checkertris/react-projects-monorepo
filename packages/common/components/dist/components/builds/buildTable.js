import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
export function buildTable(Grid, Header, Cell, Row) {
    const Comp = ({ headers, body }) => (_jsxs(Grid, { children: [_jsx(Header, { children: headers.map((header, index) => (_jsx(Cell, { children: header }, 'head-' + index))) }), body.map((row, index) => (_jsx(Row, { children: row.map((item, cellIndex) => (_jsx(Cell, { children: item }, 'cell-' + cellIndex + index))) }, 'row-' + index)))] }));
    return Comp;
}
//# sourceMappingURL=buildTable.js.map