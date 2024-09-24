import type { OptionData, AsynchOptions } from '~/types';
export declare function useAsycOptions<T extends PropertyKey>(loadingIcon: JSX.Element, options: (OptionData<T> | AsynchOptions<T>)[]): {
    options: OptionData<T>[];
    onClick: () => void;
};
//# sourceMappingURL=useAsyncOptions.d.ts.map