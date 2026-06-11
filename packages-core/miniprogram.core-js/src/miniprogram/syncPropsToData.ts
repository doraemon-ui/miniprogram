export function syncPropsToData(props: Record<string, any>, computed: Record<string, any>) {
  const defaultData = Object.keys(props).reduce(
    (acc, name) => ({
      ...acc,
      [name]: (props[name] as any).value,
    }),
    {},
  )
  const sync = (data: Record<string, any>) => {
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
      defFields.data = Object.assign(defFields.data, sync({ ...defaultData, ...defFields.data }))
    },
  })
}
