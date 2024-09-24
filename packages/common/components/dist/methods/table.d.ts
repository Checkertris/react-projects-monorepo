import type { Expand } from '@common/utils';
import React from 'react';
import type { TableProps } from '~/types';
export declare function buildTable(grid: (props: {
    children: React.ReactNode;
}) => JSX.Element, header: (props: {
    children: React.ReactNode;
}) => JSX.Element, cell: (props: {
    children: React.ReactNode;
}) => JSX.Element, row: (props: {
    children: React.ReactNode;
}) => JSX.Element): ({ headers, body }: Expand<TableProps>) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=table.d.ts.map