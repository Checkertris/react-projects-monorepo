import { useEffect, useRef, useState } from 'react'
import { isExtends } from '@common/utils'
import type { OptionData, AsynchOptions } from '~/types'

export function useAsycOptions<T extends PropertyKey>(
    loadingIcon: JSX.Element,
    options: (OptionData<T> | AsynchOptions<T>)[]
): { options: OptionData<T>[]; onClick: () => void } {
    const [currentOptions, setOptions] = useState<OptionData<T>[]>([])
    const refresh = useRef(async () => {
        setOptions(
            options.map((option) => {
                if (isExtends<AsynchOptions>(option))
                    return {
                        label: 'loading...',
                        value: '' as T,
                        key: '',
                        icon: loadingIcon,
                    }
                return option
            })
        )
        let newOptions: OptionData<T>[] = []
        await Promise.all(
            options.map(async (option) => {
                if (isExtends<AsynchOptions>(option)) {
                    await option
                        .fetch()
                        .then((options) => (newOptions = newOptions.concat(options)))
                } else {
                    newOptions.push(option)
                }
            })
        ).then(() => setOptions(newOptions))
    })

    useEffect(() => {
        refresh.current().catch(refresh.current)
    }, [])

    function onClick() {
        refresh.current().catch(refresh.current)
    }

    return {
        onClick,
        options: currentOptions,
    }
}
