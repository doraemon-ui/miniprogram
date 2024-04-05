import { warn } from '../util/warn'
import { nextTick } from '../util/nextTick'
import { isDev } from '../util/env'
import { util, extend } from '../global-api'
import { type Config, config } from './config'
import type { ComponentOptions } from '../types/options'
import type { ComponentInternalInstance } from './expose'

let uid: number = 0

class Doraemon {
  // private properties
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

  // public properties
  $options: ComponentOptions<Doraemon>
  get $root (): ComponentInternalInstance {
    return undefined
  }
  get $parent (): ComponentInternalInstance {
    return undefined
  }
  get $children (): ComponentInternalInstance[] {
    return undefined
  }
  get $refs (): { [key: string]: ComponentInternalInstance | ComponentInternalInstance[] | undefined } {
    return undefined
  }
  get $data (): Record<string, any> {
    return undefined
  }
  get $props (): Record<string, any> {
    return undefined
  }
  $emit: (event: string, ...args: any[]) => this
  $nextTick: (fn: (this: this) => void) => void

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

  // constructor information
  static cid: number = 0
  static options: ComponentOptions<Doraemon> = Object.create(null)
  static nextTick: typeof nextTick = nextTick
  static extend: typeof extend = extend
  static get config (): Config {
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
  static util: typeof util = util
}

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