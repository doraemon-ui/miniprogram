/**
 * Check whether an object has the property.
 */
const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn (obj: any, key: string) {
  return hasOwnProperty.call(obj, key)
}
