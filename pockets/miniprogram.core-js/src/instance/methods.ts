import { isDev } from '../util/env'
import { hasOwn } from '../util/hasOwn'
import { isReserved } from '../util/isReserved'
import { noop } from '../util/noop'
import { warn } from '../util/warn'

export function initMethods (vm, methods) {
  const methodProxy = {}
  const props = vm.$options.props
  for (const key in methods) {
    if (isDev) {
      if (typeof methods[key] !== 'function') {
        warn(
          `Method "${key}" has type "${typeof methods[key]}" in the component definition. ` +
          'Did you reference the function correctly?',
          vm
        )
      }
      if (props && hasOwn(props, key)) {
        warn(
          `Method "${key}" has already been defined as a prop.`,
          vm
        )
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          `Method "${key}" conflicts with an existing Doraemon instance method. ` +
          'Avoid defining component methods that start with _ or $.'
        )
      }
    }
    methodProxy[key] = typeof methods[key] !== 'function' ? noop : function (...args: any[]) {
      return this.$component[key].call(this.$component, ...args)
    }
  }
  return methodProxy
}
