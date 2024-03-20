export function initExposed(vm) {
  const expose = vm.$options.expose || {}
  if (Array.isArray(expose)) {
    if (expose.length) {
      const exposed = {}
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: (...args) => {
            return typeof this.$component[key] === 'function'
              ? this.$component[key].call(this.$component, ...args)
              : this.$component[key]
          },
        })
      })
      return exposed
    }
  }
  return {}
}