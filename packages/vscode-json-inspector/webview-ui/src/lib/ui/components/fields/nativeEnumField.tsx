import { VSCodeDropdown, VSCodeOption } from '@vscode/webview-ui-toolkit/react'
import { ZodNativeEnum, type EnumLike } from 'zod'
import { formatText, isNumber } from '@common/utils'
import { useField } from '~/lib/hooks'
import type { ZodProps } from '~/types'

function formatEnum(enumme: EnumLike) {
    var keys = Object.keys(enumme)
    if (isNumber(keys[0])) keys = keys.filter((value) => !isNumber(value))
    return keys.map(formatText)
}

export const NativeEnumField = (props: ZodProps<ZodNativeEnum<EnumLike>>) => {
    const { defaultValue, onChange } = useField(props)

    return (
        <VSCodeDropdown
            defaultValue={String(defaultValue)}
            valueChanged={(v) => onChange(props.zod.enum[v] ?? (undefined as never))}
        >
            {formatEnum(props.zod.enum).map((k) => (
                <VSCodeOption value={k}>{k}</VSCodeOption>
            ))}
        </VSCodeDropdown>
    )
}
