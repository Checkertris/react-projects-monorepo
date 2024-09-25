import { VSCodeButton } from '@vscode/webview-ui-toolkit/react'
import { cn } from '~/lib/utils/cn'

interface VSCodeCommandButtonProps {
    readonly command_id: string
    children?: any

    style?: 'icon' | 'primary' | 'secondary'
}

export const CommandButton = ({ command_id, children, style }: VSCodeCommandButtonProps) => {
    return (
        <a
            href={`command:${command_id}`}
            className='button-container'
        >
            <VSCodeButton appearance={style ? style : (undefined as never)}>
                {children}
            </VSCodeButton>
        </a>
    )
}
