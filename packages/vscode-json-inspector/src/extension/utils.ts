import { Uri } from 'vscode'
import { editWorkspace } from '~/lib'

const SERVICE_FOLDER_NAME = 'json-inspector'
const SCHEMA_FOLDER_NAME = 'schema'
const OUTPUT_FOLDER_NAME = 'output'
// const SCHEMA_FILE_PATTERN = '*.schema.{ts,js}'
// const JSON_FILE_PATTERN = '*.output.{ts,js}'

export async function createServiceFolder(uri: Uri) {
    await editWorkspace([
        { type: 'folder', uri: schemaFolderUri(uri) },
        { type: 'folder', uri: outputFolderUri(uri) },
    ])
}

function outputFolderUri(uri: Uri) {
    return Uri.joinPath(uri, SERVICE_FOLDER_NAME, OUTPUT_FOLDER_NAME)
}

function schemaFolderUri(uri: Uri) {
    return Uri.joinPath(uri, SERVICE_FOLDER_NAME, SCHEMA_FOLDER_NAME)
}
