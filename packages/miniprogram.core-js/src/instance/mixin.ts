import { isDev } from '../util/env'
import { nextTick } from '../util/nextTick'
import { toArray } from '../util/toArray'
import { warn } from '../util/warn'

export function stateMixin (Component) {
  const dataDef: any = {}
  dataDef.get = function () { return this._renderProxy ? this._renderProxy.data : undefined }
  const propsDef: any = {}
  propsDef.get = function () { return this._renderProxy ? this._renderProxy.properties : undefined }
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

export function renderMixin (Component) {
  Component.prototype.$nextTick = function (fn) {
    return nextTick(fn)
  }
}

export function eventsMixin (Component) {
  Component.prototype.$emit = function (event) {
    const args = toArray(arguments, 1)
    if (this._renderProxy) {
      this._renderProxy.triggerEvent(event, ...args)
    }
    return this
  }
}
