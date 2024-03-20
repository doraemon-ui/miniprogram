import { initComponents } from '../instance/components'
import { initComputed } from '../instance/computed'
import { config } from '../instance/config'
import { initData } from '../instance/data'
import { ComponentRenderProxy, Doraemon, DoraemonClass } from '../instance/init'
import { callHook, initLifecycle } from '../instance/lifecycle'
import { initMethods } from '../instance/methods'
import { initProps } from '../instance/props'
import { initProxy } from '../instance/proxy'
import { initRefs } from '../instance/refs'
import { initWatch } from '../instance/watch'
import { setUpdatePerformance } from '../util/perf'
import { syncPropsToData } from './syncPropsToData'

export interface ComponentExternalOptions extends WechatMiniprogram.Component.ComponentOptions {
  /** 组件接受的外部样式类 */
  externalClasses?: string[]
  /** 组件自定义导出 */
  ['export']?: () => WechatMiniprogram.IAnyObject
  /** 组件间代码共享 */
  behaviors?: WechatMiniprogram.Behavior.BehaviorIdentifier[]
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

    const defaultProps = initProps(componentInstance, options.props)
    const defaultData = Object.keys(defaultProps).reduce((acc, name) => ({ ...acc, [name]: (defaultProps[name] as any).value }), {})
    const watch = initWatch(componentInstance, options.watch)
    const components = initComponents(componentInstance, options.components)
    const methods = initMethods(componentInstance, options.methods)

    const componentConf: WechatMiniprogram.Component.Options<any, any, any> = {
      options: {
        multipleSlots: typeof externalOptions.multipleSlots !== 'undefined' ?
          externalOptions.multipleSlots : true,
        addGlobalClass: typeof externalOptions.addGlobalClass !== 'undefined' ?
          externalOptions.addGlobalClass : true,
      },
      externalClasses: ['dora-class', 'dora-hover-class'].concat(
        Array.isArray(externalOptions.externalClasses) ?
          externalOptions.externalClasses : []
      ),
      ['export'] (this: ComponentRenderProxy<Doraemon>) {
        if (externalOptions['export']) {
          return externalOptions['export'].call(this)
        }
        return this.$component ? this.$component : this
      },
      relations: components,
      behaviors: (Array.isArray(externalOptions.behaviors) ?
        externalOptions.behaviors : []).concat(['wx://component-export', syncPropsToData(options.computed)]),
      observers: {
        ...watch,
        ['**']: function defineComputed (newVal) {
          initComputed(this.$component)
        },
      },
      properties: defaultProps,
      data: defaultData,
      methods,
      lifetimes: {
        created: function beforeCreate(this: ComponentRenderProxy<Doraemon>) {
          this.$component = new target()
          this.$component._render(this)
          
          initLifecycle(this.$component, options)
          initRefs(this.$component)
          callHook(this.$component, 'beforeCreate')
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
        detached: function destroyed(this: ComponentRenderProxy<Doraemon>) {
          if (!this.$component._isDestroyed) {
            this.$component._isDestroyed = true
          }
          callHook(this.$component, 'destroyed')
        },
        error: function errorCaptured(this: ComponentRenderProxy<Doraemon>) {
          callHook(this.$component, 'errorCaptured')
        },
      },
    }

    return Component(componentConf)
  }
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
