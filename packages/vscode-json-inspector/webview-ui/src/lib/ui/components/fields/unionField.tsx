import { VSCodeDropdown, VSCodeOption } from '@vscode/webview-ui-toolkit/react'
import { ZodType, ZodUnion } from 'zod'
import { assign } from '~/lib/utils'
import type { ZodProps } from '~/types'

export const UnionField = (props: ZodProps<ZodUnion<readonly [ZodType, ...ZodType[]]>>) => {
    return (
        <VSCodeDropdown>
            {props.zod.options.map((zod) => (
                <VSCodeOption>{assign({ zod, path: props.path })}</VSCodeOption>
            ))}
        </VSCodeDropdown>
    )
}
