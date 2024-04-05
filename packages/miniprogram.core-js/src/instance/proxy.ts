import type { Doraemon } from './init'
import { hasOwn } from '../util/hasOwn'
import { isReserved } from '../util/isReserved'
import { noop } from '../util/noop'

const sharedPropertyDefinition: PropertyDescriptor = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop,
}

export function proxy (target: object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter () {
    const vm: Doraemon = this
    return vm._renderProxy[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter (val) {
    const vm: Doraemon = this
    vm._renderProxy.setData({
      [key]: val,
    })
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

export function initProxy (vm: Doraemon) {
  const props = vm.$options.props
  const keys = Object.keys(vm._renderProxy.data)
  let i = keys.length
  while (i--) {
    const key = keys[i]
    if (props && hasOwn(props, key)) {
      continue
    } else if (!isReserved(key)) {
      // 在 extend 时，静态 props & computed 已经在组件的原型上代理
      // 所以只需要在实例上代理其他的 props
      if (!(key in vm)) {
        proxy(vm, 'data', key)
      }
    }
  }
}
