import { bind } from '../util/bind'
import { noop } from '../util/noop'
import type { Doraemon } from './init'
import type { ComponentOptions } from '../types/options'

export function initLifecycle (vm: Doraemon, options: ComponentOptions<Doraemon>) {
  const methods = options.methods
  vm._isMounted = false
  vm._isDestroyed = false
  vm._hasHookEvent = true
  for (const key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm)
  }
}

export function callHook (vm: Doraemon, hook: string) {
  var handlers = [vm.$options[hook]]
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm)
      } catch (e) {
        /** Ignore */
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook)
  }
}
