import {
  canUseMP,
  getCurrentDOM,
  querySelector,
  querySelectorAll,
  getBoundingClientRect,
  findComponentNode,
  isDef,
  isFalse,
  isObject,
  isPromise,
  isString,
  isTrue,
  isUndef,
  noop,
  omit,
  sleep,
} from '../src'

describe('Shared', () => {
  describe('Core', () => {
    test('call dom func', () => {
      expect(canUseMP()).toBe(false)
      expect(getCurrentDOM()).toBeNull()
      expect(querySelector('#dora')).toBeNull()
      expect(querySelectorAll('.dora')).toBeNull()
      expect(getBoundingClientRect(querySelector('#dora'))).toBeDefined()
      expect(findComponentNode('#dora')).toBeNull()
    })
  })
  describe('Utils', () => {
    test('call isDef', () => {
      expect(isDef(undefined)).toBe(false)
      expect(isDef(null)).toBe(false)
      expect(isDef('')).toBe(true)
    })
    test('call isFalse', () => {
      expect(isFalse(true)).toBe(false)
      expect(isFalse(false)).toBe(true)
      expect(isFalse('')).toBe(false)
    })
    test('call isObject', () => {
      expect(isObject(null)).toBe(false)
      expect(isObject({})).toBe(true)
      expect(isObject([])).toBe(true)
    })
    test('call isPromise', () => {
      expect(isPromise(undefined)).toBe(false)
      expect(isPromise('')).toBe(false)
      expect(isPromise(Promise.resolve())).toBe(true)
    })
    test('call isString', () => {
      expect(isString(undefined)).toBe(false)
      expect(isString(null)).toBe(false)
      expect(isString('')).toBe(true)
    })
    test('call isTrue', () => {
      expect(isTrue(true)).toBe(true)
      expect(isTrue(false)).toBe(false)
      expect(isTrue('')).toBe(false)
    })
    test('call isUndef', () => {
      expect(isUndef(undefined)).toBe(true)
      expect(isUndef(null)).toBe(true)
      expect(isUndef('')).toBe(false)
    })
    test('call noop', () => {
      const mockFn = jest.fn(noop)
      const result = mockFn(1, 2, 3)
      expect(result).toBeUndefined()
      expect(mockFn).toBeCalled()
      expect(mockFn).toBeCalledTimes(1)
      expect(mockFn).toHaveBeenCalledWith(1, 2, 3)
    })
    test('call omit', () => {
      const obj = { a: 1, b: 2, c: 3 }
      expect(omit(obj, [])).toEqual({ a: 1, b: 2, c: 3 })
      expect(omit(obj, ['c'])).toEqual({ a: 1, b: 2 })
      expect(omit(obj, ['b', 'c'])).toEqual({ a: 1 })
    })
    test('call sleep', async () => {
      jest.setTimeout(3000)
      const mockFn = jest.fn(sleep)
      const result = await mockFn(3000)
      expect(result).toBeUndefined()
      expect(mockFn).toBeCalled()
      expect(mockFn).toBeCalledTimes(1)
      expect(mockFn).toHaveBeenCalledWith(3000)
    })
  })
})
