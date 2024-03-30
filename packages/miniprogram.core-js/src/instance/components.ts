import { isPlainObject } from '../util/isPlainObject'
import { noop } from '../util/noop'
import { throttle } from '../util/throttle'

export function initComponents(vm, components): {
  [componentName: string] : WechatMiniprogram.Component.RelationOption
} {
  return Object.keys(components).reduce((acc, key) => {
    const {
      module: componentName,
      type = 'child',
      observer = noop,
      throttle = true
    } = getData(components[key])
    const linkCb = function (...args) {
      const oFn = function (...args) {
        if (this.$component._isMounted) {
          if (typeof observer === 'string') {
            return this.$component[observer]?.(...args)
          } else if (typeof observer === 'function') {
            return observer.apply(this.$component, args)
          }
        }
      }
      if (throttle !== undefined && throttle !== false) {
        if (!this[`_${componentName}_linkCb`]) {
          let opts = {
            wait: 50,
            options: {
              trailing: true,
              leading: true,
            },
          }
          if (typeof throttle === 'number') {
            opts.wait = throttle
          } else if (isPlainObject(throttle)) {
            opts = {
              ...opts,
              ...throttle
            }
          }
          const { wait, options } = opts
          const { run } = this.useThrottleFn(oFn.bind(this), wait, options)
          this[`_${componentName}_linkCb`] = run
        }
        this[`_${componentName}_linkCb`].apply(this, args)
      } else {
        return oFn.apply(this, args)
      }
    }
    const option: WechatMiniprogram.Component.RelationOption = {
      type,
      linked: linkCb,
      linkChanged: linkCb,
      unlinked: linkCb,
    }
    return {
      ...acc,
      [componentName]: option,
    }
  }, {})
}

export function getData (comp) {
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
        this.useThrottleFn = function (fn, wait = 50, options) {
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
          this._throttledFns.forEach((throttled) => {
            throttled.cancel()
          })
          this._throttledFns = []
        }
      },
    },
  })
}