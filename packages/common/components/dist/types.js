export {};
// //Container
// export interface ContainerProps {
//     label?: string | undefined
//     children: ReactNode
// }
// //Toggle
// export interface ToggleProps {
//     defaultOpen?: boolean
//     children: ReactNode
// }
// export interface ToggleShellProps {
//     onClick: () => void
//     open: boolean
//     children: ReactNode
// }
// import type { Expand } from '@common/utils'
// import { useState } from 'react'
// import type { ToggleProps, ToggleShellProps } from '~/types'
// export function quickToggle({
//     defaultOpen,
//     children,
// }: Expand<ToggleProps>): Expand<ToggleShellProps> {
//     const [open, setOpen] = useState<boolean>(defaultOpen ? defaultOpen : false)
//     return {
//         open,
//         onClick: () => setOpen(!open),
//         children: open && children,
//     }
// }
//# sourceMappingURL=types.js.map