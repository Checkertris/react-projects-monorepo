import { jsx as _jsx } from "react/jsx-runtime";
import { quickSelect } from './quickSelect';
import { useAsyncOptions } from '~/hooks';
import { Slot } from '@radix-ui/react-slot';
export function quickAsyncSelect(trigger, option, divider, loadingIcon) {
    const Select = quickSelect(trigger, option, divider);
    const Comp = (props) => {
        const { onClick, options } = useAsyncOptions(loadingIcon, props.options);
        return (_jsx(Slot, { onClick: onClick, children: _jsx(Select, { ...props, options: options }) }));
    };
    return Comp;
}
//# sourceMappingURL=quickAsyncSelect.js.map