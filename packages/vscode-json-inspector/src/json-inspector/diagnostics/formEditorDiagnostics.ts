import { JSON_DATA_FILE_TYPE, JSON_SCHEMA_FILE_TYPE } from '~/constants'
import * as extension from '~/vscode-extension'
import vscode from 'vscode'

const JSON_DATA_REF = 'src/formEditor/diagnostics/references/schemaType'
const JSON_SCHEMA_REF = 'src/formEditor/diagnostics/references/dataType'

export const jsonEditorProjectDiagnostic = extension
    .createDiagnostic()
    .addDefaultExportDiagnostic(JSON_SCHEMA_FILE_TYPE, vscode.Uri.file(JSON_SCHEMA_REF))
    .addDefaultExportDiagnostic(JSON_DATA_FILE_TYPE, vscode.Uri.file(JSON_DATA_REF))
