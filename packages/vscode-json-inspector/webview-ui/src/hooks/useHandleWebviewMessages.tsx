import { useEffect, useRef } from 'react'
import { vscodeWebviewApi } from '../lib/vscodeAPIWrapper'
import { APP_READY_MESSAGE, SET_APP_INDEX_MESSAGE } from '../../../static'
import { Origin, type Message } from '../../../src/vscode-extension'

export const useHandleWebviewMessages = (listener?: (data: Message) => void) => {
    const viewIndexRef = useRef<string | never>()

    useEffect(() => {
        window.addEventListener('message', (event) => {
            if (event.data.type === SET_APP_INDEX_MESSAGE) viewIndexRef.current = event.data.data
        })

        if (listener) {
            window.addEventListener('message', (event) => listener(event.data))
        }

        vscodeWebviewApi.postMessage({ type: APP_READY_MESSAGE })
        return () => {
            if (listener) {
                window.removeEventListener('message', (event) => listener(event.data))
            }
        }
    }, [])

    function postMessage(type: string, data?: unknown) {
        vscodeWebviewApi.postMessage({
            type,
            data,
            origin: { type: Origin.WebviewApp, id: viewIndexRef.current },
        })
    }

    return { postMessage }
}
