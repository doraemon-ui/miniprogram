/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
export function isPlainObject(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
