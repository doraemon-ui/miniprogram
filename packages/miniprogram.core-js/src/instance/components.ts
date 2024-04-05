import type { ComponentRenderProxy, Doraemon } from './init'
import type { ComponentOptions, RelationComponent } from '../types/options'
import { type ThrottleOptions, type ThrottleReturn, throttle } from '../util/throttle'
import { isPlainObject } from '../util/isPlainObject'
import { noop } from '../util/noop'

export function initComponents(vm: Doraemon, components: ComponentOptions<Doraemon>['components']): {
  [componentName: string] : WechatMiniprogram.Component.RelationOption
} {
  return Object.keys(components).reduce((acc, key) => {
    const {
      module: componentName,
      type = 'child',
      observer,
      throttle = true
    } = getData(components[key])
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
            wait: number,
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
              ...throttle
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
      linked: typeof observer === 'undefined' ? noop : linkCb,
      linkChanged: typeof observer === 'undefined' ? noop : linkCb,
      unlinked: typeof observer === 'undefined' ? noop : linkCb,
    }
    return {
      ...acc,
      [componentName]: option,
    }
  }, {})
}

export function getData (
  comp: string | Partial<RelationComponent<Doraemon>> | (() => (Partial<RelationComponent<Doraemon>>))
): RelationComponent<Doraemon> {
  if (typeof comp === 'function') {
    const ret = comp()
    return {
      ['module']: ret.module,
      type: ret.type,
      observer: ret.observer,
      throttle: ret.throttle
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
      throttle: comp.throttle
    }
  }
  return {}
}

export function useThrottle () {
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
          (this._throttledFns as ThrottleReturn<any>[]).forEach((throttled) => {
            throttled.cancel()
          })
          this._throttledFns = []
        }
      },
    },
  })
}
