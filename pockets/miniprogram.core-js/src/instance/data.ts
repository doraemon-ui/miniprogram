import { isDev } from '../util/env'
import { hasOwn } from '../util/hasOwn'
import { isPlainObject } from '../util/isPlainObject'
import { isReserved } from '../util/isReserved'
import { warn } from '../util/warn'

export function initData (vm) {
  let data = vm.$options.data || {}
  data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}
  const mixins = vm.$options.mixins || []
  const instData = mixins.reduce((acc, mixin) => ({ ...acc, ...getData(mixin.data, vm) }), {})
  data = {
    ...data,
    ...instData,
  }
  vm._renderProxy.setData(data)
}

function getData (data: Function, vm): any {
  try {
    let ret = {}
    data = data.call(vm, vm)
    if (!isPlainObject(data)) {
      data = {} as any
      if (isDev) {
        warn('data functions should return an object', vm)
      }
    }
    const keys = Object.keys(data)
    const props = vm.$options.props
    const methods = vm.$options.methods
    let i = keys.length
    while (i--) {
      const key = keys[i]
      if (isDev) {
        if (methods && hasOwn(methods, key)) {
          warn(
            `Method "${key}" has already been defined as a data property.`,
            vm
          )
        }
      }
      if (props && hasOwn(props, key)) {
        isDev && warn(
          `The data property "${key}" is already declared as a prop. ` +
          'Use prop default value instead.',
          vm
        )
      } else if (!isReserved(key)) {
        // properties starting with "$" or "_" are not set in miniprogram instance
        ret[key] = data[key]
      }
    }
    return ret
  } catch (e) {
    return {}
  }
}
