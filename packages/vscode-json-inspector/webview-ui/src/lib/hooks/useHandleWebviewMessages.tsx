import { useEffect, useState } from 'react'
import { vscodeWebviewApi } from '~/lib/utils/vscodeAPIWrapper'
import { APP_READY, MessageAction, type DefaultWebviewMessage, type Message } from 'shared'

type WebviewState<T extends Message> = {
    [K in Extract<T, { action: MessageAction.SetState }> as K['type']]: K['data']
}

export function useHandleWebviewMessages<T extends Message>(
    listener?: (message: T | DefaultWebviewMessage) => void
) {
    const [state, setState] = useState<Partial<WebviewState<T>>>(vscodeWebviewApi.getState())

    const eventListener = (message: MessageEvent<T | DefaultWebviewMessage>) => {
        if (message.data.action == MessageAction.SetState) {
            const newState = {
                ...vscodeWebviewApi.getState(),
                [message.type]: message.data,
            }
            vscodeWebviewApi.setState(newState)
            setState(newState)
        }
        if (listener) listener(message.data)
    }

    useEffect(() => {
        vscodeWebviewApi.postMessage({
            type: APP_READY,
            data: vscodeWebviewApi.getState(),
        })

        window.addEventListener('message', eventListener)

        return () => {
            window.removeEventListener('message', eventListener)
        }
    }, [])

    return { state, postMessage: (message: T) => vscodeWebviewApi.postMessage(message) }
}
