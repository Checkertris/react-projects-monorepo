import type { Expand } from '@common/utils';
import type { AsyncSelectProps, SelectOptionProps, SelectTriggerProps } from '~/types';
export declare function quickAsyncSelect<P extends object>(trigger: (props: Expand<SelectTriggerProps & P>) => JSX.Element, option: (props: Expand<SelectOptionProps>) => JSX.Element, divider: JSX.Element, loadingIcon: JSX.Element): <T extends PropertyKey>(props: Expand<AsyncSelectProps<T>> & P) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=quickAsyncSelect.d.ts.map