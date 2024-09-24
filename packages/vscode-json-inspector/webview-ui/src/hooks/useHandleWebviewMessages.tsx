import { useEffect } from 'react'
import { vscodeWebviewApi } from '../lib/vscodeAPIWrapper'

export const useHandleWebviewMessages = <
    _D extends { type: string; data?: unknown },
    R extends { type: string; data?: unknown },
>(
    listener?: (data: R) => void
) => {
    useEffect(() => {
        if (listener) {
            window.addEventListener('message', (event) => listener(event.data))
        }
        vscodeWebviewApi.postMessage({ type: 'app-ready' })
        return () => {
            if (listener) {
                window.removeEventListener('message', (event) => listener(event.data))
            }
        }
    }, [])

    function postMessage<D>(message: D) {
        vscodeWebviewApi.postMessage(message)
    }

    return { postMessage }
}
