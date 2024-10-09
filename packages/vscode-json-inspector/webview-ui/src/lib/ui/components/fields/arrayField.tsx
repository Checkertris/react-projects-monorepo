import { useFieldArray } from 'react-hook-form'
import { undefined, ZodArray, ZodType } from 'zod'
import {
    VSCodeDataGrid,
    VSCodeDataGridCell,
    VSCodeDataGridRow,
} from '@vscode/webview-ui-toolkit/react'
import { assign } from '~/lib/utils'
import type { ZodProps } from '~/types'

export const ArrayField = ({ zod, path }: ZodProps<ZodArray<ZodType>>) => {
    const { append, remove, fields } = useFieldArray({
        name: path,
    })
    const safeParse = zod.element.safeParse(undefined)
    const defaultValue = safeParse.success ? safeParse.data : undefined

    function onRemove(index: number) {
        remove(index)
    }

    function onAdd() {
        append(defaultValue)
    }

    return (
        <VSCodeDataGrid>
            <VSCodeDataGridRow rowType='header'>
                <VSCodeDataGridCell cellType='columnheader'>
                    items
                    <span
                        className='codicon codicon-add'
                        onClick={onAdd}
                    />
                </VSCodeDataGridCell>
            </VSCodeDataGridRow>
            {fields.map((field, index) => (
                <VSCodeDataGridRow>
                    <VSCodeDataGridCell>
                        {assign({ zod: zod.element, path: path + '.' + index })}
                        <span
                            className='codicon codicon-remove'
                            onClick={() => onRemove(index)}
                        />
                    </VSCodeDataGridCell>
                </VSCodeDataGridRow>
            ))}
        </VSCodeDataGrid>
    )
}
