export function initExposed(vm) {
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

export function getPublicInstance(vm) {
  if (!vm) return null
  return getExposeProxy(vm) || vm
}

export type PublicPropertiesMap = Record<
  string,
  (i) => any
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

export function getExposeProxy(vm) {
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
