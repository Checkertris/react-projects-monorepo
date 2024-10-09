import { VSCodeButton } from '@vscode/webview-ui-toolkit/react'
import { cn } from '~/lib/utils'

interface IconCommandButtonProps {
    command_id: string
    icon: string
}

export const IconCommandButton = ({ command_id, icon }: IconCommandButtonProps) => {
    return (
        <a
            href={`command:${command_id}`}
            className='button-container'
        >
            <VSCodeButton appearance='icon'>
                <span className={cn('codicon', 'codicon-' + icon)}></span>
            </VSCodeButton>
        </a>
    )
}
