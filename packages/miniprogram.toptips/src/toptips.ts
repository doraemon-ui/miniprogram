import { getCurrentPage, findComponentNode } from '@doraemon-ui/miniprogram.shared'
import type { MiniprogramPublicInstance } from '@doraemon-ui/miniprogram.shared'
import type { ToptipsInstance, ToptipsShowOptions, ToptipsShowProps } from './types'

const mergeOptions = (selector?: ToptipsShowOptions | string, instance?: MiniprogramPublicInstance): Required<ToptipsShowOptions> => {
  const options: Required<ToptipsShowOptions> = {
    selector: '#dora-toptips',
    instance: getCurrentPage(),
  }
  if (typeof selector === 'string') {
    options.selector = selector
    if (instance) options.instance = instance
  } else if (selector && typeof selector === 'object') {
    if (selector.selector) options.selector = selector.selector
    if (selector.instance) options.instance = selector.instance
  }
  return options
}

export function show(props: ToptipsShowProps, options?: ToptipsShowOptions): any
export function show(props: ToptipsShowProps, selector?: string, instance?: MiniprogramPublicInstance): any
export function show(props: ToptipsShowProps = {}, selector?: ToptipsShowOptions | string, instance?: MiniprogramPublicInstance) {
  const opts = mergeOptions(selector, instance)
  const comp = findComponentNode<ToptipsInstance>(opts.selector, opts.instance)
  return (comp as any).show(props)
}
