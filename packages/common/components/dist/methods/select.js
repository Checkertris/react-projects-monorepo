import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
function findOption(options, find) {
    return options.find((option) => option.some(find))?.find(find);
}
export function select(trigger, option, divider) {
    const Trigger = trigger;
    const Option = option;
    const Comp = ({ options, onClick, emptyMessage, placeholder, onChange, defaultValue, }) => {
        return (_jsx(Trigger, { onClick: onClick, placeholder: findOption(options, () => true) ? emptyMessage : placeholder, defaultValue: findOption(options, (option) => option.value == defaultValue)?.key, onChange: (label) => {
                const value = findOption(options, (option) => option.label == label)?.value;
                if (value)
                    onChange(value);
            }, children: options.map((group, index) => (group.map((option) => (_jsx(Option, { children: _jsxs("div", { children: [option.label, option.icon] }) }, option.key))),
                index != group.length - 1 && divider)) }));
    };
    return Comp;
}
//# sourceMappingURL=select.js.map