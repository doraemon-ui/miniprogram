import { proxy } from '../instance/proxy'
import type { ComponentOptions } from '../types/options'
import type { Doraemon, DoraemonClass } from '../instance'

let cid = 1

/**
 * Class inheritance
 *
 * @param {ComponentOptions<Doraemon>} [extendOptions={}]
 * @returns
 */
export function extend (extendOptions: ComponentOptions<Doraemon> = {}) {
  const Super = this as DoraemonClass<Doraemon>
  const SuperId = Super.cid
  const cachedCtors = (extendOptions as any)._Ctor || ((extendOptions as any)._Ctor = {})
  if (cachedCtors[SuperId]) {
    return cachedCtors[SuperId]
  }
  const Sub = function DoraemonComponent(options: ComponentOptions<Doraemon> = {}) {
    this._init(options)
  }
  Sub.prototype = Object.create(Super.prototype)
  Sub.prototype.constructor = Sub
  Sub.cid = cid++
  Sub.options = Object.assign({}, Super.options, extendOptions)
  Sub.extend = Super.extend
  Sub['super'] = Super

  // 在这里 props & computed 定义在原型上
  // 避免为每个创建的实例调用 Object.defineProperty
  if (Sub.options.props) {
    initProps(Sub as unknown as DoraemonClass<Doraemon>)
  }
  if (Sub.options.computed) {
    initComputed(Sub as unknown as DoraemonClass<Doraemon>)
  }

  // keep a reference to the super options at extension time
  Sub.superOptions = Super.options
  Sub.extendOptions = extendOptions
  Sub.sealedOptions = Object.assign({}, Sub.options)

  // cache constructor
  cachedCtors[SuperId] = Sub

  return Sub as unknown as DoraemonClass<Doraemon>
}

function initProps (Component: DoraemonClass<Doraemon>) {
  const props = Component.options.props || {}
  for (const key in props) {
    proxy(Component.prototype, 'data', key)
  }
}

function initComputed (Component: DoraemonClass<Doraemon>) {
  const computed = Component.options.computed || {}
  for (const key in computed) {
    proxy(Component.prototype, 'data', key)
  }
}
