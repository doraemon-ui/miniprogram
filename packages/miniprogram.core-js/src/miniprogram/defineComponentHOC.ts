import { initComponents, useThrottle } from '../instance/components'
import { initComputed } from '../instance/computed'
import { config } from '../instance/config'
import { initData } from '../instance/data'
import { callHook, initLifecycle } from '../instance/lifecycle'
import { initExposed, getPublicInstance } from '../instance/expose'
import { initMethods } from '../instance/methods'
import { initProps } from '../instance/props'
import { initProxy } from '../instance/proxy'
import { initRefs } from '../instance/refs'
import { initWatch } from '../instance/watch'
import { isDef } from '../util/isDef'
import { setUpdatePerformance } from '../util/perf'
import { syncPropsToData } from './syncPropsToData'
import type { ComponentRenderProxy, Doraemon, DoraemonClass } from '../instance'

export interface ComponentExternalOptions extends WechatMiniprogram.Component.ComponentOptions {
  /** 组件接受的外部样式类 */
  externalClasses?: string[]
  /** 组件自定义导出 */
  expose?: () => WechatMiniprogram.IAnyObject
  /** 组件间代码共享 */
  behaviors?: WechatMiniprogram.Behavior.BehaviorIdentifier[]
  /** 组件的内部数据 */
  data?: Record<string, any> | (() => Record<string, any>)
}

export function defineComponentHOC (externalOptions: ComponentExternalOptions = {}) {
  return function (target: DoraemonClass<Doraemon>) {
    mergeStaticProperty(externalOptions, target)

    const componentInstance = new target()
    const options = componentInstance.$options

    options.props = options.props || {}
    options.data = options.data || {}
    options.watch = options.watch || {}
    options.computed = options.computed || {}
    options.components = options.components || {}
    options.methods = options.methods || {}
    options.mixins = options.mixins || []

    const defaultProps = initProps(componentInstance, options.props) as
      WechatMiniprogram.Component.PropertyOption
    const watch = initWatch(componentInstance, options.watch)
    const components = initComponents(componentInstance, options.components) as
      { [componentName: string]: WechatMiniprogram.Component.RelationOption }
    const methods = initMethods(componentInstance, options.methods)

    const componentConf: WechatMiniprogram.Component.Options<any, any, any> = {
      options: {
        multipleSlots: isDef(externalOptions.multipleSlots) ?
          externalOptions.multipleSlots : true,
        addGlobalClass: isDef(externalOptions.addGlobalClass) ?
          externalOptions.addGlobalClass : true,
      },
      externalClasses: [
        'dora-class',
        'dora-class-a',
        'dora-class-b',
        'dora-class-c',
        'dora-hover-class'
      ].concat(
        Array.isArray(externalOptions.externalClasses) ?
          externalOptions.externalClasses : []
      ),
      ['export'] (this: ComponentRenderProxy<Doraemon>) {
        if (externalOptions.expose) {
          return externalOptions.expose.call(this)
        }
        return getPublicInstance(this.$component)
      },
      relations: { ...components },
      behaviors: (Array.isArray(externalOptions.behaviors) ?
        externalOptions.behaviors : []).concat([
          'wx://component-export',
          useThrottle(),
          syncPropsToData(defaultProps, options.computed)
        ]),
      observers: {
        ...watch,
        ['**']: function defineComputed (this: ComponentRenderProxy<Doraemon>) {
          initComputed(this.$component)
        },
      },
      properties: { ...defaultProps },
      data: {
        ...(typeof externalOptions.data === 'function'
          ? (externalOptions.data() || {})
          : (externalOptions.data || {})) as Record<string, any>
      },
      methods: { ...methods },
      lifetimes: {
        created: function beforeCreate(this: ComponentRenderProxy<Doraemon>) {
          this.$component = new target()
          this.$component._render(this)
          
          initLifecycle(this.$component, options)
          initRefs(this.$component)
          callHook(this.$component, 'beforeCreate')
          initExposed(this.$component)
        },
        attached: function created(this: ComponentRenderProxy<Doraemon>) {
          initData(this.$component)
          initProxy(this.$component)
          initComputed(this.$component, true)
          if (config.performance) {
            setUpdatePerformance(this)
          }
          callHook(this.$component, 'created')
        },
        ready: function mounted(this: ComponentRenderProxy<Doraemon>) {
          if (!this.$component._isMounted) {
            this.$component._isMounted = true
          }
          callHook(this.$component, 'mounted')
        },
        detached: function unmounted(this: ComponentRenderProxy<Doraemon>) {
          if (!this.$component._isDestroyed) {
            this.$component._isDestroyed = true
          }
          callHook(this.$component, 'destroyed')
          callHook(this.$component, 'unmounted')
        },
        error: function errorCaptured(this: ComponentRenderProxy<Doraemon>) {
          callHook(this.$component, 'errorCaptured')
        },
      },
    }

    return Component(componentConf)
  }
}

export function toNative (target: DoraemonClass<Doraemon>) {
  return defineComponentHOC()(target)
}

function mergeStaticProperty(config: ComponentExternalOptions, target: DoraemonClass<Doraemon>) {
  for (const key in target) {
    config[key] = target[key]
  }
  // 低版本 IOS 下部分属性不能直接访问
  Object.getOwnPropertyNames(target).forEach(key => {
    const excludes = ['arguments', 'caller', 'length', 'name', 'prototype']
    if (excludes.indexOf(key) < 0) {
      config[key] = target[key]
    }
  })
}
