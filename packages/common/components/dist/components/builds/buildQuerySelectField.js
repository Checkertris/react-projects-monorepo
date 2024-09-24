// import { useEffect, useRef, useState } from 'react'
// import { OptionData, QuerySelectProps, SelectSkeleton } from '../../types'
// import { buildSelectField } from './buildSelectField'
export {};
// export function buildQuerySelectField(select: SelectSkeleton, loadingIcon: JSX.Element) {
//     const SelectField = buildSelectField(select)
//     const Comp = <T,>(props: QuerySelectProps<T>) => {
//         const [currentOptions, setOptions] = useState<OptionData<T>[][]>([])
//         const refresh = useRef(async () => {
//             setOptions(
//                 props.optionGroups.map((group) => {
//                     switch (group.type) {
//                         case 'query':
//                             return [
//                                 {
//                                     name: 'loading...',
//                                     value: '' as T,
//                                     key: '',
//                                     icon: loadingIcon,
//                                 },
//                             ]
//                         case 'select':
//                             return group.options
//                     }
//                 })
//             )
//             await Promise.all(
//                 props.optionGroups.map((option) => {
//                     switch (option.type) {
//                         case 'query':
//                             return option.query()
//                         case 'select':
//                             return option.options
//                     }
//                 })
//             ).then(setOptions)
//         })
//         useEffect(() => {
//             refresh.current().catch(refresh.current)
//         }, [])
//         function onClick() {
//             refresh.current().catch(refresh.current)
//         }
//         return (
//             <SelectField
//                 {...props}
//                 onClick={onClick}
//                 options={currentOptions}
//             />
//         )
//     }
//     return Comp
// }
//# sourceMappingURL=buildQuerySelectField.js.map