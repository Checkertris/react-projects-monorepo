import { VSCodeTextField } from '@vscode/webview-ui-toolkit/react'
import { ZodString } from 'zod'
import { useField } from '~/lib/hooks'
import type { ZodProps } from '~/types'

export const StringField = (props: ZodProps<ZodString>) => {
    const { defaultValue, onChange } = useField(props)

    return (
        <VSCodeTextField
            valueChanged={onChange}
            defaultValue={defaultValue}
            placeholder={props.zod.description ?? (undefined as never)}
            maxlength={props.zod.maxLength ?? (undefined as never)}
        />
    )
}
