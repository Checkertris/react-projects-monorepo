import * as schema from '@common/schema-hook-form'

export default interface JsonData {
    path: string
    data: unknown
}

export type JsonSchema = schema.ObjectSchema

export interface JsonSchemaInfo {
    name: string
    path: string
}
