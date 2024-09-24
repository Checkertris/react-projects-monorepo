import type { Expand } from '@common/utils'
import type { OptionData, SelectOptionProps, SelectProps, SelectTriggerProps } from '~/types'

export function quickSelect<P extends object>(
    trigger: (props: Expand<SelectTriggerProps & P>) => JSX.Element,
    option: (props: Expand<SelectOptionProps>) => JSX.Element,
    divider: JSX.Element
) {
    const Trigger = trigger
    const Option = option
    const Comp = <T extends PropertyKey>(props: Expand<SelectProps<T>> & P) => {
        return (
            <Trigger
                {...props}
                onClick={undefined}
                placeholder={
                    props.options.some((option) => option != 'divider')
                        ? props.emptyMessage
                        : props.placeholder
                }
                defaultValue={
                    findOption(props.options, (option) => option.value == props.defaultValue)?.key
                }
                onChange={(key) => {
                    const value = findOption(props.options, (option) => option.key == key)?.value
                    if (value) props.onChange(value)
                }}
            >
                {props.options.map((option) =>
                    option === 'divider' ? (
                        divider
                    ) : (
                        <Option key={option.key}>
                            <div>
                                {option.label}
                                {option.icon}
                            </div>
                        </Option>
                    )
                )}
            </Trigger>
        )
    }
    return Comp
}

function findOption<T extends PropertyKey>(
    options: OptionData<T>[],
    find: (option: Exclude<OptionData<T>, 'divider'>) => boolean
) {
    const option = options.find((option) => option != 'divider' && find(option))
    if (option != 'divider') return option
    return undefined
}
