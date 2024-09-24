// import { useState } from 'react'
// import { SelectSkeleton, UnionFieldProps } from '../../types'
// import { buildSelectField } from './buildSelectField'
export {};
// export function buildUnionField(skeleton: SelectSkeleton) {
//     const SelectField = buildSelectField(skeleton)
//     const Comp = ({ options, defaultOption }: UnionFieldProps) => {
//         const [current, setCurrent] = useState<JSX.Element | undefined>(
//             options.find((option) => (option.name = defaultOption))?.value
//         )
//         return (
//             <>
//                 <SelectField
//                     onChange={(value) => {
//                         setCurrent(value)
//                     }}
//                     options={[options]}
//                     defaultValue={}
//                 />
//                 {current}
//             </>
//         )
//     }
//     return Comp
// }
//# sourceMappingURL=unionField.js.map