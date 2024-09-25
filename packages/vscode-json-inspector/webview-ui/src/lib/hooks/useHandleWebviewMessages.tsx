import { useEffect, useRef } from 'react'
import { vscodeWebviewApi } from '../utils/vscodeAPIWrapper'
import { APP_READY_MESSAGE, Origin, SET_APP_INDEX_MESSAGE, type Message } from '../../../../shared'

export const useHandleWebviewMessages = (listener: (data: Message) => void = () => {}) => {
    const viewIndexRef = useRef<string | never>()
    const eventListener = (event: MessageEvent<Message>) => {
        if (event.data.type === SET_APP_INDEX_MESSAGE)
            viewIndexRef.current = event.data.data as string
        listener(event.data)
    }

    useEffect(() => {
        postMessage(APP_READY_MESSAGE)
        window.addEventListener('message', eventListener)
        return () => {
            window.removeEventListener('message', eventListener)
        }
    }, [])

    function postMessage(type: string, data?: unknown) {
        vscodeWebviewApi.postMessage({
            origin: { type: Origin.WebviewApp, id: viewIndexRef.current },
            type,
            data,
        })
    }
    return { postMessage }
}
