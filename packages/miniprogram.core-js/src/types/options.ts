import type { Doraemon } from '../instance/init'

export type ExtractComputedReturns<T extends any> = {
  [key in keyof T]: T[key] extends { get: (...args: any[]) => infer TReturn }
    ? TReturn
    : T[key] extends (...args: any[]) => infer TReturn
      ? TReturn
      : never
}

export type ComputedGetter<T> = () => T
export type ComputedSetter<T> = (newValue: T) => void

export interface ComputedOptions<T> {
  get: ComputedGetter<T>
  set: ComputedSetter<T>
}

export type DefaultData<D> =  object | ((this: D) => object)
export type DefaultProps = Record<string, any>
export type DefaultMethods<D> =  { [key: string]: (this: D, ...args: any[]) => any }
export type DefaultComputed = Record<
  string,
  ComputedGetter<any> | ComputedOptions<any>
>

// export type Component<
//   Data=DefaultData<never>,
//   Methods=DefaultMethods<never>,
//   Computed=DefaultComputed,
//   Props=DefaultProps
// > =
//   | typeof Doraemon
//   | ComponentOptions<never, Data, Methods, Computed, Props>

export type DefaultComponents<T = {
  ['module']?: string
  type?: 'ancestor' | 'parent' | 'child' | 'descendant'
  observer?: string | Function
}> = {
  [key: string]: string | Partial<T> | (() => (Partial<T>))
}

export interface ComponentOptions<
  D extends Doraemon,
  Data = DefaultData<D>,
  Methods = DefaultMethods<D>,
  Computed = DefaultComputed,
  PropsDef=PropsDefinition<DefaultProps>
> {
  data?: Data
  props?: PropsDef
  computed?: Computed
  methods?: Methods
  watch?: Record<string, WatchOptionsWithHandler<any> | WatchHandler<any>>

  beforeCreate?(this: D): void
  created?(): void
  mounted?(): void
  /** @deprecated use `unmounted` instead */
  destroyed?(): void
  unmounted?(): void
  errorCaptured?(): void

  components?: DefaultComponents

  mixins?: (ComponentOptions<Doraemon> | typeof Doraemon)[]
  name?: string
  expose?: string[]
}

export type Prop<T> = { (): T } | { new(...args: never[]): T & object } | { new(...args: string[]): Function }

export type PropType<T> = Prop<T> | Prop<T>[]

export type PropValidator<T> = PropOptions<T> | PropType<T>

export interface PropOptions<T = any> {
  type?: PropType<T>
  default?: T | null | undefined | (() => T | null | undefined)
}

export type RecordPropsDefinition<T> = {
  [K in keyof T]: PropValidator<T[K]>
}
export type ArrayPropsDefinition<T> = (keyof T)[]
export type PropsDefinition<T> = ArrayPropsDefinition<T> | RecordPropsDefinition<T>

export type WatchHandler<T> = string | ((val: T, oldVal: T) => void)

export interface WatchOptions {
  deep?: boolean
  immediate?: boolean
}

export interface WatchOptionsWithHandler<T> extends WatchOptions {
  handler: WatchHandler<T>
}
