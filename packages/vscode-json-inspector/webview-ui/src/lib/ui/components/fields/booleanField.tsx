import { VSCodeCheckbox } from '@vscode/webview-ui-toolkit/react'
import { ZodBoolean } from 'zod'
import { useField } from '~/lib/hooks'
import type { ZodProps } from '~/types'

export const BooleanField = (props: ZodProps<ZodBoolean>) => {
    const { defaultValue, onChange } = useField<ZodBoolean>(props)

    return (
        <VSCodeCheckbox
            checked={defaultValue}
            checkedChanged={onChange}
        />
    )
}
