// import { OptionData, SelectProps, SelectSkeleton } from '../../types'
export {};
// function findOption<T>(options: OptionData<T>[][], find: (option: OptionData<T>) => boolean) {
//     return options.find((option) => option.some(find))?.find(find)
// }
// export function buildSelectField({
//     option: Option,
//     trigger: Trigger,
//     divider: Separator,
// }: SelectSkeleton) {
//     const Comp = <T,>({
//         options,
//         onClick,
//         emptyMessage,
//         placeholder,
//         onChange,
//         defaultValue,
//     }: SelectProps<T>) => {
//         return (
//             <Trigger
//                 placeholder={findOption(options, () => true) ? emptyMessage : placeholder}
//                 defaultValue={findOption(options, (option) => option.value == defaultValue)?.name}
//                 onClick={onClick}
//                 onChange={(name) => {
//                     const value = findOption(options, (option) => option.name == name)?.value
//                     if (value) onChange(value)
//                 }}
//             >
//                 {options.map(
//                     (group, index) => (
//                         group.map((option, index) => (
//                             <Option key={index.toString()}>
//                                 <div>
//                                     {option.name}
//                                     {option.icon}
//                                 </div>
//                             </Option>
//                         )),
//                         index != group.length - 1 && Separator
//                     )
//                 )}
//             </Trigger>
//         )
//     }
//     return Comp
// }
//# sourceMappingURL=buildSelectField.js.map