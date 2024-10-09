import { VSCodeDropdown, VSCodeOption } from '@vscode/webview-ui-toolkit/react'
import { ZodEnum } from 'zod'
import { useField } from '~/lib/hooks'
import type { ZodProps } from '~/types'

export const EnumField = (props: ZodProps<ZodEnum<[string, ...string[]]>>) => {
    const { defaultValue, onChange } = useField(props)

    return (
        <VSCodeDropdown
            defaultValue={defaultValue}
            valueChanged={onChange}
        >
            {Object.values(props.zod.enum).map((v) => (
                <VSCodeOption value={v}>{v}</VSCodeOption>
            ))}
        </VSCodeDropdown>
    )
}
