// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { reduceArray } from './reduceArray.js'

// interface ObjectTransforms<K, V, KOut extends PropertyKey, VOut> {
//     key?: (key: K, value: V, index: number) => KOut
//     value?: (key: K, value: V, index: number) => VOut
//     filter?: (key: K, value: V, index: number) => boolean
// }

// function map<K, V, T>(func: (key: K, value: V, index: number) => T) {
//     return (item: [K, V], index: number) => func(item[0], item[1], index)
// }

// export function reduceObject<K extends PropertyKey, V, KOut extends PropertyKey = K, VOut = V>(
//     object: Record<K, V>,
//     transform?: ObjectTransforms<K, V, KOut, VOut>
// ): Record<KOut, VOut> {
//     const newTransforms = {
//         key: (key: K, _value: V, _index: number) => key as unknown as KOut,
//         value: (_key: K, value: V, _index: number) => value as unknown as VOut,
//         filter: (_key: K, _value: V, _index: number) => true,
//     }
//     if (transform?.key) newTransforms.key = transform.key
//     if (transform?.value) newTransforms.value = transform.value
//     if (transform?.filter) newTransforms.filter = transform.filter

//     return reduceArray(Object.entries(object) as [K, V][], {
//         key: map(newTransforms.key),
//         value: map(newTransforms.value),
//         filter: map(newTransforms.filter),
//     })
// }
