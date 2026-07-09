import type { ComponentOptions, RelationComponent, RelationType } from '../types/options'
import type { DebounceOptions, DebounceReturn } from '../util/debounce'
import { debounce } from '../util/debounce'
import { isDef } from '../util/isDef'
import { isPlainObject } from '../util/isPlainObject'
import { noop } from '../util/noop'
import type { ThrottleOptions, ThrottleReturn } from '../util/throttle'
import { throttle } from '../util/throttle'
import type { ComponentRenderProxy, Doraemon } from './init'
import { findLogicalAncestors } from './logicalTree'

interface RelationOption {
  /**
   * 目标组件的相对关系
   */
  type: RelationType
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

type DebouncedRunner = (...args: any[]) => any

const relationDebouncedMap = new WeakMap<ComponentRenderProxy<Doraemon>, Map<string, DebouncedRunner>>()
const throttledFnsMap = new WeakMap<ComponentRenderProxy<Doraemon>, ThrottleReturn<any>[]>()
const debouncedFnsMap = new WeakMap<ComponentRenderProxy<Doraemon>, DebounceReturn<any>[]>()

function getRelationDebouncedMap(node: ComponentRenderProxy<Doraemon>) {
  if (!relationDebouncedMap.has(node)) {
    relationDebouncedMap.set(node, new Map())
  }
  return relationDebouncedMap.get(node) as Map<string, DebouncedRunner>
}

function getDebouncedFns(node: ComponentRenderProxy<Doraemon>) {
  if (!debouncedFnsMap.has(node)) {
    debouncedFnsMap.set(node, [])
  }
  return debouncedFnsMap.get(node) as DebounceReturn<any>[]
}

function getThrottledFns(node: ComponentRenderProxy<Doraemon>) {
  if (!throttledFnsMap.has(node)) {
    throttledFnsMap.set(node, [])
  }
  return throttledFnsMap.get(node) as ThrottleReturn<any>[]
}

export function useDebounceFn(node: ComponentRenderProxy<Doraemon>, fn: Function, wait = 50, options: Partial<DebounceOptions>) {
  const debounced = debounce(fn.bind(node), wait, options as DebounceOptions)
  getDebouncedFns(node).push(debounced)
  return {
    run: debounced,
    cancel: debounced.cancel,
    flush: debounced.flush,
  }
}

export function useThrottleFn(node: ComponentRenderProxy<Doraemon>, fn: Function, wait = 50, options: ThrottleOptions) {
  const throttled = throttle(fn.bind(node), wait, options)
  getThrottledFns(node).push(throttled)
  return {
    run: throttled,
    cancel: throttled.cancel,
    flush: throttled.flush,
  }
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
      const debouncedMap = getRelationDebouncedMap(this)
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
        if (!debouncedMap.has(oName)) {
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
          const { run } = useDebounceFn(this, oFn, wait, options)
          debouncedMap.set(oName, run)
        }
        debouncedMap.get(oName)?.call(this, target)
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

export function useRelation(relations: { [componentName: string]: RelationOption } = {}) {
  return Behavior({
    lifetimes: {
      created() {
        const node = this as ComponentRenderProxy<Doraemon>
        throttledFnsMap.set(node, [])
        debouncedFnsMap.set(node, [])
        relationDebouncedMap.set(node, new Map())
      },
      ready() {
        Object.keys(relations).forEach((relationKey) => {
          const relation = relations[relationKey]
          if (!relation?.linked) return

          const nodes = findLogicalAncestors(this.$component, relationKey, relation.type)
          if (Array.isArray(nodes)) {
            nodes.forEach((target) => {
              if (target) {
                relation.linked?.call(this, target)
              }
            })
          }
        })
      },
      detached() {
        const node = this as ComponentRenderProxy<Doraemon>
        const throttledFns = getThrottledFns(node)
        if (throttledFns.length > 0) {
          throttledFns.forEach((throttled) => {
            throttled.cancel()
          })
          throttledFnsMap.set(node, [])
        }
        const debouncedFns = getDebouncedFns(node)
        if (debouncedFns.length > 0) {
          debouncedFns.forEach((debounced) => {
            debounced.cancel()
          })
          debouncedFnsMap.set(node, [])
        }
        throttledFnsMap.delete(node)
        debouncedFnsMap.delete(node)
        relationDebouncedMap.delete(node)
      },
    },
  })
}
