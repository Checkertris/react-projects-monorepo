export const numberRegex = /\d/
export const letterRegex = /[a-z]/
export const bracketRegex = /\(([^)]+)\)/

// export function extract<T>(test: unknown, message: string = 'invalid reference') {
//     if (isExtends<T>(test)) return test
//     else throw ReferenceError(message)
// }

// export function verify<T>(test: T, message: string = 'invalid reference') {
//     if (isExtends<undefined | null>(test)) throw ReferenceError(message)
//     else return test as Exclude<T, undefined | null>
// }

// export function sub<A, B>(test: A, sub: B) {
//     if (isExtends<undefined | null>(test)) return sub
//     else return test as Exclude<A, undefined | null>
// }

// //others
// export function getEnumKeyStrings(
//     enumme: object,
//     removeUnderscore: boolean = false
// ): string[] {
//     var keys = Object.keys(enumme)
//     if (isNumber(keys[0])) keys = keys.filter((value) => !isNumber(value))
//     if (removeUnderscore) keys = keys.map((key) => key.replace("_", " "))
//     return keys
// }

// export const camelCase = (str: string): string => {
//     var list = str.split(" ")
//     list = list.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     return list.join()
// }

// export type LiteralRecord<T extends object> = IsEqual<keyof T, string, {}, T>
// export type FixedLengthArray<
//     T,
//     L extends number,
//     TObj = [T, ...ReadonlyArray<T>]
// > = TObj & {
//     readonly length: L
//     [I: number]: T
// }

// export type DeepPartial<T> = T extends object
//     ? {
//           [P in keyof T]?: DeepPartial<T[P]>
//       }
//     : T

// export function findDifference<T extends object>(
//     listA: T[],
//     listB: T[],
//     compare: (a: T, b: T) => boolean
// ) {
//     var notFoundInB = listA.reduce((prev, itemA) => {
//         if (!listB.find((itemB) => compare(itemA, itemB)))
//             return [...prev, itemA]
//         return prev
//     }, [] as T[])

//     var notFoundInA = listB.reduce((prev, itemB) => {
//         if (!listA.find((itemA) => compare(itemA, itemB)))
//             return [...prev, itemB]
//         return prev
//     }, [] as T[])

//     if (notFoundInB.length > 0 || notFoundInA.length > 0)
//         return [notFoundInB, notFoundInA] as [T[], T[]]
//     else return undefined
// }

// export function transpose(array: unknown[][]) {
//     var row = array[0].length
//     var column = array.length
//     var newArr = new Array(row)
//     newArr.map((row) => new Array(column))
//     array.map((row, colIndex) =>
//         row.forEach((item, rowIndex) => (newArr[colIndex][rowIndex] = item))
//     )
//     return newArr
// }
