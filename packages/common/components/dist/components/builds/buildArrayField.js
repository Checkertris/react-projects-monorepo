// import { useState } from 'react'
// import { Expand } from '@common/utils'
// import type { ArrayFieldProps, ArrayFieldShellProps } from '../../types'
export {};
// export function arrayField(Shell: (props: Expand<ArrayFieldShellProps>) => JSX.Element) {
//     const Comp = ({ defaultCount, max, onAdd, onRemove, cell: Cell }: ArrayFieldProps) => {
//         const [count, setCount] = useState(defaultCount)
//         function addInternal() {
//             if (max && count >= max) return
//             setCount(count + 1)
//             onAdd()
//         }
//         return (
//             <Shell
//                 onAdd={addInternal}
//                 onRemove={onRemove}
//                 cells={[...Array(count).keys()].map((index) => (
//                     <Cell
//                         index={index}
//                         key={index}
//                     />
//                 ))}
//             />
//         )
//     }
//     return Comp
// }
//# sourceMappingURL=buildArrayField.js.map