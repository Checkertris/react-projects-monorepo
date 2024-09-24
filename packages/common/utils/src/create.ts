// export function applyMixins(target: unknown, constructors: unknown[]) {
//     constructors.forEach((baseCtor) => {
//         Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
//             Object.defineProperty(
//                 target.prototype,
//                 name,
//                 Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null)
//             )
//         })
//     })
// }

export function create<P extends unknown[], I>(ctor: new (...args: P) => I) {
    return (...params: P) => new ctor(...params)
}
