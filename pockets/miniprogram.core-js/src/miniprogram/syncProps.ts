export function syncProps (cb) {
  return Behavior({
    definitionFilter(defFields) {
      defFields.data = defFields.data || {}
      defFields.data = Object.assign(defFields.data, cb(defFields.data))
    },
  })
}
