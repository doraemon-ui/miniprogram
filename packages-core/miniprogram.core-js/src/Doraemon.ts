export { Component } from './decorators/Component'
export { createDecorator } from './decorators/Component'
export { Emit } from './decorators/Emit'
export { Event } from './decorators/Event'
export { Prop } from './decorators/Prop'
export { Watch } from './decorators/Watch'

export {
  Doraemon,
  type DoraemonClass,
  type ComponentRenderProxy,
  type ComponentPublicInstance,
  type ComponentCustomProperties,
  type ComponentInternalInstance,
  type Config,
} from './instance'

export { defineComponentHOC, toNative } from './miniprogram/defineComponentHOC'

export type { DecoratedClass, DoraemonDecorator } from './decorators/Component'

export type { IAnyObject, Target, BaseEvent, CustomEvent, TouchEvent } from './decorators/Event'

export type {
  ExtractComputedReturns,
  ComputedGetter,
  ComputedSetter,
  ComputedOptions,
  DefaultData,
  DefaultProps,
  DefaultMethods,
  DefaultComputed,
  RelationComponent,
  ComponentOptions,
  PropOptions,
  WatchHandler,
  WatchOptions,
  WatchOptionsWithHandler,
} from './types/options'

export type { CSSStylePropertiesWithVars } from './util/styleToCssString'
