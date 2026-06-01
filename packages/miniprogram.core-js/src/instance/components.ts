import type { ComponentRenderProxy, Doraemon } from './init'
import type { ComponentOptions, RelationComponent } from '../types/options'
import { debounce } from '../util/debounce'
import type { DebounceOptions, DebounceReturn } from '../util/debounce'
import { throttle } from '../util/throttle'
import type { ThrottleOptions, ThrottleReturn } from '../util/throttle'
import { isPlainObject } from '../util/isPlainObject'
import { noop } from '../util/noop'
import { isDef } from '../util/isDef'
import { subscribeConfigProvider, unsubscribeConfigProvider } from './configProvider'
import type { ConfigProviderValue } from './configProvider'

interface RelationOption {
  /**
   * 目标组件的相对关系
   */
  type: 'parent' | 'child' | 'ancestor' | 'descendant'
  /**
   * 关系生命周期函数，当关系被建立在页面节点树中时触发，触发时机在组件attached生命周期之后
   */
  linked?(target: ComponentRenderProxy<Doraemon>): void
  /**
   * 关系生命周期函数，当关系在页面节点树中发生改变时触发，触发时机在组件moved生命周期之后
   */
  linkChanged?(target: ComponentRenderProxy<Doraemon>): void
  /**
   * 关系生命周期函数，当关系脱离页面节点树时触发，触发时机在组件detached生命周期之后
   */
  unlinked?(target: ComponentRenderProxy<Doraemon>): void
  /**
   * 如果这一项被设置，则它表示关联的目标节点所应具有的behavior，所有拥有这一behavior的组件节点都会被关联
   */
  target?: string
}

export function initComponents(
  vm: Doraemon,
  components: ComponentOptions<Doraemon>['components'],
): {
  [componentName: string]: RelationOption
} {
  return Object.keys(components).reduce((acc, key) => {
    const { module: componentName, type = 'child', observer, debounce = true } = getData(components[key])
    const linkCb = function (this: ComponentRenderProxy<Doraemon>, target: ComponentRenderProxy<Doraemon>) {
      const oName = `_${componentName.replace(/\./g, '').replace(/\//g, '_')}_debounced`
      const oFn = function (target: ComponentRenderProxy<Doraemon>) {
        const renderProxy: ComponentRenderProxy<Doraemon> = this
        if (renderProxy.$component._isMounted) {
          if (typeof observer === 'string') {
            return renderProxy.$component[observer]?.(target.$component)
          } else if (typeof observer === 'function') {
            return observer.call(renderProxy.$component, target.$component)
          }
        }
      }
      if (debounce !== undefined && debounce !== false) {
        if (!this[oName]) {
          let opts: {
            wait: number
            options: Partial<DebounceOptions>
          } = {
            wait: 50,
            options: {
              trailing: true,
              leading: false,
            },
          }
          if (typeof debounce === 'number') {
            opts.wait = debounce
          } else if (isPlainObject(debounce) && debounce !== true) {
            opts = {
              ...opts,
              ...debounce,
            }
          }
          const { wait, options } = opts
          const { run } = this.useDebounceFn(oFn.bind(this), wait, options)
          this[oName] = run
        }
        this[oName].call(this, target)
      } else {
        return oFn.call(this, target)
      }
    }
    const option: Record<string, any> = {
      type,
      linked: !isDef(observer) ? noop : linkCb,
      linkChanged: !isDef(observer) ? noop : linkCb,
      unlinked: !isDef(observer) ? noop : linkCb,
    }
    return {
      ...acc,
      [componentName]: option,
    }
  }, {})
}

export function getData(
  comp: string | Partial<RelationComponent<Doraemon>> | (() => Partial<RelationComponent<Doraemon>>),
): RelationComponent<Doraemon> {
  if (typeof comp === 'function') {
    const ret = comp()
    return {
      ['module']: ret.module,
      type: ret.type,
      observer: ret.observer,
      debounce: ret.debounce,
    }
  } else if (typeof comp === 'string') {
    return {
      ['module']: comp,
    }
  } else if (isPlainObject(comp)) {
    return {
      ['module']: comp.module,
      type: comp.type,
      observer: comp.observer,
      debounce: comp.debounce,
    }
  }
  return {}
}

export function useThrottle() {
  return Behavior({
    lifetimes: {
      created() {
        this.useThrottleFn = function (fn: Function, wait = 50, options: ThrottleOptions) {
          const throttled = throttle(fn.bind(this), wait, options)
          this._throttledFns.push(throttled)
          return {
            run: throttled,
            cancel: throttled.cancel,
            flush: throttled.flush,
          }
        }
        this.useDebounceFn = function (fn: Function, wait = 50, options: Partial<DebounceOptions>) {
          const debounced = debounce(fn.bind(this), wait, options as DebounceOptions)
          this._debouncedFns.push(debounced)
          return {
            run: debounced,
            cancel: debounced.cancel,
            flush: debounced.flush,
          }
        }
        this._throttledFns = []
        this._debouncedFns = []
      },
      detached() {
        if (this._throttledFns.length > 0) {
          ;(this._throttledFns as ThrottleReturn<any>[]).forEach((throttled) => {
            throttled.cancel()
          })
          this._throttledFns = []
        }
        if (this._debouncedFns.length > 0) {
          ;(this._debouncedFns as DebounceReturn<any>[]).forEach((debounced) => {
            debounced.cancel()
          })
          this._debouncedFns = []
        }
      },
    },
  })
}

type ConfigConsumerProxy = ComponentRenderProxy<Doraemon> & {
  __configProviderUpdateScheduled?: boolean
}

type DoraemonWithConfigMergedValue = Doraemon & {
  __configProviderMergedValue?: ConfigProviderValue
}

export function useConfigProviderConsumer() {
  return Behavior({
    definitionFilter(defFields: { data?: Record<string, unknown> }) {
      defFields.data = defFields.data || {}
      defFields.data = Object.assign(defFields.data, {
        __configProviderVersion: 0,
      })
    },
    lifetimes: {
      attached() {
        const renderProxy: ComponentRenderProxy<Doraemon> = this

        const scheduleUpdate = () => {
          if ((renderProxy as ConfigConsumerProxy).__configProviderUpdateScheduled) return
          ;(renderProxy as ConfigConsumerProxy).__configProviderUpdateScheduled = true
          setTimeout(() => {
            ;(renderProxy as ConfigConsumerProxy).__configProviderUpdateScheduled = false
            // In some runtimes, calling setData too early (inside attached) may break template init.
            if (typeof renderProxy.setData === 'function') {
              renderProxy.setData({
                __configProviderVersion: (renderProxy.data.__configProviderVersion || 0) + 1,
              })
            }
          }, 0)
        }

        // Re-subscribe when attached.
        unsubscribeConfigProvider(renderProxy)
        subscribeConfigProvider(renderProxy, (nextMergedValue) => {
          if (renderProxy.$component) {
            ;(renderProxy.$component as DoraemonWithConfigMergedValue).__configProviderMergedValue = nextMergedValue
          }
          scheduleUpdate()
        })
      },
      detached() {
        const renderProxy: ComponentRenderProxy<Doraemon> = this
        unsubscribeConfigProvider(renderProxy)
      },
    },
  })
}
