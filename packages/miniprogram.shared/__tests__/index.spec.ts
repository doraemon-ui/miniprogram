import {
  canUseMP,
  findComponentNode,
  getCurrentPage,
  miniprogramThis,
  useQuery,
  useSelector,
  useSelectorAll,
  useRef,
  useRefAll,
  useRect,
  useRectAll,
  useScrollOffset,
  useComputedStyle,
  getTouchPoints,
  getPointsNumber,
  isEqualPoints,
  isNearbyPoints,
  getPointsDistance,
  getSwipeDirection,
  useNativeRoute,
  usePopupStateHOC,
  buildURL,
  isDate,
  isDef,
  isFalse,
  isObject,
  isPromise,
  isString,
  isTrue,
  isUndef,
  noop,
  omit,
  pxToNumber,
  sleep,
} from '../src'

const fakeTouchEvent = (pageX: number, pageY: number) => ({
  touches: [{ pageX, pageY }],
  changedTouches: [],
})

const fakeTouchPoint = (pageX: number, pageY: number) => getTouchPoints(fakeTouchEvent(pageX, pageY) as any)

describe('Shared', () => {
  describe('Core', () => {
    test('call dom func', () => {
      expect(canUseMP()).toBe(false)
      expect(findComponentNode('#dora')).toBeNull()
      expect(getCurrentPage()).toBeNull()
      expect(miniprogramThis).toBeFalsy()

      expect(useQuery()).toBeNull()
      expect(useSelector('#dora')).toBeNull()
      expect(useSelectorAll('.dora')).toBeNull()
      expect(useRef('#dora')).toBeDefined()
      expect(useRef(['#dora'])).toBeDefined()
      expect(useRefAll('#dora')).toBeDefined()
      expect(useRefAll(['#dora'])).toBeDefined()
      expect(useRect('#dora')).toBeDefined()
      expect(useRect(['#dora'])).toBeDefined()
      expect(useRectAll('#dora')).toBeDefined()
      expect(useRectAll(['#dora'])).toBeDefined()
      expect(useScrollOffset()).toBeDefined()
      expect(useComputedStyle('#dora')).toBeDefined()

      expect(getTouchPoints(fakeTouchEvent(10, 20) as any)).toEqual({ x: 10, y: 20 })
      expect(getPointsNumber(fakeTouchEvent(10, 20) as any)).toBe(1)
      expect(isEqualPoints(fakeTouchPoint(10, 20) as any, fakeTouchPoint(10, 20) as any)).toBeTruthy()
      expect(isNearbyPoints(fakeTouchPoint(10, 20) as any, fakeTouchPoint(30, 40) as any)).toBeTruthy()
      expect(getPointsDistance(fakeTouchPoint(10, 20) as any, fakeTouchPoint(10, 20) as any)).toBe(0)
      expect(getSwipeDirection(20, 10, 0, 0)).toBe('Left')
      expect(getSwipeDirection(10, 20, 0, 0)).toBe('Right')
      expect(getSwipeDirection(0, 0, 20, 10)).toBe('Up')
      expect(getSwipeDirection(0, 0, 10, 20)).toBe('Down')

      expect(useNativeRoute({ url: '/' }, { is: 'test' })).toBeDefined()
      expect(usePopupStateHOC()({} as any)).toBeDefined()
    })
  })
  describe('Utils', () => {
    test('call buildURL', () => {
      expect(buildURL('/')).toBe('/')
      expect(buildURL('/', { name: 123 })).toBe('/?name=123')
      expect(buildURL('/?age=45', { name: 123 })).toBe('/?age=45&name=123')
    })
    test('call isDate', () => {
      expect(isDate(undefined)).toBe(false)
      expect(isDate(null)).toBe(false)
      expect(isDate(new Date())).toBe(true)
    })
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
    test('call pxToNumber', () => {
      expect(pxToNumber(undefined)).toBe(0)
      expect(pxToNumber(1)).toBe(1)
      expect(pxToNumber('1')).toBe(1)
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
