import type { Expand } from '@common/utils';
import type { SelectOptionProps, SelectProps, SelectTriggerProps } from '~/types';
export declare function select(trigger: (props: Expand<SelectTriggerProps>) => JSX.Element, option: (props: Expand<SelectOptionProps>) => JSX.Element, divider: JSX.Element): <T extends PropertyKey>({ options, onClick, emptyMessage, placeholder, onChange, defaultValue, }: Expand<SelectProps<T>>) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=select.d.ts.map