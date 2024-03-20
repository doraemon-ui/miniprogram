import { isDev } from '../util/env'
import { isEqual } from '../util/isEqual'
import { warn } from '../util/warn'

export function initComputed (vm, forceUpdate: boolean = false) {
  if (vm._isMounted || forceUpdate) {
    const computed = vm.$options.computed || {}
    Object.keys(computed).forEach(key => {
      const userDef = computed[key]
      const getter = typeof userDef === 'function' ? userDef : userDef.get
      if (isDev && !getter) {
        warn(
          `Getter is missing for computed property "${key}".`,
          vm
        )
      }
      if (getter) {
        const value = getter.call(vm, vm)
        if (vm.$options.props && key in vm.$options.props) {
          if (isDev) {
            warn(`The computed property "${key}" is already defined as a prop.`, vm)
          }
        } else if (!isEqual(vm._renderProxy.data[key], value)) {
          vm._renderProxy.setData({
            [key]: value,
          })
        }
      }
    })
  }
}
