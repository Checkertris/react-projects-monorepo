import type { ReactNode } from 'react';
export interface FormFieldProps<T> {
    defaultValue?: T | undefined;
    onChange: (value: T) => void;
}
export interface ArrayFieldProps<T> {
    add: (value?: T, index?: number | undefined) => void;
    remove: (index?: number | undefined) => void;
    move: (from: number, to: number) => void;
    max: boolean;
}
export type CheckboxProps = FormFieldProps<boolean>;
export interface TextFieldProps extends FormFieldProps<string> {
    placeholder?: string | undefined;
}
export interface TextAreaProps extends TextFieldProps {
    resize?: 'none' | 'both' | 'horizontal' | 'vertical' | undefined;
}
export type OptionData<T extends PropertyKey = PropertyKey> = {
    label: string;
    key: string;
    value: T;
    icon?: JSX.Element | undefined;
} | 'divider';
export interface BaseSelectProps<T extends PropertyKey, O extends AsyncOptions<T> | OptionData<T>> extends FormFieldProps<T> {
    placeholder?: string | undefined;
    emptyMessage?: string | undefined;
    options: O[];
}
export interface SelectTriggerProps extends FormFieldProps<string> {
    placeholder?: string | undefined;
    children: ReactNode;
}
export interface SelectOptionProps {
    children: JSX.Element;
    key: string;
}
export type SelectProps<T extends PropertyKey> = BaseSelectProps<T, OptionData<T>>;
export type AsyncSelectProps<T extends PropertyKey> = BaseSelectProps<T, OptionData<T> | AsyncOptions<T>>;
export interface AsyncOptions<T extends PropertyKey = PropertyKey> {
    fetch: () => Promise<OptionData<T>[]>;
}
export interface TableProps {
    headers: string[];
    body: JSX.Element[][];
}
//# sourceMappingURL=types.d.ts.map