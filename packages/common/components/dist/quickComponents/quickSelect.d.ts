import type { Expand } from '@common/utils';
import type { SelectOptionProps, SelectProps, SelectTriggerProps } from '~/types';
export declare function quickSelect<P extends object>(trigger: (props: Expand<SelectTriggerProps & P>) => JSX.Element, option: (props: Expand<SelectOptionProps>) => JSX.Element, divider: JSX.Element): <T extends PropertyKey>(props: Expand<SelectProps<T>> & P) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=quickSelect.d.ts.map