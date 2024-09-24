import { type Expand } from '@common/utils';
import type { SelectProps, UnionFieldProps, UnionFieldShellProps } from '~/types';
export declare function unionField(selector: <T extends PropertyKey>(props: Expand<SelectProps<T>>) => JSX.Element, unionShell: (props: Expand<UnionFieldShellProps>) => JSX.Element): <T extends string>({ fields, defaultField }: Expand<UnionFieldProps<T>>) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=unionField.d.ts.map