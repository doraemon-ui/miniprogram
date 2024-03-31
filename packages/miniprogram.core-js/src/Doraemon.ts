export { Component } from './decorators/Component'
export { Emit } from './decorators/Emit'
export { Event } from './decorators/Event'
export { Prop } from './decorators/Prop'
export { Watch } from './decorators/Watch'

export { Doraemon } from './instance/init'

export { defineComponentHOC, toNative } from './miniprogram/defineComponentHOC'

export type { DoraemonDecorator } from './decorators/Component'

export type {
  IAnyObject,
  Target,
  BaseEvent,
  CustomEvent,
  TouchEvent,
} from './decorators/Event'

export type {
  ComponentPublicInstance,
  ComponentCustomProperties
} from './types/componentPublicInstance'

export type {
  ExtractComputedReturns,
  ComputedGetter,
  ComputedSetter,
  ComputedOptions,
  DefaultData,
  DefaultProps,
  DefaultMethods,
  DefaultComputed,
  DefaultComponents,
  ComponentOptions,
  PropOptions,
  WatchOptions
} from './types/options'
