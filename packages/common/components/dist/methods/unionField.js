import { jsx as _jsx } from "react/jsx-runtime";
import { camelCase } from '@common/utils';
import { useState } from 'react';
export function unionField(selector, unionShell) {
    const Select = selector;
    const Shell = unionShell;
    const Comp = ({ fields, defaultField }) => {
        const [current, setCurrent] = useState(defaultField);
        return (_jsx(Shell, { selector: _jsx(Select, { onChange: setCurrent, options: [
                    Object.keys(fields).map((value) => ({
                        value: value,
                        key: value,
                        label: camelCase(value),
                    })),
                ], defaultValue: defaultField }), output: fields[current] }));
    };
    return Comp;
}
//# sourceMappingURL=unionField.js.map