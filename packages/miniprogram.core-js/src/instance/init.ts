import { warn } from '../util/warn'
import { nextTick } from '../util/nextTick'
import { isDev } from '../util/env'
import { util, extend } from '../global-api'
import { type Config, config } from './config'
import type { ComponentOptions, DefaultComputed, DefaultMethods, ExtractComputedReturns } from '../types/options'

let uid: number = 0

export class Doraemon implements ComponentInternalInstance {
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
  get $root(): ComponentPublicInstance {
    return undefined
  }
  get $parent(): ComponentPublicInstance {
    return undefined
  }
  get $children(): ComponentPublicInstance[] {
    return undefined
  }
  get $refs(): { [key: string]: ComponentPublicInstance | ComponentPublicInstance[] | undefined } {
    return undefined
  }
  get $data(): Record<string, any> {
    return undefined
  }
  get $props(): Record<string, any> {
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
  constructor(options?: ComponentOptions<Doraemon>) {
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
  _init(options?: ComponentOptions<Doraemon>) {
    const vm = this
    vm._uid = uid++
    vm._isDoraemon = true
    vm.$options = Object.assign({}, (vm.constructor as DoraemonClass<Doraemon>).options, options || {})
    vm._self = vm
  }

  /**
   * proxy miniprogram component instance.
   *
   * @param {ComponentRenderProxy<Doraemon>} vm
   * @memberof Doraemon
   */
  _render(vm: ComponentRenderProxy<Doraemon>) {
    this._renderProxy = vm
  }

  // constructor information
  static cid: number = 0
  static options: ComponentOptions<Doraemon> = Object.create(null)
  static nextTick: typeof nextTick = nextTick
  static extend: typeof extend = extend
  static get config(): Config {
    return config
  }
  static set config(_) {
    if (isDev) {
      warn('Do not replace the Doraemon.config object, set individual fields instead.')
    }
  }

  /**
   * exposed util methods.
   *
   * @static
   * @memberof Doraemon
   */
  static util: typeof util = util

  static super: typeof Doraemon
  static superOptions: ComponentOptions<Doraemon>
  static extendOptions: ComponentOptions<Doraemon>
  static sealedOptions: ComponentOptions<Doraemon>
}

export type DoraemonClass<D> = { new (...args: any[]): D & Doraemon } & typeof Doraemon

export type ComponentRenderProxy<D extends Doraemon> = WechatMiniprogram.Component.Instance<
  WechatMiniprogram.Component.DataOption,
  WechatMiniprogram.Component.PropertyOption,
  Partial<WechatMiniprogram.Component.MethodOption>,
  {
    $component: D
  }
>

// If the type T accepts type "any", output type Y, otherwise output type N.
// https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360
export type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N
export type Prettify<T> = { [K in keyof T]: T[K] } & {}
export interface ComponentCustomProperties {}
export type ComponentPublicInstance<
  D extends Doraemon = Doraemon,
  Props = {},
  RawBindings = {},
  Data = {},
  Computed extends DefaultComputed = {},
  Methods extends DefaultMethods<D> = {},
  PublicProps = Props,
> = {
  $options: ComponentOptions<D>
  $root: ComponentPublicInstance | undefined
  $parent: ComponentPublicInstance | undefined
  $children: ComponentPublicInstance[]
  $refs: { [key: string]: ComponentPublicInstance | ComponentPublicInstance[] | undefined }
  $data: Data
  $props: Prettify<Props> & PublicProps
  $emit: (event: string, ...args: any[]) => ComponentPublicInstance
  $nextTick: (fn: (this: ComponentPublicInstance) => void) => void
} & IfAny<Props, Props, Omit<Props, keyof RawBindings>> &
  RawBindings &
  ExtractComputedReturns<Computed> &
  Methods &
  ComponentCustomProperties

export interface ComponentInternalInstance<D extends Doraemon = Doraemon> extends ComponentPublicInstance<D> {
  // private properties
  _isDoraemon: boolean
  _isMounted: boolean
  _isDestroyed: boolean
  _hasHookEvent: boolean

  // miniprogram component instance
  _renderProxy: ComponentRenderProxy<D>

  // exposed properties via expose()
  _exposed: Record<string, any> | null
  _exposeProxy: Record<string, any> | null

  _uid: number
  _self: this

  /**
   * init.
   */
  _init: (options?: ComponentOptions<D>) => void

  /**
   * proxy miniprogram component instance.
   */
  _render: (vm: ComponentRenderProxy<D>) => void
}
