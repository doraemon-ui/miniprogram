import type { Doraemon, ComponentPublicInstance, ComponentInternalInstance } from './init'

const hasProxy = typeof Proxy !== 'undefined'

export function initExposed(vm: Doraemon) {
  const expose = vm.$options.expose || {}
  if (Array.isArray(expose)) {
    if (expose.length) {
      const exposed = vm._exposed || (vm._exposed = {})
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          enumerable: !hasProxy,
          get: () => vm[key],
          set: (val) => (vm[key] = val),
        })
      })
      return exposed
    } else if (!vm._exposed) {
      vm._exposed = {}
    }
  }
}

export type PublicPropertiesMap = Record<string, (i: ComponentInternalInstance) => any>

export const publicPropertiesMap: PublicPropertiesMap = {
  $data: (vm) => vm.$data,
  $props: (vm) => vm.$props,
  $refs: (vm) => vm.$refs,
  $parent: (vm) => vm.$parent,
  $root: (vm) => vm.$root,
  $children: (vm) => vm.$children,
  $options: (vm) => vm.$options,
  $emit: (vm) => vm.$emit,
  $nextTick: (vm) => vm.$nextTick,
}

export function getExposeProxy(vm: ComponentInternalInstance) {
  if (vm._exposed) {
    if (hasProxy) {
      return (
        vm._exposeProxy ||
        (vm._exposeProxy = new Proxy(vm._exposed, {
          get(target, key: string) {
            if (key in target) {
              return target[key]
            } else if (key in publicPropertiesMap) {
              return publicPropertiesMap[key](vm)
            }
          },
          has(target, key: string) {
            return key in target || key in publicPropertiesMap
          },
        }))
      )
    } else {
      vm._exposeProxy = Object.create(null)
      for (const key in vm._exposed) {
        Object.defineProperty(vm._exposeProxy, key, {
          get() {
            return vm._exposed[key]
          },
        })
      }
      for (const key in publicPropertiesMap) {
        Object.defineProperty(vm._exposeProxy, key, {
          get() {
            return publicPropertiesMap[key](vm)
          },
        })
      }
      return vm._exposeProxy
    }
  }
}

export function getPublicInstance(
  vm: ComponentInternalInstance,
): ComponentPublicInstance | ComponentInternalInstance['_exposed'] | ComponentInternalInstance | null {
  if (!vm) return null
  return getExposeProxy(vm) || vm
}
