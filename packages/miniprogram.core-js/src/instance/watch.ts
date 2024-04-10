import type { Doraemon, ComponentRenderProxy } from './init'
import type { ComponentOptions, WatchHandler, WatchOptionsWithHandler } from '../types/options'
import { isPlainObject } from '../util/isPlainObject'

export function initWatch (vm: Doraemon, watch: ComponentOptions<Doraemon>['watch']) {
  return Object.keys(watch).reduce<Record<string, (newVal: any) => void>>((acc, key) => ({
    ...acc,
    [key]: createWatcher(vm, key, watch[key]),
  }), {})
}

function createWatcher(
  vm: Doraemon,
  key: string,
  handler: WatchOptionsWithHandler<any> | WatchHandler<any>
) {
  return function defineWatch (newVal: any) {
    const renderProxy: ComponentRenderProxy<Doraemon> = this
    if (!renderProxy.$component || !renderProxy.$component._isMounted) { return }
    // Always equal to the newVal
    const oldVal = renderProxy.data[key]
    const handlers: Array<WatchOptionsWithHandler<any> | WatchHandler<any>> =
      Array.isArray(handler) ? handler : [ handler ]
    if (Array.isArray(handlers)) {
      handlers.forEach(h => {
        if (typeof h === 'string') {
          renderProxy.$component[h]?.(newVal, oldVal)
        } else if (typeof h === 'function') {
          h.call(renderProxy.$component, newVal, oldVal)
        } else if (isPlainObject(h)) {
          if (typeof h.handler === 'string') {
            renderProxy.$component[h.handler]?.(newVal, oldVal)
          } else {
            h.handler.call(renderProxy.$component, newVal, oldVal)
          }
        }
      })
    }
  }
}
