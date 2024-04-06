import type { Doraemon } from './init'
import type { ComponentPublicInstance } from '../types/componentPublicInstance'

export function initExposed(vm: Doraemon) {
  const expose = vm.$options.expose || {}
  if (Array.isArray(expose)) {
    if (expose.length) {
      const exposed = vm._exposed || (vm._exposed = {})
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => vm[key],
          set: (val) => (vm[key] = val)
        })
      })
      return exposed
    } else if (!vm._exposed) {
      vm._exposed = {}
    }
  }
}

export type PublicPropertiesMap = Record<
  string,
  (i: Doraemon) => any
>

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

export function getExposeProxy(vm: Doraemon) {
  if (vm._exposed) {
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
  }
}

export function getPublicInstance(
  vm: Doraemon
): ComponentPublicInstance | Doraemon['_exposed'] | Doraemon | null {
  if (!vm) return null
  return getExposeProxy(vm) || vm
}
