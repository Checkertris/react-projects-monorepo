import type { IsEqual, IsExtends } from './types'

export const isExtends = <T>(value: unknown): value is T => ({}) as IsExtends<typeof value, T>

export const isEqual = <T>(value: unknown): value is T => ({}) as IsEqual<typeof value, T>

export const asValue = <T>() => ({}) as T

export const undefinedToNever = <T>(value: T) => value as Exclude<T, undefined>
