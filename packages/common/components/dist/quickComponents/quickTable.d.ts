import type { Expand } from '@common/utils';
import type { ReactNode } from 'react';
import type { TableProps } from '~/types';
export declare function quickTable(grid: (props: {
    children: ReactNode;
}) => JSX.Element, header: (props: {
    children: ReactNode;
}) => JSX.Element, cell: (props: {
    children: ReactNode;
}) => JSX.Element, row: (props: {
    children: ReactNode;
}) => JSX.Element): ({ headers, body }: Expand<TableProps>) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=quickTable.d.ts.map