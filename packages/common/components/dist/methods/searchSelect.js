import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { select } from './select';
export function searchSelect(trigger, option, divider, loadingIcon) {
    const Select = select(trigger, option, divider);
    const Comp = (props) => {
        const [currentOptions, setOptions] = useState([]);
        const refresh = useRef(async () => {
            setOptions(props.optionGroups.map((group) => {
                switch (group.type) {
                    case 'query':
                        return [
                            {
                                label: 'loading...',
                                value: '',
                                key: '',
                                icon: loadingIcon,
                            },
                        ];
                    case 'select':
                        return group.options;
                }
            }));
            await Promise.all(props.optionGroups.map((option) => {
                switch (option.type) {
                    case 'query':
                        return option.query();
                    case 'select':
                        return option.options;
                }
            })).then(setOptions);
        });
        useEffect(() => {
            refresh.current().catch(refresh.current);
        }, []);
        function onClick() {
            refresh.current().catch(refresh.current);
        }
        return (_jsx(Select, { ...props, onClick: onClick, options: currentOptions }));
    };
    return Comp;
}
//# sourceMappingURL=searchSelect.js.map