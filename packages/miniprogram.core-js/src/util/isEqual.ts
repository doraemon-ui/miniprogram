export function isEqual(x: any, y: any): boolean {
  if (x === y) {
    return true
  }
  if (!(typeof x == 'object' && x != null) || !(typeof y == 'object' && y != null)) {
    return false
  }
  if (Object.keys(x).length != Object.keys(y).length) {
    return false
  }
  for (var prop in x) {
    if (y.hasOwnProperty(prop)) {
      if (!isEqual(x[prop], y[prop])) {
        return false
      }
    } else {
      return false
    }
  }
  return true
}
