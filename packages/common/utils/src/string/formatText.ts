import { separate } from './separate'

export const formatText = (str: string): string => {
    return separate(
        str.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)),
        ' '
    )
}
