import isEqual from 'lodash.isequal'
import type { MessageSource } from '~/lib'

export function matchMessageSource(
    event: MessageEvent,
    type: MessageSource,
    details?: { [k in string]: unknown }
) {
    return isEqual({ type, details }, event.source)
}
