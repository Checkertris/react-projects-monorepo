// import { useEffect, useState } from 'react'
// import { vscodeWebviewApi } from '~/lib/utils/vscodeAPIWrapper'
// import {
//     APP_READY,
//     MessageAction,
//     type Message,
//     type WebviewMessageEvent,
// } from '../../../../src/lib'

// type WebviewState<T extends Message> = {
//     [K in Extract<T, { action: MessageAction.SET_STATE }> as K['type']]: K['data']
// }

// export function useHandleWebviewMessages<T extends Message>(
//     listener?: (message: WebviewMessageEvent<T>) => void
// ) {
//     const [state, setState] = useState<Partial<WebviewState<T>>>(vscodeWebviewApi.getState())

//     const eventListener = (message: MessageEvent<WebviewMessageEvent<T>>) => {
//         if (message.data.message.action == MessageAction.SET_STATE) {
//             const newState = {
//                 ...vscodeWebviewApi.getState(),
//                 [message.data.message.type]: message.data.message.data,
//             }

//             vscodeWebviewApi.setState(newState)
//             setState(newState)
//         }
//         if (listener) listener(message.data)
//     }

//     useEffect(() => {
//         vscodeWebviewApi.postMessage({
//             type: APP_READY,
//             action: MessageAction.EMIT,
//             data: vscodeWebviewApi.getState(),
//         })

//         window.addEventListener('message', eventListener)

//         return () => {
//             window.removeEventListener('message', eventListener)
//         }
//     }, [])

//     function postMessage(message: T) {
//         vscodeWebviewApi.postMessage(message)
//     }

//     return { state, postMessage }
// }
