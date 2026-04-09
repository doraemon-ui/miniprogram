import type { Doraemon } from '../instance'
import type { ThrottleOptions } from '../util/throttle'

/**
 * ExtractComputedReturns类型定义
 */
export type ExtractComputedReturns<T extends any> = {
  [key in keyof T]: T[key] extends { get: (...args: any[]) => infer TReturn }
    ? TReturn
    : T[key] extends (...args: any[]) => infer TReturn
      ? TReturn
      : never
}

/**
 * ComputedGetter类型定义
 */
export type ComputedGetter<T> = () => T
/**
 * ComputedSetter类型定义
 */
export type ComputedSetter<T> = (newValue: T) => void

/**
 * ComputedOptions接口定义
 */
export interface ComputedOptions<T> {
  /**
   * get
   * @type {ComputedGetter<T>}
   */
  get: ComputedGetter<T>

  /**
   * set
   * @type {ComputedSetter<T>}
   */
  set: ComputedSetter<T>
}

/**
 * DefaultData类型定义
 */
export type DefaultData<D> = object | ((this: D) => object)
/**
 * DefaultProps类型定义
 */
export type DefaultProps = Record<string, any>
/**
 * DefaultMethods类型定义
 */
export type DefaultMethods<D> = { [key: string]: (this: D, ...args: any[]) => any }
/**
 * DefaultComputed类型定义
 */
export type DefaultComputed = Record<string, ComputedGetter<any> | ComputedOptions<any>>

/**
 * RelationComponent类型定义
 */
export type RelationComponent<D> = {
  ['module']?: string
  type?: 'ancestor' | 'parent' | 'child' | 'descendant'
  observer?: string | ((target: D) => void)
  throttle?:
    | number
    | boolean
    | {
        wait?: number
        options?: ThrottleOptions
      }
}

/**
 * ComponentOptions接口定义
 */
export interface ComponentOptions<
  D extends Doraemon,
  Data = DefaultData<D>,
  Methods = DefaultMethods<D>,
  Computed = DefaultComputed,
  PropsDef = PropsDefinition<DefaultProps>,
> {
  data?: Data
  props?: PropsDef
  computed?: Computed
  methods?: Methods
  watch?: Record<string, WatchOptionsWithHandler<any> | WatchHandler<any>>

  beforeCreate?(this: D): void
  created?(): void
  mounted?(): void
  /**
   * @deprecated use `unmounted` instead
   */
  destroyed?(): void
  unmounted?(): void
  errorCaptured?(): void

  components?: {
    [key: string]: string | Partial<RelationComponent<D>> | (() => Partial<RelationComponent<D>>)
  }

  mixins?: (ComponentOptions<Doraemon> | typeof Doraemon)[]
  name?: string
  expose?: string[]
}

/**
 * Prop类型定义
 */
export type Prop<T> = { (): T } | { new (...args: never[]): T & object } | { new (...args: string[]): Function }

/**
 * PropType类型定义
 */
export type PropType<T> = Prop<T> | Prop<T>[]

/**
 * PropValidator类型定义
 */
export type PropValidator<T> = PropOptions<T> | PropType<T>

/**
 * PropOptions接口定义
 */
export interface PropOptions<T = any> {
  /**
   * type
   * @type {PropType<T>}
   */
  type?: PropType<T>
  default?: T | null | undefined | (() => T | null | undefined)
}

/**
 * RecordPropsDefinition类型定义
 */
export type RecordPropsDefinition<T> = {
  [K in keyof T]: PropValidator<T[K]>
}
/**
 * ArrayPropsDefinition类型定义
 */
export type ArrayPropsDefinition<T> = (keyof T)[]
/**
 * PropsDefinition类型定义
 */
export type PropsDefinition<T> = ArrayPropsDefinition<T> | RecordPropsDefinition<T>

/**
 * WatchHandler类型定义
 */
export type WatchHandler<T> = string | ((val: T, oldVal: T) => void)

/**
 * WatchOptions接口定义
 */
export interface WatchOptions {
  /**
   * deep
   * @type {boolean}
   */
  deep?: boolean

  /**
   * immediate
   * @type {boolean}
   */
  immediate?: boolean
}

/**
 * WatchOptionsWithHandler接口定义
 */
export interface WatchOptionsWithHandler<T> extends WatchOptions {
  /**
   * handler
   * @type {WatchHandler<T>}
   */
  handler: WatchHandler<T>
}
