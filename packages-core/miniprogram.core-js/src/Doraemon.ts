export { Component, createDecorator } from './decorators/Component'
export type { DecoratedClass, DoraemonDecorator } from './decorators/Component'
export { Emit } from './decorators/Emit'
export { Event } from './decorators/Event'
export type { IAnyObject, Target, BaseEvent, CustomEvent, TouchEvent } from './decorators/Event'
export { Prop } from './decorators/Prop'
export { Watch } from './decorators/Watch'

export { Doraemon } from './instance'
export type {
  DoraemonClass,
  ComponentRenderProxy,
  ComponentPublicInstance,
  ComponentCustomProperties,
  ComponentInternalInstance,
  Config,
} from './instance'

export { defineComponentHOC, toNative } from './miniprogram/defineComponentHOC'

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

export { ENV_TYPE, getEnv, miniprogramThis, inMiniprogram } from './util/env'

export type { CSSStylePropertiesWithVars } from './util/styleToCssString'
