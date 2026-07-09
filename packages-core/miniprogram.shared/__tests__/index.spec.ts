import type { ComponentOptions, TouchEvent } from '@doraemon-ui/miniprogram.core-js'
import { Doraemon } from '@doraemon-ui/miniprogram.core-js'

import type { TouchPoint } from '../src'
import {
  buildURL,
  canUseMP,
  customPromise,
  fillObjectBySchema,
  findComponentNode,
  getCurrentPage,
  getDefaultContext,
  getFontSize,
  getPointsDistance,
  getPointsNumber,
  getSwipeDirection,
  getTouchPoints,
  isDate,
  isDef,
  isEqualPoints,
  isFalse,
  isFunction,
  isNearbyPoints,
  isObject,
  isPromise,
  isString,
  isTrue,
  isUndef,
  mergeClassNames,
  mergeStyles,
  miniprogramThis,
  noop,
  omit,
  pxToNumber,
  resolveStyleOrClass,
  sleep,
  useColorCls,
  useComputedStyle,
  useControlledState,
  useCSSVarCls,
  useExternalCls,
  useHoverCls,
  useMergeSemantic,
  useMergeSemanticClassNames,
  useMergeSemanticStyles,
  useMergeSemanticStylesString,
  useNativeRoute,
  usePopupStateHOC,
  useQuery,
  useRect,
  useRectAll,
  useRef,
  useRefAll,
  useScrollOffset,
  useSelector,
  useSelectorAll,
} from '../src'
import type * as DomModule from '../src/core/dom'
import type * as useNativeRouteModule from '../src/core/dom/useNativeRoute'

const fakeTouchEvent = (pageX: number, pageY: number) =>
  ({
    touches: [{ pageX, pageY }],
    changedTouches: [],
  }) as unknown as TouchEvent

const fakeTouchPoint = (pageX: number, pageY: number): TouchPoint => getTouchPoints(fakeTouchEvent(pageX, pageY))
const globalScope = globalThis as typeof globalThis & {
  wx?: Record<string, any>
  getCurrentPages?: () => any[]
}

describe('Shared', () => {
  describe('Decorators', () => {
    test('call ControlledState', () => {
      const { ControlledState, setControlledState } = useControlledState('visible')

      class Demo extends Doraemon {
        controlled = false
        visible = true
        defaultVisible = false

        @ControlledState()
        mergedVisible: boolean = true
      }

      const decorators = (Reflect.get(Demo, '__decorators__') || []) as Array<(options: ComponentOptions<Doraemon>) => void>
      const options: ComponentOptions<Doraemon> = {}

      decorators.forEach((fn) => fn(options))

      const instance = new Demo()
      Object.assign(instance, options.methods || {})
      const initialData = options.mixins?.reduce<Record<string, unknown>>((acc, mixin) => {
        if (typeof mixin === 'object' && mixin !== null && 'data' in mixin && typeof mixin.data === 'function') {
          return { ...acc, ...mixin.data.call(instance) }
        }
        return acc
      }, {})
      Object.assign(instance, initialData)
      expect(instance.mergedVisible).toBe(false)

      instance.controlled = true
      const firstHandler = options.watch?.visible?.[0]?.handler
      if (typeof firstHandler === 'string') {
        const handler = Reflect.get(instance, firstHandler)
        if (typeof handler === 'function') {
          handler.call(instance, true)
        }
      }
      expect(instance.mergedVisible).toBe(true)

      instance.controlled = false
      instance.mergedVisible = true
      instance.visible = false
      if (typeof firstHandler === 'string') {
        const handler = Reflect.get(instance, firstHandler)
        if (typeof handler === 'function') {
          handler.call(instance, false)
        }
      }
      expect(instance.mergedVisible).toBe(true)

      instance.controlled = true
      setControlledState(instance, false, false)
      expect(instance.mergedVisible).toBe(true)

      instance.visible = false
      if (typeof firstHandler === 'string') {
        const handler = Reflect.get(instance, firstHandler)
        if (typeof handler === 'function') {
          handler.call(instance, false)
        }
      }
      expect(instance.mergedVisible).toBe(false)

      instance.controlled = false
      expect(instance.mergedVisible).toBe(false)
    })
    test('call ControlledState with shorthand and options', () => {
      const setupInstance = (Demo: new () => Doraemon & { mergedVisible: boolean }) => {
        const decorators = (Reflect.get(Demo, '__decorators__') || []) as Array<(options: ComponentOptions<Doraemon>) => void>
        const options: ComponentOptions<Doraemon> = {}

        decorators.forEach((fn) => fn(options))

        const instance = new Demo()
        Object.assign(instance, options.methods || {})
        const initialData = options.mixins?.reduce<Record<string, unknown>>((acc, mixin) => {
          if (typeof mixin === 'object' && mixin !== null && 'data' in mixin && typeof mixin.data === 'function') {
            return { ...acc, ...mixin.data.call(instance) }
          }
          return acc
        }, {})
        Object.assign(instance, initialData)

        return instance
      }

      const useVisibleState = useControlledState('visible')

      class DemoWithString extends Doraemon {
        controlled = false
        visible = true
        defaultVisible = false

        @useVisibleState.ControlledState('visible')
        mergedVisible: boolean = true
      }

      class DemoWithOptions extends Doraemon {
        controlled = false
        visible = true
        defaultVisible = false

        @useVisibleState.ControlledState({
          value: 'visible',
          defaultValue: 'defaultVisible',
          controlled: 'controlled',
        })
        mergedVisible: boolean = true
      }

      expect(setupInstance(DemoWithString).mergedVisible).toBe(false)
      expect(setupInstance(DemoWithOptions).mergedVisible).toBe(false)
    })
  })
  describe('Dom', () => {
    test('call dom func', async () => {
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

      expect(getTouchPoints(fakeTouchEvent(10, 20))).toEqual({ x: 10, y: 20 })
      expect(
        getTouchPoints({
          touches: [],
          changedTouches: [{ pageX: 30, pageY: 40 }],
        } as unknown as TouchEvent),
      ).toEqual({ x: 30, y: 40 })
      expect(getPointsNumber(fakeTouchEvent(10, 20))).toBe(1)
      expect(
        getPointsNumber({
          touches: [],
          changedTouches: [{ pageX: 30, pageY: 40 }],
        } as unknown as TouchEvent),
      ).toBe(1)
      expect(isEqualPoints(fakeTouchPoint(10, 20), fakeTouchPoint(10, 20))).toBeTruthy()
      expect(isNearbyPoints(fakeTouchPoint(10, 20), fakeTouchPoint(30, 40))).toBeTruthy()
      expect(isNearbyPoints(fakeTouchPoint(10, 20), fakeTouchPoint(40, 50))).toBeFalsy()
      expect(getPointsDistance(fakeTouchPoint(10, 20), fakeTouchPoint(10, 20))).toBe(0)
      expect(getPointsDistance({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5)
      expect(getSwipeDirection(20, 10, 0, 0)).toBe('Left')
      expect(getSwipeDirection(10, 20, 0, 0)).toBe('Right')
      expect(getSwipeDirection(0, 0, 20, 10)).toBe('Up')
      expect(getSwipeDirection(0, 0, 10, 20)).toBe('Down')

      expect(useNativeRoute({ url: '/' }, { is: 'test' })).toBeDefined()
      await expect(useNativeRoute({}, { is: 'test' })).rejects.toEqual(expect.stringContaining('Expected an Non-empty String'))
      await expect(useNativeRoute({ url: '/', openType: 'push' as never }, { is: 'test' })).rejects.toEqual(
        expect.stringContaining('expected'),
      )
      expect(
        usePopupStateHOC()({
          $nextTick: (callback?: () => void) => callback?.(),
        } as Parameters<ReturnType<typeof usePopupStateHOC>>[0]),
      ).toBeDefined()
    })
    test('call dom helpers in miniprogram env', () => {
      const selectComponent = jest.fn(() => ({ id: 'component' }))
      const query = {
        select: jest.fn((selector: string) => selector),
        selectAll: jest.fn((selector: string) => [selector]),
      }
      const navigateTo = jest.fn(({ success }) => success?.('navigateTo'))
      const navigateBack = jest.fn(({ success }) => success?.('navigateBack'))
      const createSelectorQuery = jest.fn(() => ({
        in: jest.fn(() => query),
        ...query,
      }))
      const page = { selectComponent }
      const previousWx = globalScope.wx
      const previousGetCurrentPages = globalScope.getCurrentPages

      try {
        globalScope.wx = {
          env: {},
          createSelectorQuery,
          navigateTo,
          navigateBack,
        }
        globalScope.getCurrentPages = jest.fn(() => [page])
        jest.resetModules()

        let isolatedDom!: typeof DomModule
        jest.isolateModules(() => {
          isolatedDom = require('../src/core/dom')
        })

        expect(isolatedDom.canUseMP()).toBe(true)
        expect(isolatedDom.getCurrentPage()).toBe(page)
        expect(isolatedDom.findComponentNode('#dora')).toEqual({ id: 'component' })
        expect(isolatedDom.useQuery()).toMatchObject(query)
        expect(isolatedDom.useSelector('#dora')).toBe('#dora')
        expect(isolatedDom.useSelectorAll('.dora')).toEqual(['.dora'])

        let isolatedRoute!: typeof useNativeRouteModule
        jest.isolateModules(() => {
          isolatedRoute = require('../src/core/dom/useNativeRoute')
        })

        return Promise.all([
          expect(isolatedRoute.useNativeRoute({ url: '/detail', urlParams: { id: 1 } }, { is: 'test' })).resolves.toBe('navigateTo'),
          expect(isolatedRoute.useNativeRoute({ url: '/detail', openType: 'navigateBack', delta: 2 }, { is: 'test' })).resolves.toBe(
            'navigateBack',
          ),
        ])
      } finally {
        globalScope.wx = previousWx
        globalScope.getCurrentPages = previousGetCurrentPages
        jest.resetModules()
      }
    })
    test('call popup state hoc', async () => {
      const callback = jest.fn()
      class Popup extends Doraemon {
        visible = false
        title = ''
        onClick() {}
      }
      type PopupProps = {
        visible?: boolean
        title?: string
        onClick?: () => void
      }

      const container = new Popup()
      const popup = usePopupStateHOC<Popup, PopupProps>()(container)
      const originOnClick = container.onClick

      popup.render({ title: 'open', onClick: jest.fn() }, callback)
      expect(container.visible).toBe(true)
      expect(container.title).toBe('open')
      expect(Object.prototype.hasOwnProperty.call(container, 'onClick')).toBe(false)
      expect(container.onClick).toBe(originOnClick)
      await sleep(0)
      expect(callback).toHaveBeenCalledTimes(1)

      popup.update({ visible: false, title: 'update' }, callback)
      expect(container.visible).toBe(true)
      expect(container.title).toBe('update')
      await sleep(0)

      popup.destroy(callback)
      expect(container.visible).toBe(false)
      await sleep(0)
      expect(callback).toHaveBeenCalledTimes(3)
    })
  })
  describe('Hooks', () => {
    test('call useColorCls and useCSSVarCls', () => {
      expect(useColorCls('positive')).toEqual({
        'dora-color': true,
        'dora-color--positive': true,
      })
      expect(useColorCls('#1677ff')).toBeNull()
      expect(useColorCls()).toBeNull()

      expect(useCSSVarCls('dora-button')).toBe('dora-button--css-var')
    })

    test('call useExternalCls', () => {
      expect(useExternalCls(['root'])).toEqual(['dora-root-class'])
      expect(useExternalCls(['root', 'hover', 'icon'])).toEqual(['dora-root-class', 'dora-hover-class', 'dora-icon-class'])
      expect(useExternalCls([])).toEqual([])
    })

    test('call useHoverCls', () => {
      expect(useHoverCls('dora-button', '')).toBe('dora-button--hover')
      expect(useHoverCls('dora-button', 'custom-hover')).toBe('custom-hover')
      expect(useHoverCls('dora-button', '', 'active')).toBe('dora-button--active')
      expect(useHoverCls('dora-button', 'default')).toBe('dora-button--hover')
    })

    test('call semantic merge helpers', () => {
      const schema = {
        header: {
          _default: 'root',
          icon: {},
        },
        body: {
          _default: 'root',
        },
      }

      expect(
        mergeClassNames(schema, { header: 'base', footer: 'outer' }, { header: { icon: 'icon' } }, { header: 'extra', body: 'body' }),
      ).toEqual({
        header: {
          root: 'base extra',
        },
        footer: 'outer',
        body: {
          root: 'body',
        },
      })

      expect(
        mergeStyles(
          {
            header: {
              root: { color: 'red' },
              icon: { fontSize: 12 },
            },
          },
          {
            header: {
              icon: { lineHeight: 20 },
            },
            body: { color: 'blue' },
          },
        ),
      ).toEqual({
        header: {
          root: { color: 'red' },
          icon: { lineHeight: 20 },
        },
        body: { color: 'blue' },
      })

      expect(mergeStyles({ root: { color: 'red' } }, { root: 'font-size: 12px;' })).toEqual({
        root: 'color: red;  font-size: 12px; ',
      })

      expect(fillObjectBySchema({ footer: { color: 'red' } }, schema)).toEqual({
        footer: { color: 'red' },
        header: {},
        body: {},
      })

      expect(
        resolveStyleOrClass(({ props }: { props: { active: boolean } }) => (props.active ? 'active' : 'inactive'), {
          props: { active: true },
        }),
      ).toBe('active')
      expect(resolveStyleOrClass('static', { props: { active: false } })).toBe('static')
    })

    test('call useMergeSemanticClassNames and useMergeSemanticStyles', () => {
      const schema = {
        header: {
          _default: 'root',
          icon: {},
        },
      }

      expect(
        useMergeSemanticClassNames([{ header: 'base' }, { header: { icon: 'active' } }, { footer: 'outer' }], { props: {} }, schema),
      ).toEqual({
        header: {
          root: 'base',
        },
        footer: 'outer',
      })

      expect(useMergeSemanticStyles([{ root: { color: 'red' } }, undefined, { root: { fontSize: 12 } }], { props: {} })).toEqual({
        root: { color: 'red', fontSize: 12 },
      })
    })

    test('call useMergeSemantic', () => {
      const schema = {
        header: {
          _default: 'root',
          icon: {},
        },
      }

      expect(
        useMergeSemantic([{ root: 'a' }, { root: 'b' }], [{ root: { color: 'red' } }, { root: { fontSize: 12 } }], { props: {} }),
      ).toEqual([{ root: 'a b' }, { root: { color: 'red', fontSize: 12 } }])

      expect(
        useMergeSemantic(
          [{ header: 'base' }, ({ props }: { props: { active: boolean } }) => (props.active ? { header: { icon: 'active' } } : undefined)],
          [
            { header: { root: { color: 'red' } } },
            ({ props }: { props: { active: boolean } }) => (props.active ? { header: { icon: { fontSize: 12 } } } : undefined),
          ],
          { props: { active: true } },
          schema,
        ),
      ).toEqual([
        {
          header: {
            root: 'base',
          },
        },
        {
          header: {
            root: { color: 'red' },
            icon: { fontSize: 12 },
          },
        },
      ])
    })

    test('call useMergeSemanticClassNames and useMergeSemanticStyles', () => {
      const schema = {
        header: {
          _default: 'root',
          icon: {},
        },
      }

      expect(
        useMergeSemanticClassNames(
          [{ header: 'base' }, ({ props }: { props: { active: boolean } }) => (props.active ? { header: { icon: 'active' } } : undefined)],
          { props: { active: true } },
          schema,
        ),
      ).toEqual({
        header: {
          root: 'base',
        },
      })

      expect(
        useMergeSemanticStyles(
          [
            { header: { root: { color: 'red' } } },
            ({ props }: { props: { active: boolean } }) => (props.active ? { header: { icon: { fontSize: 12 } } } : undefined),
          ],
          { props: { active: true } },
        ),
      ).toEqual({
        header: {
          root: { color: 'red' },
          icon: { fontSize: 12 },
        },
      })
    })

    test('call useMergeSemanticStylesString', () => {
      expect(useMergeSemanticStylesString([{ root: { color: 'red' } }, { root: { fontSize: 12 } }], { props: {} })).toEqual({
        root: 'color: red;  font-size: 12px;  ',
      })

      expect(useMergeSemanticStylesString([{ root: { color: 'red' } }, { root: 'font-size: 12px;' }], { props: {} })).toEqual({
        root: 'color: red;  font-size: 12px; ',
      })

      expect(
        useMergeSemanticStylesString(
          [
            {
              header: {
                root: { color: 'red' },
                icon: { fontSize: 12 },
              },
            },
          ],
          { props: {} },
        ),
      ).toEqual({
        header: {
          root: 'color: red;  ',
          icon: 'font-size: 12px;  ',
        },
      })
    })
  })
  describe('Util', () => {
    test('call buildURL', () => {
      expect(buildURL('/')).toBe('/')
      expect(buildURL('/', { name: 123 })).toBe('/?name=123')
      expect(buildURL('/?age=45', { name: 123 })).toBe('/?age=45&name=123')
      expect(
        buildURL('/#hash', {
          ids: [1, 2],
          profile: { name: 'dora' },
          createdAt: new Date('2024-01-02T03:04:05.000Z'),
          skip: null,
        }),
      ).toBe('/?ids[]=1&ids[]=2&profile=%7B%22name%22:%22dora%22%7D&createdAt=2024-01-02T03:04:05.000Z')
    })
    test('call customPromise', async () => {
      const resolved = customPromise<string>()
      expect(resolved.promiseState).toBe('pending')
      resolved.resolve('done')
      resolved.reject('ignored')
      await expect(resolved.promise).resolves.toBe('done')
      expect(resolved.promiseState).toBe('fulfilled')

      const rejected = customPromise<string>()
      rejected.reject('failed')
      rejected.resolve('ignored')
      await expect(rejected.promise).rejects.toBe('failed')
      expect(rejected.promiseState).toBe('rejected')
    })
    test('call getDefaultContext', () => {
      expect(
        getDefaultContext(
          {
            text: 'hello',
            count: { value: 2 },
          },
          ['text', 'count'],
        ),
      ).toEqual({
        text: 'hello',
        count: 2,
      })
      expect(getDefaultContext({ text: 'hello' }, undefined as never)).toEqual({})
    })
    test('call getFontSize', () => {
      expect(getFontSize(16)).toBe('16px')
      expect(getFontSize('16')).toBe('16px')
      expect(getFontSize('1.5rem')).toBe('1.5rem')
      expect(getFontSize('')).toBe('')
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
    test('call isFunction', () => {
      expect(isFunction(() => {})).toBe(true)
      expect(isFunction({})).toBe(false)
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
      expect(mockFn).toHaveBeenCalled()
      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn).toHaveBeenCalledWith(1, 2, 3)
    })
    test('call omit', () => {
      const obj = { a: 1, b: 2, c: 3 }
      expect(omit(obj, [])).toEqual({ a: 1, b: 2, c: 3 })
      expect(omit(obj, ['c'])).toEqual({ a: 1, b: 2 })
      expect(omit(obj, ['b', 'c'])).toEqual({ a: 1 })
      expect(omit(obj, undefined as never)).toEqual({ a: 1, b: 2, c: 3 })
    })
    test('call pxToNumber', () => {
      expect(pxToNumber(undefined)).toBe(0)
      expect(pxToNumber(1)).toBe(1)
      expect(pxToNumber('1')).toBe(1)
      expect(pxToNumber('1.25px')).toBe(1.25)
      expect(pxToNumber('abc')).toBe(0)
    })
    test('call sleep', async () => {
      jest.setTimeout(3000)
      const mockFn = jest.fn(sleep)
      const result = await mockFn(3000)
      expect(result).toBeUndefined()
      expect(mockFn).toHaveBeenCalled()
      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn).toHaveBeenCalledWith(3000)
    })
  })
})
