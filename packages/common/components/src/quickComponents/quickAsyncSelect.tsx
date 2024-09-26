import type { AsyncSelectProps, SelectOptionProps, SelectTriggerProps } from '~/types'
import { quickSelect } from './quickSelect'
import { useAsyncOptions } from '~/hooks'
import { Slot } from '@radix-ui/react-slot'

export function quickAsyncSelect<P extends object>(
    trigger: (props: SelectTriggerProps & P) => JSX.Element,
    option: (props: SelectOptionProps) => JSX.Element,
    divider: JSX.Element,
    loadingIcon: JSX.Element
) {
    const Select = quickSelect(trigger, option, divider)
    const Comp = <T extends PropertyKey>(props: AsyncSelectProps<T> & P) => {
        const { onClick, options } = useAsyncOptions(loadingIcon, props.options)
        return (
            <Slot onClick={onClick}>
                <Select
                    {...props}
                    options={options}
                />
            </Slot>
        )
    }
    return Comp
}
