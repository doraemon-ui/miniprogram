import { debounce } from '../src/util/debounce'
import { throttle } from '../src/util/throttle'
import { isEqual } from '../src/util/isEqual'
import { styleToCssString } from '../src/util/styleToCssString'

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

describe('debounce', () => {
  test('should throw TypeError for non-function', () => {
    expect(() => {
      ;(debounce as any)(null, 100)
    }).toThrow(TypeError)
  })

  test('should debounce a function (trailing default)', async () => {
    const fn = jest.fn()
    const debounced = debounce(fn, 50)

    debounced()
    debounced()
    debounced()

    expect(fn).not.toHaveBeenCalled()

    await wait(100)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('should invoke on leading edge', async () => {
    const fn = jest.fn()
    const debounced = debounce(fn, 50, { leading: true, trailing: false, maxWait: 0 })

    debounced()
    expect(fn).toHaveBeenCalledTimes(1)

    debounced()
    await wait(100)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('should invoke on leading and trailing edge', async () => {
    const fn = jest.fn()
    const debounced = debounce(fn, 50, { leading: true, trailing: true, maxWait: 0 })

    debounced()
    expect(fn).toHaveBeenCalledTimes(1)

    debounced()
    await wait(100)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  test('should support maxWait option', async () => {
    const fn = jest.fn()
    const debounced = debounce(fn, 200, { leading: false, trailing: true, maxWait: 300 })

    debounced()
    expect(fn).toHaveBeenCalledTimes(0)

    // Wait for timer to fire (200ms debounce)
    await wait(300)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('should support cancel', async () => {
    const fn = jest.fn()
    const debounced = debounce(fn, 50)

    debounced()
    debounced.cancel()

    await wait(100)
    expect(fn).not.toHaveBeenCalled()
  })

  test('should support flush', async () => {
    const fn = jest.fn()
    const debounced = debounce(fn, 50)

    debounced()
    const result = debounced.flush()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('should support pending', async () => {
    const fn = jest.fn()
    const debounced = debounce(fn, 50)

    expect(debounced.pending()).toBe(false)
    debounced()
    expect(debounced.pending()).toBe(true)
    await wait(100)
    expect(debounced.pending()).toBe(false)
  })

  test('should pass arguments to the debounced function', async () => {
    const fn = jest.fn()
    const debounced = debounce(fn, 50)

    debounced('a', 'b')
    await wait(100)
    expect(fn).toHaveBeenCalledWith('a', 'b')
  })

  test('should preserve the return value from the last invocation', async () => {
    const fn = jest.fn((x: number) => x * 2)
    const debounced = debounce(fn, 50)

    debounced(5)
    await wait(100)
    expect(fn).toHaveReturnedWith(10)
  })

  test('should work with leading and trailing disabled', async () => {
    // trailing defaults to true but we can explicitly disable it
    const fn = jest.fn()
    const debounced = debounce(fn, 50, { leading: false, trailing: false, maxWait: 0 })

    debounced()
    await wait(100)
    expect(fn).not.toHaveBeenCalled()
  })
})

describe('throttle', () => {
  test('should throw TypeError for non-function', () => {
    expect(() => {
      ;(throttle as any)('not a function', 100)
    }).toThrow(TypeError)
  })

  test('should throttle a function (default leading)', async () => {
    const fn = jest.fn()
    const throttled = throttle(fn, 50)

    throttled()
    expect(fn).toHaveBeenCalledTimes(1)

    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(1)

    await wait(100)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  test('should support trailing only', async () => {
    const fn = jest.fn()
    const throttled = throttle(fn, 50, { leading: false, trailing: true })

    throttled()
    expect(fn).not.toHaveBeenCalled()

    await wait(100)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('should support leading=false trailing=false', async () => {
    const fn = jest.fn()
    const throttled = throttle(fn, 50, { leading: false, trailing: false })

    throttled()
    expect(fn).not.toHaveBeenCalled()

    await wait(100)
    expect(fn).not.toHaveBeenCalled()
  })
})

describe('isEqual', () => {
  test('should return true for identical primitive values', () => {
    expect(isEqual('hello', 'hello')).toBe(true)
    expect(isEqual(42, 42)).toBe(true)
    expect(isEqual(true, true)).toBe(true)
  })

  test('should return true for same reference', () => {
    const obj = { a: 1 }
    expect(isEqual(obj, obj)).toBe(true)
  })

  test('should return false for different primitives', () => {
    expect(isEqual('hello', 'world')).toBe(false)
    expect(isEqual(1, 2)).toBe(false)
  })

  test('should return false when one value is null or undefined', () => {
    expect(isEqual(null, {})).toBe(false)
    expect(isEqual({}, null)).toBe(false)
    expect(isEqual(undefined, {})).toBe(false)
  })

  test('should return false for objects with different key lengths', () => {
    expect(isEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false)
  })

  test('should return false for objects with different keys', () => {
    expect(isEqual({ a: 1 }, { b: 1 })).toBe(false)
  })

  test('should compare nested objects deeply', () => {
    expect(isEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true)
    expect(isEqual({ a: { b: 1 } }, { a: { b: 2 } })).toBe(false)
  })

  test('should return true for identical objects', () => {
    expect(isEqual({ a: 1, b: 'hello' }, { a: 1, b: 'hello' })).toBe(true)
  })

  test('should return false for objects with different nested values', () => {
    expect(isEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 2 } } })).toBe(false)
  })
})

describe('styleToCssString', () => {
  test('should handle string input', () => {
    const result = styleToCssString('color: red')
    expect(result).toBe('color: red; ')
  })

  test('should handle string input with trailing semicolon', () => {
    const result = styleToCssString('color: red;')
    expect(result).toBe('color: red; ')
  })

  test('should return empty string for null', () => {
    const result = styleToCssString(null as any)
    expect(result).toBe('')
  })

  test('should return empty string for empty object', () => {
    const result = styleToCssString({})
    expect(result).toBe('')
  })

  test('should convert object to CSS string', () => {
    const result = styleToCssString({ color: 'red', fontSize: 14 })
    expect(result).toContain('color: red')
    expect(result).toContain('font-size: 14px')
  })

  test('should handle array values', () => {
    const result = styleToCssString({ margin: [0, 10, 0, 10] })
    expect(result).toContain('margin: 0px')
    expect(result).toContain('margin: 10px')
  })

  test('should handle content property quoting', () => {
    const result = styleToCssString({ content: 'hello' })
    expect(result).toContain("content: 'hello'")
  })

  test('should handle css variables without px suffix', () => {
    const result = styleToCssString({ '--custom-color': 'red', color: 'blue' })
    expect(result).toContain('color: blue')
    expect(result).toContain('--custom-color: red')
    expect(result).not.toContain('--custom-color: 0px')
  })

  test('should support custom exclude pattern', () => {
    const result = styleToCssString({ '--custom-color': 'red', color: 'blue' }, { exclude: /^--/ })
    expect(result).toContain('color: blue')
    expect(result).toContain('--custom-color: red')
    expect(result).not.toContain('--custom-color: 0px')
  })

  test('should handle unitless number values without px', () => {
    const result = styleToCssString({ zIndex: 100, lineHeight: 1.5 })
    expect(result).toContain('z-index: 100')
    expect(result).toContain('line-height: 1.5')
  })
})
