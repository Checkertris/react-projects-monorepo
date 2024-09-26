import type { ReactNode } from 'react'
import type { TableProps } from '~/types'

export function quickTable(
    grid: (props: { children: ReactNode }) => JSX.Element,
    header: (props: { children: ReactNode }) => JSX.Element,
    cell: (props: { children: ReactNode }) => JSX.Element,
    row: (props: { children: ReactNode }) => JSX.Element
) {
    const Grid = grid
    const Header = header
    const Cell = cell
    const Row = row
    const Comp = ({ headers, body }: TableProps) => (
        <Grid>
            <Header>
                {headers.map((header, index) => (
                    <Cell key={'head-' + index}>{header}</Cell>
                ))}
            </Header>
            {body.map((row, index) => (
                <Row key={'row-' + index}>
                    {row.map((item, cellIndex) => (
                        <Cell key={'cell-' + cellIndex + index}>{item}</Cell>
                    ))}
                </Row>
            ))}
        </Grid>
    )
    return Comp
}
