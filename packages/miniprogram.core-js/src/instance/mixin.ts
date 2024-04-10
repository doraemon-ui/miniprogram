import type { Doraemon } from './init'
import { isDev } from '../util/env'
import { nextTick } from '../util/nextTick'
import { toArray } from '../util/toArray'
import { warn } from '../util/warn'

export function stateMixin (Component: typeof Doraemon) {
  const dataDef: PropertyDescriptor = {}
  dataDef.get = function () {
    const vm: Doraemon = this
    return vm._renderProxy ? vm._renderProxy.data : undefined
  }
  const propsDef: PropertyDescriptor = {}
  propsDef.get = function () {
    const vm: Doraemon = this
    if (vm._renderProxy) {
      const ret: Record<string, any> = {}
      const props = vm.$options.props
      if (props) {
        for (const key in props) {
          ret[key] = vm._renderProxy.properties[key]
        }
      }
      return ret
    }
    return undefined
  }
  if (isDev) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      )
    }
    propsDef.set = function () {
      warn('$props is readonly.', this)
    }
  }
  Object.defineProperty(Component.prototype, '$data', dataDef)
  Object.defineProperty(Component.prototype, '$props', propsDef)
}

export function renderMixin (Component: typeof Doraemon) {
  Component.prototype.$nextTick = function (fn) {
    return nextTick(fn)
  }
}

export function eventsMixin (Component: typeof Doraemon) {
  Component.prototype.$emit = function (event) {
    const vm: Doraemon = this
    const args = toArray(arguments, 1)
    if (vm._renderProxy) {
      vm._renderProxy.triggerEvent(event, ...args)
    }
    return vm
  }
}
