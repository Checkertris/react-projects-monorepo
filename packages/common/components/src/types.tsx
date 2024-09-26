import type { ReactNode } from 'react'

//Form Field
export interface FormFieldProps<T> {
    defaultValue?: T | undefined
    onChange: (value: T) => void
}

//Array Field
export interface ArrayFieldProps<T> {
    add: (value?: T, index?: number | undefined) => void
    remove: (index?: number | undefined) => void
    move: (from: number, to: number) => void
    max: boolean
}

//Checkbox
export type CheckboxProps = FormFieldProps<boolean>

//TextField
export interface TextFieldProps extends FormFieldProps<string> {
    placeholder?: string | undefined
}

//TextArea
export interface TextAreaProps extends TextFieldProps {
    resize?: 'none' | 'both' | 'horizontal' | 'vertical' | undefined
}

//Select
export type OptionData<T extends PropertyKey = PropertyKey> =
    | {
          label: string
          key: string
          value: T
          icon?: JSX.Element | undefined
      }
    | 'divider'

export interface BaseSelectProps<T extends PropertyKey, O extends AsyncOptions<T> | OptionData<T>>
    extends FormFieldProps<T> {
    placeholder?: string | undefined
    emptyMessage?: string | undefined
    options: O[]
}

export interface SelectTriggerProps extends FormFieldProps<string> {
    placeholder?: string | undefined
    children: ReactNode
}

export interface SelectOptionProps {
    children: JSX.Element
    key: string
}

export type SelectProps<T extends PropertyKey> = BaseSelectProps<T, OptionData<T>>

export type AsyncSelectProps<T extends PropertyKey> = BaseSelectProps<
    T,
    OptionData<T> | AsyncOptions<T>
>

export interface AsyncOptions<T extends PropertyKey = PropertyKey> {
    fetch: () => Promise<OptionData<T>[]>
}

//Table
export interface TableProps {
    headers: string[]
    body: JSX.Element[][]
}
