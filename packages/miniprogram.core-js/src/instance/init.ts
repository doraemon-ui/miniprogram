import classNames from 'classnames'
import { styleToCssString } from '../util/styleToCssString'
import { warn } from '../util/warn'
import { nextTick } from '../util/nextTick'
import { isDev } from '../util/env'
import { isEqual } from '../util/isEqual'
import { eventsMixin, renderMixin, stateMixin } from './mixin'
import { proxy } from './proxy'
import { config } from './config'
import type { ComponentOptions } from '../types/options'

let uid: number = 0
let cid: number = 1

class Doraemon {
  _isDoraemon: boolean = false
  _isMounted: boolean = false
  _isDestroyed: boolean = false
  _hasHookEvent: boolean = false

  /**
   * miniprogram component instance
   *
   * @type {ComponentRenderProxy<Doraemon>}
   * @memberof Doraemon
   */
  _renderProxy: ComponentRenderProxy<Doraemon>

  // exposed properties via expose()
  _exposed: Record<string, any> | null
  _exposeProxy: Record<string, any> | null

  _uid: number
  _self: this
  $options: ComponentOptions<Doraemon>
  get $root (): Doraemon {
    return undefined
  }
  get $parent (): Doraemon {
    return undefined
  }
  get $children (): Doraemon[] {
    return undefined
  }
  get $refs (): { [key: string]: Doraemon | Doraemon[] | undefined } {
    return undefined
  }
  get $data (): Record<string, any> {
    return undefined
  }
  get $props (): Record<string, any> {
    return undefined
  }
  $emit: (event: string, ...args: any[]) => this
  $nextTick: (callback: (this: this) => void) => void

  /**
   * Creates an instance of Doraemon.
   *
   * @param {ComponentOptions<Doraemon>} [options]
   * @memberof Doraemon
   */
  constructor (options?: ComponentOptions<Doraemon>) {
    if (isDev && !(this instanceof Doraemon)) {
      warn('Doraemon is a constructor and should be called with the `new` keyword')
    }
    this._init(options)
  }

  /**
   * init.
   *
   * @param {ComponentOptions<Doraemon>} [options]
   * @memberof Doraemon
   */
  _init (options?: ComponentOptions<Doraemon>) {
    const vm = this
    vm._uid = uid++
    vm._isDoraemon = true
    vm.$options = Object.assign({},
      (vm.constructor as DoraemonClass<Doraemon>).options,
      options || {}
    )
    vm._self = vm
  }

  /**
   * proxy miniprogram component instance.
   *
   * @param {ComponentRenderProxy<Doraemon>} vm
   * @memberof Doraemon
   */
  _render (vm: ComponentRenderProxy<Doraemon>) {
    this._renderProxy = vm
  }

  static cid: number = 0
  static options: ComponentOptions<Doraemon> = {}
  static nextTick = nextTick
  static extend = extend
  static get config () {
    return config
  }
  static set config (_) {
    if (isDev) {
      warn(
        'Do not replace the Doraemon.config object, set individual fields instead.'
      )
    }
  }

  /**
   * exposed util methods.
   *
   * @static
   * @memberof Doraemon
   */
  static util = {
    warn,
    isEqual,
    classNames,
    styleToCssString
  }
}

/**
 * Class inheritance
 *
 * @param {ComponentOptions<Doraemon>} [extendOptions={}]
 * @returns
 */
function extend (extendOptions: ComponentOptions<Doraemon> = {}) {
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
    initProps(Sub)
  }
  if (Sub.options.computed) {
    initComputed(Sub)
  }

  // keep a reference to the super options at extension time
  Sub.superOptions = Super.options
  Sub.extendOptions = extendOptions
  Sub.sealedOptions = Object.assign({}, Sub.options)

  // cache constructor
  cachedCtors[SuperId] = Sub

  return Sub
}

function initProps (Component) {
  const props = Component.options.props || {}
  for (const key in props) {
    proxy(Component.prototype, 'data', key)
  }
}

function initComputed (Component) {
  const computed = Component.options.computed || {}
  for (const key in computed) {
    proxy(Component.prototype, 'data', key)
  }
}

stateMixin(Doraemon)
eventsMixin(Doraemon)
renderMixin(Doraemon)

export {
  Doraemon,
}

export type DoraemonClass<D> = { new (...args: any[]): D & Doraemon } & typeof Doraemon

export type ComponentRenderProxy<
  D extends Doraemon
> = WechatMiniprogram.Component.Instance<
  WechatMiniprogram.Component.DataOption,
  WechatMiniprogram.Component.PropertyOption,
  Partial<WechatMiniprogram.Component.MethodOption>,
  {
    $component: D
  }
>
