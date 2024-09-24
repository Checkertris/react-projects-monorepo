import { seperate } from './seperate'

export const formatText = (str: string): string => {
    return seperate(
        str.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)),
        ' '
    )
}
