export function initWatch (vm, watch) {
  return Object.keys(watch).reduce((acc, key) => ({ ...acc, [key]: function defineWatch (newVal) {
    if (!this.$component || !this.$component._isMounted) { return }
    // Always equal to the newVal
    const oldVal = this.data[key]
    const handler = Array.isArray(watch[key]) ? watch[key] : [ watch[key] ]
    handler.forEach(h => {
      this[h.handler](newVal, oldVal)
    })
  } }), {})
}
