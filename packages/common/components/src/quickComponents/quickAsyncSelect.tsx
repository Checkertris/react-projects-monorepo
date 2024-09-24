import type { Expand } from '@common/utils'
import type { AsyncSelectProps, SelectOptionProps, SelectTriggerProps } from '~/types'
import { quickSelect } from './quickSelect'
import { useAsycOptions } from '~/hooks'
import { Slot } from '@radix-ui/react-slot'

export function quickAsyncSelect<P extends object>(
    trigger: (props: Expand<SelectTriggerProps & P>) => JSX.Element,
    option: (props: Expand<SelectOptionProps>) => JSX.Element,
    divider: JSX.Element,
    loadingIcon: JSX.Element
) {
    const Select = quickSelect(trigger, option, divider)
    const Comp = <T extends PropertyKey>(props: Expand<AsyncSelectProps<T>> & P) => {
        const { onClick, options } = useAsycOptions(loadingIcon, props.options)
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
