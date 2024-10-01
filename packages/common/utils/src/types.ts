// export type IsSubPath<P extends Path<unknown>, p extends string> = p extends `${P}.${string}` | P
//     ? true
//     : false

// export type ValueFromPath<O, P extends Path<O>> = P extends `${infer A}.${infer B}`
//     ? ValueFromPath<O[Extract<A, keyof O>], Extract<B, Path<O[Extract<A, keyof O>]>>>
//     : P extends keyof O
//       ? O[P]
//       : O

type PathToArray<T> = T extends `${infer Key}.${infer Rest}`
    ? [Key, ...PathToArray<Rest>]
    : T extends `${infer Key}`
      ? [Key]
      : []
type FilterUndefined<T> = T extends undefined ? never : T
type FilterNull<T> = T extends null ? never : T
type FilterUndefinedAndNull<T> = FilterUndefined<FilterNull<T>>

type ExtractFromObject<O extends Record<PropertyKey, unknown>, K> = K extends keyof O
    ? O[K]
    : K extends keyof FilterUndefinedAndNull<O>
      ? FilterUndefinedAndNull<O>[K] | undefined
      : undefined

type ExtractFromArray<A extends readonly unknown[], K> = unknown[] extends A
    ? A extends readonly (infer T)[]
        ? T | undefined
        : undefined
    : K extends keyof A
      ? A[K]
      : undefined

type GetWithArray<O, K> = K extends []
    ? O
    : K extends [infer Key, ...infer Rest]
      ? O extends Record<PropertyKey, unknown>
          ? GetWithArray<ExtractFromObject<O, Key>, Rest>
          : O extends readonly unknown[]
            ? GetWithArray<ExtractFromArray<O, Key>, Rest>
            : undefined
      : never

export type ValueFromPath<O, K extends Path<O>> = GetWithArray<O, PathToArray<K>>

export type KeyByValue<T extends Record<PropertyKey, unknown>, K> = keyof {
    [K in keyof T as T[K] extends K ? K : never]: unknown
}

export type Path<T> =
    T extends Array<infer U>
        ? `${Path<U>}`
        : T extends object
          ? {
                [K in keyof T & (string | number)]: K extends string
                    ? `${K}` | `${K}.${Path<T[K]>}`
                    : never
            }[keyof T & (string | number)]
          : never

type UnionToIntersection<U> = (U extends unknown ? (x: U) => void : never) extends (
    x: infer I
) => void
    ? I
    : never

export type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true

export type IsExtends<A, B, Y = true, N = false> = A extends B ? Y : N

export type IsEqual<A, B, Y = true, N = false> =
    (<G>() => G extends A ? 1 : 2) extends <G>() => G extends B ? 1 : 2 ? Y : N

export type RecordValue<T extends Record<PropertyKey, unknown>> =
    T extends Record<PropertyKey, infer A> ? A : never
export type ArrayValue<T extends unknown[]> = T extends Array<infer A> ? A : never

type LengthObject<T, K extends keyof T = keyof T> = [K] extends [never]
    ? []
    : K extends K
      ? [0, ...LengthObject<Omit<T, K>>]
      : never

export type RecordLength<T extends Record<PropertyKey, unknown>> = Extract<
    LengthObject<T>['length'],
    number
>
export type ArrayLength<T extends unknown[]> = T['length']

export type Merge<U extends object> = (U extends unknown ? (K: U) => void : never) extends (
    K: infer I
) => void
    ? I
    : never

export const __brand = Symbol()
