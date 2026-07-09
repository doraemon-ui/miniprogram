export type { DecoratedClass, DoraemonDecorator } from './decorators/Component'
export { Component, createDecorator } from './decorators/Component'
export { Emit } from './decorators/Emit'
export type { BaseEvent, CustomEvent, IAnyObject, Target, TouchEvent } from './decorators/Event'
export { Event } from './decorators/Event'
export { Prop } from './decorators/Prop'
export { Watch } from './decorators/Watch'
export type {
  ComponentCustomProperties,
  ComponentInternalInstance,
  ComponentPublicInstance,
  ComponentRenderProxy,
  Config,
  DoraemonClass,
} from './instance'
export { Doraemon } from './instance'
export { defineComponentHOC, toNative } from './miniprogram/defineComponentHOC'
export type {
  ComponentOptions,
  ComputedGetter,
  ComputedOptions,
  ComputedSetter,
  DefaultComputed,
  DefaultData,
  DefaultMethods,
  DefaultProps,
  ExtractComputedReturns,
  PropOptions,
  RelationComponent,
  WatchHandler,
  WatchOptions,
  WatchOptionsWithHandler,
} from './types/options'
export { ENV_TYPE, getEnv, inMiniprogram, miniprogramThis } from './util/env'
export type { CSSStylePropertiesWithVars } from './util/styleToCssString'
