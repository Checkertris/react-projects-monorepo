import { VSCodeTextField } from '@vscode/webview-ui-toolkit/react'
import { ZodNumber } from 'zod'
import { useField } from '~/lib/hooks'
import type { ZodProps } from '~/types'

export const NumberField = (props: ZodProps<ZodNumber>) => {
    const { defaultValue, onChange } = useField(props)

    return (
        <VSCodeTextField
            valueChanged={(e) => onChange(Number(e))}
            defaultValue={defaultValue}
            placeholder={props.zod.description ?? ''}
        />
    )
}
