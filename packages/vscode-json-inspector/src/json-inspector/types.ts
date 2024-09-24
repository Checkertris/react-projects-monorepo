import * as schema from '@common/schema-hook-form'
import * as extension from '~/vscode-extension'

export default interface JsonData {
    path: string
    data: unknown
}

export type JsonSchema = schema.ObjectSchema

export interface JsonSchemaInfo {
    name: string
    path: string
}

export type ConfigViewMessage =
    | {
          type: 'has-workspace'
          data: boolean
      }
    | {
          type: 'path-change'
          data?: string | undefined
      }
    | {
          type: 'folder-change'
          data: {
              refFolder: boolean
              schemaFolder: boolean
              files: extension.FileInfo[]
          }
      }

export type ConfigAppMessage = {
    type: 'new-form'
    data: JsonSchemaInfo
}

export type EditorViewMessage =
    | {
          type: 'new-form-callback'
          data: JsonSchema
      }
    | {
          type: 'old-form-callback'
          data: JsonData
      }
