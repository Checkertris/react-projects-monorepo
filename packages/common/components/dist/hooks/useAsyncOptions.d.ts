import type { OptionData, AsyncOptions } from '~/types';
export declare function useAsyncOptions<T extends PropertyKey>(loadingIcon: JSX.Element, options: (OptionData<T> | AsyncOptions<T>)[]): {
    options: OptionData<T>[];
    onClick: () => void;
};
//# sourceMappingURL=useAsyncOptions.d.ts.map