import type { ComponentRenderProxy, Doraemon } from './init'
import type { ComponentOptions, RelationComponent } from '../types/options'
import { type ThrottleOptions, type ThrottleReturn, throttle } from '../util/throttle'
import { isPlainObject } from '../util/isPlainObject'
import { noop } from '../util/noop'
import { isDef } from '../util/isDef'

interface RelationOption {
  /** 目标组件的相对关系 */
  type: 'parent' | 'child' | 'ancestor' | 'descendant'
  /** 关系生命周期函数，当关系被建立在页面节点树中时触发，触发时机在组件attached生命周期之后 */
  linked?(target: ComponentRenderProxy<Doraemon>): void
  /** 关系生命周期函数，当关系在页面节点树中发生改变时触发，触发时机在组件moved生命周期之后 */
  linkChanged?(target: ComponentRenderProxy<Doraemon>): void
  /** 关系生命周期函数，当关系脱离页面节点树时触发，触发时机在组件detached生命周期之后 */
  unlinked?(target: ComponentRenderProxy<Doraemon>): void
  /** 如果这一项被设置，则它表示关联的目标节点所应具有的behavior，所有拥有这一behavior的组件节点都会被关联 */
  target?: string
}

export function initComponents(
  vm: Doraemon,
  components: ComponentOptions<Doraemon>['components'],
): {
  [componentName: string]: RelationOption
} {
  return Object.keys(components).reduce((acc, key) => {
    const { module: componentName, type = 'child', observer, throttle = true } = getData(components[key])
    const linkCb = function (this: ComponentRenderProxy<Doraemon>, target: ComponentRenderProxy<Doraemon>) {
      const oName = `_${componentName.replace(/\./g, '').replace(/\//g, '_')}_throttled`
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
      if (throttle !== undefined && throttle !== false) {
        if (!this[oName]) {
          let opts: {
            wait: number
            options: ThrottleOptions
          } = {
            wait: 50,
            options: {
              trailing: true,
              leading: true,
            },
          }
          if (typeof throttle === 'number') {
            opts.wait = throttle
          } else if (isPlainObject(throttle) && throttle !== true) {
            opts = {
              ...opts,
              ...throttle,
            }
          }
          const { wait, options } = opts
          const { run } = this.useThrottleFn(oFn.bind(this), wait, options)
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
      throttle: ret.throttle,
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
      throttle: comp.throttle,
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
        this._throttledFns = []
      },
      detached() {
        if (this._throttledFns.length > 0) {
          ;(this._throttledFns as ThrottleReturn<any>[]).forEach((throttled) => {
            throttled.cancel()
          })
          this._throttledFns = []
        }
      },
    },
  })
}
