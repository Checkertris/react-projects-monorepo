import { Slot } from '@radix-ui/react-slot'
import { useRef } from 'react'
import { useDraggableContext } from './context'

export const DraggableItem = (props: { index: number; children: JSX.Element }) => {
    const { setStart, onDrop } = useDraggableContext()
    const self = useRef<HTMLElement>(null)
    return (
        <Slot
            ref={self}
            draggable={true}
            onDrop={() => onDrop(props.index)}
            onDragStart={() => setStart(props.index)}
            onDragOver={() => {
                if (self.current) self.current.focus()
            }}
        >
            {props.children}
        </Slot>
    )
}
