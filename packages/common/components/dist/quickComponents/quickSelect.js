import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
export function quickSelect(trigger, option, divider) {
    const Trigger = trigger;
    const Option = option;
    const Comp = (props) => {
        return (_jsx(Trigger, { ...props, onClick: undefined, placeholder: props.options.some((option) => option != 'divider')
                ? props.emptyMessage
                : props.placeholder, defaultValue: findOption(props.options, (option) => option.value == props.defaultValue)?.key, onChange: (key) => {
                const value = findOption(props.options, (option) => option.key == key)?.value;
                if (value)
                    props.onChange(value);
            }, children: props.options.map((option) => option === 'divider' ? (divider) : (_jsx(Option, { children: _jsxs("div", { children: [option.label, option.icon] }) }, option.key))) }));
    };
    return Comp;
}
function findOption(options, find) {
    const option = options.find((option) => option != 'divider' && find(option));
    if (option != 'divider')
        return option;
    return undefined;
}
//# sourceMappingURL=quickSelect.js.map