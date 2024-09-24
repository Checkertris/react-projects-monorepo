import vscode from 'vscode'
import * as extension from '~/vscode-extension'
import * as utils from '@common/utils'
import { OUTPUT_FOLDER_NAME, REFERENCE_FOLDER_NAME, SCHEMA_FOLDER_NAME } from '~/constants'
import { JsonInspectorContext } from '../workspaceState'

export function createRefFolderCommand() {
    const path = JsonInspectorContext.getReferenceFolderPath()
    if (path) {
        extension.editWorkspace(
            [
                {
                    path: utils.seperate([path, REFERENCE_FOLDER_NAME, OUTPUT_FOLDER_NAME], '/'),
                    type: 'folder',
                },
                {
                    path: utils.seperate([path, REFERENCE_FOLDER_NAME, SCHEMA_FOLDER_NAME], '/'),
                    type: 'folder',
                },
            ],
            {
                ignoreIfExists: true,
                actionDescription: 'unable to initialise source folder.',
            }
        )
    } else {
        vscode.window.showErrorMessage(
            'no path assigned to source folder, unable to create source folder'
        )
    }
}
