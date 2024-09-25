import '../codicon.css'
import './App.css'
import { useState } from 'react'
import {
    HAS_WORKSPACE_MESSAGE,
    NEW_PATH_MESSAGE,
    SET_SERVICE_FOLDER_COMMAND,
} from '../../../shared'
import { useHandleWebviewMessages } from '~/lib/hooks/useHandleWebviewMessages'

import { CommandButton } from '~/lib/ui/components'
import { Gap } from '~/lib/ui/components/gap'

function App() {
    const [hasWorkspace, setHasWorkspace] = useState<boolean>(true)
    const [serviceFolderPath, setServiceFolderPath] = useState<string>('./')

    const { postMessage } = useHandleWebviewMessages((message) => {
        switch (message.type) {
            case HAS_WORKSPACE_MESSAGE:
                setHasWorkspace(message.data as boolean)
                break
            case NEW_PATH_MESSAGE:
                setServiceFolderPath(message.data as string)
        }
    })

    return (
        <div>
            {!hasWorkspace && (
                <>
                    <p>No Workspace detected, open a folder to get started.</p>
                    <CommandButton command_id='workbench.action.files.openFileFolder'>
                        Open
                    </CommandButton>
                </>
            )}
            {hasWorkspace && (
                <p className='path'>
                    path - <a href={`command:${SET_SERVICE_FOLDER_COMMAND}`}>{serviceFolderPath}</a>
                </p>
            )}
        </div>
    )
}

export default App

//<a href={`command:${SET_SERVICE_FOLDER_COMMAND}`}>
