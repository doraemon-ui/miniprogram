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
  if (vm._exposed) {
    return vm._exposed
  }
  return vm
}
