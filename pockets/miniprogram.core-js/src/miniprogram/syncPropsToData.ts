export function syncPropsToData (computed: object) {
  const sync = (data: object) => {
    return Object.keys(computed).reduce((acc, key) => {
      const userDef = computed[key]
      const getter = typeof userDef === 'function' ? userDef : userDef.get
      if (getter) {
        const value = getter.call(data, data)
        return { ...acc, [key]: value }
      }
      return acc
    }, {})
  }
  return Behavior({
    definitionFilter(defFields) {
      defFields.data = defFields.data || {}
      defFields.data = Object.assign(defFields.data, sync(defFields.data))
    },
  })
}
