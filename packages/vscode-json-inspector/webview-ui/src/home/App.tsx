import { CommandButton } from '~/lib/ui/components/commandButton'
import '../codicon.css'
import './App.css'
import { SET_SERVICE_FOLDER_COMMAND, type ExtensionWebviewMessage } from '../../../src/extensions'

function App() {
    // const { state } = useHandleWebviewMessages<ExtensionWebviewMessage>()

    return (
        <div>
            {/* {!state.has_workspace && (
                <>
                    <p>No Workspace detected, open a folder to get started.</p>
                    <CommandButton command_id='workbench.action.files.openFileFolder'>
                        Open
                    </CommandButton>
                </>
            )}
            {state.has_workspace && (
                <p className='path'>
                    path -{' '}
                    <a href={`command:${SET_SERVICE_FOLDER_COMMAND}`}>
                        {state.service_folder_path}
                    </a>
                </p>
            )} */}
        </div>
    )
}

export default App
