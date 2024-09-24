import type { Expand } from '@common/utils';
import type { SearchSelectProps, SelectOptionProps, SelectTriggerProps } from '~/types';
export declare function searchSelect(trigger: (props: Expand<SelectTriggerProps>) => JSX.Element, option: (props: Expand<SelectOptionProps>) => JSX.Element, divider: JSX.Element, loadingIcon: JSX.Element): <T extends PropertyKey>(props: Expand<SearchSelectProps<T>>) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=searchSelect.d.ts.map