import { useEffect, useRef, useState } from 'react';
import { isExtends } from '@common/utils';
export function useAsycOptions(loadingIcon, options) {
    const [currentOptions, setOptions] = useState([]);
    const refresh = useRef(async () => {
        setOptions(options.map((option) => {
            if (isExtends(option))
                return {
                    label: 'loading...',
                    value: '',
                    key: '',
                    icon: loadingIcon,
                };
            return option;
        }));
        let newOptions = [];
        await Promise.all(options.map(async (option) => {
            if (isExtends(option)) {
                await option
                    .fetch()
                    .then((options) => (newOptions = newOptions.concat(options)));
            }
            else {
                newOptions.push(option);
            }
        })).then(() => setOptions(newOptions));
    });
    useEffect(() => {
        refresh.current().catch(refresh.current);
    }, []);
    function onClick() {
        refresh.current().catch(refresh.current);
    }
    return {
        onClick,
        options: currentOptions,
    };
}
//# sourceMappingURL=useAsyncOptions.js.map