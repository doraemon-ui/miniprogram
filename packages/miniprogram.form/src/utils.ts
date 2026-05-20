const hasOwnProperty = Object.prototype.hasOwnProperty
const INFINITY = 1 / 0
const MAX_SAFE_INTEGER = 9007199254740991
const reIsUint = /^(?:0|[1-9]\d*)$/
const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/
const reIsPlainProp = /^\w*$/
const charCodeOfDot = '.'.charCodeAt(0)
const reEscapeChar = /\\(\\)?/g
const rePropName = RegExp(
  '[^.[\\]]+|\\[(?:([^"\'][^[]*)|(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2)\\]|(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))',
  'g',
)

function isObject(value: unknown) {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}

export function eq(value: unknown, other: unknown) {
  return value === other || (value !== value && other !== other)
}

function baseAssignValue(object: Record<string, unknown>, key: string, value: unknown) {
  if (key === '__proto__') {
    Object.defineProperty(object, key, {
      configurable: true,
      enumerable: true,
      value,
      writable: true,
    })
  } else {
    object[key] = value
  }
}

function assignValue(object: Record<string, unknown>, key: string, value: unknown) {
  const objValue = object[key]
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value))) {
    if (value !== 0 || 1 / (value as number) === 1 / (objValue as number)) {
      baseAssignValue(object, key, value)
    }
  } else if (value === undefined && !(key in object)) {
    baseAssignValue(object, key, value)
  }
}

function toKey(value: unknown) {
  if (typeof value === 'string') return value
  const result = `${value}`
  return result === '0' && 1 / (value as number) === -INFINITY ? '-0' : result
}

function isKey(value: unknown, object?: unknown) {
  if (Array.isArray(value)) return false
  const type = typeof value
  if (type === 'number' || type === 'boolean' || value == null) return true
  return (
    reIsPlainProp.test(value as string) || !reIsDeepProp.test(value as string) || (object != null && (value as string) in Object(object))
  )
}

function stringToPath(string: string) {
  const result: string[] = []
  if (string.charCodeAt(0) === charCodeOfDot) result.push('')
  string.replace(rePropName, (match, expression, quote, subString) => {
    let key = match
    if (quote) key = subString.replace(reEscapeChar, '$1')
    else if (expression) key = expression.trim()
    result.push(key)
    return match
  })
  return result
}

function castPath(value: unknown, object?: unknown) {
  if (Array.isArray(value)) return value
  return isKey(value, object) ? [value] : stringToPath(value as string)
}

function isIndex(value: unknown, length?: number) {
  const type = typeof value
  const maxLength = length == null ? MAX_SAFE_INTEGER : length
  return (
    !!maxLength &&
    (type === 'number' || (type !== 'symbol' && reIsUint.test(value as string))) &&
    (value as number) > -1 &&
    (value as number) % 1 === 0 &&
    (value as number) < maxLength
  )
}

function baseSet(object: Record<string, unknown>, path: unknown, value: unknown) {
  if (!isObject(object)) return object
  const nextPath = castPath(path, object)
  const length = nextPath.length
  const lastIndex = length - 1
  let index = -1
  let nested: Record<string, unknown> | unknown[] | undefined = object

  while (nested != null && ++index < length) {
    const key = toKey(nextPath[index])
    let newValue = value
    if (index !== lastIndex) {
      const objValue = (nested as Record<string, unknown>)[key]
      newValue = isObject(objValue) ? objValue : isIndex(nextPath[index + 1]) ? [] : {}
    }
    assignValue(nested as Record<string, unknown>, key, newValue)
    nested = (nested as Record<string, unknown>)[key] as Record<string, unknown>
  }
  return object
}

export function set(object: Record<string, unknown> | null | undefined, path: unknown, value: unknown) {
  return object == null ? object : baseSet(object as Record<string, unknown>, path, value)
}

function baseGet(object: unknown, path: unknown) {
  const nextPath = castPath(path, object)
  let index = 0
  const length = nextPath.length
  let current = object as Record<string, unknown> | undefined
  while (current != null && index < length) {
    current = current[toKey(nextPath[index++])] as Record<string, unknown>
  }
  return index && index === length ? current : undefined
}

export function get(object: unknown, path: unknown, defaultValue?: unknown) {
  const result = object == null ? undefined : baseGet(object, path)
  return result === undefined ? defaultValue : result
}
