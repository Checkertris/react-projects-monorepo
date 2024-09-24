import { useNonNullableContext } from '@common/utils'
import { createContext } from 'react'

export interface DraggableMethods {
    setStart: (index: number) => void
    onDrop: (index: number) => void
}

export const DraggableContext = createContext<DraggableMethods | undefined>(undefined)
export const useDraggableContext = () => useNonNullableContext(DraggableContext)
