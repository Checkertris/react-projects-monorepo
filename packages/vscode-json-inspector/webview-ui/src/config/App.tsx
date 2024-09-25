import '../codicon.css'
import { useHandleWebviewMessages } from '~/hooks/useHandleWebviewMessages'
import { useState } from 'react'
import { HAS_WORKSPACE_MESSAGE } from '../../../static'

function App() {
    const [state, setState] = useState<boolean>()
    const { postMessage } = useHandleWebviewMessages((message) => {
        switch (message.type) {
            case HAS_WORKSPACE_MESSAGE:
                setState(message.data as boolean)
        }
    })

    return <div>has workspace: {state}</div>
}

export default App
