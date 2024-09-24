import { jsx as _jsx } from "react/jsx-runtime";
import { quickSelect } from './quickSelect';
import { useAsycOptions } from '~/hooks';
import { Slot } from '@radix-ui/react-slot';
export function quickAsyncSelect(trigger, option, divider, loadingIcon) {
    const Select = quickSelect(trigger, option, divider);
    const Comp = (props) => {
        const { onClick, options } = useAsycOptions(loadingIcon, props.options);
        return (_jsx(Slot, { onClick: onClick, children: _jsx(Select, { ...props, options: options }) }));
    };
    return Comp;
}
//# sourceMappingURL=quickAsyncSelect.js.map