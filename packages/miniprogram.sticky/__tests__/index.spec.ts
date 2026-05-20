import path from 'path'
import simulate from 'miniprogram-simulate'
import type { RootComponent, Component } from 'miniprogram-simulate'
import type { StickyInstance, StickyItemInstance } from '../src/types'
import { useRect } from '@doraemon-ui/miniprogram.shared'

jest.mock('@doraemon-ui/miniprogram.shared', () => ({
  useRect: jest.fn(),
}))

function mountTest(id: string | (() => string), defaultProps: Record<string, unknown> = {}) {
  describe('mount and unmount', () => {
    it('component could be updated and unmounted without errors', () => {
      const wrapper = simulate.render(typeof id === 'function' ? id() : id, defaultProps)
      wrapper.attach(document.createElement('parent-wrapper'))
      expect(() => {
        wrapper.setData({})
        wrapper.detach()
      }).not.toThrow()
    })
  })
}

let id: string
let itemId: string

function getId() {
  return id
}

function getItemId() {
  return itemId
}

function getStickyInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): StickyInstance {
  return wrapper.instance.$component as unknown as StickyInstance
}

function getStickyItemInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): StickyItemInstance {
  return wrapper.instance.$component as unknown as StickyItemInstance
}

describe('Sticky', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-sticky', { less: true, shareCache: true } as object)
    itemId = simulate.load(path.resolve(__dirname, '../src/item'), 'dora-sticky-item', { less: true, shareCache: true } as object)
  })

  mountTest(getId)
  mountTest(getId, { scrollTop: 0 })
  mountTest(getId, { scrollTop: 100 })
  mountTest(getItemId)
  mountTest(getItemId, { title: '标题' })
  mountTest(getItemId, { content: '内容' })

  test('mount correctly', async () => {
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-sticky': id,
          'dora-sticky-item': itemId,
        },
        template: `
          <dora-sticky id="sticky">
            <dora-sticky-item title="小鸡">
              <view slot="content">内容</view>
            </dora-sticky-item>
          </dora-sticky>
        `,
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(10)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change prefixCls', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-sticky-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-sticky-custom').length).toBe(1)
  })

  test('should support to change StickyItem prefixCls', () => {
    const wrapper = simulate.render(itemId, { prefixCls: 'dora-sticky-item-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-sticky-item-custom').length).toBe(1)
  })

  test('should support to trigger stick event', async () => {
    const onStick = jest.fn()
    const compId = simulate.load({
      usingComponents: {
        'dora-sticky': id,
      },
      template: `
        <dora-sticky id="sticky" bind:stick="onStick"></dora-sticky>
      `,
      methods: { onStick },
    })
    const wrapper = simulate.render(compId)
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)

    const sticky = wrapper.querySelector('#sticky')
    const nativeSticky = sticky.querySelector('.dora-sticky')

    nativeSticky.dispatchEvent('stick')
    await simulate.sleep(0)
    expect(onStick).toHaveBeenCalled()
  })

  test('should support to trigger unstick event', async () => {
    const onUnstick = jest.fn()
    const compId = simulate.load({
      usingComponents: {
        'dora-sticky': id,
      },
      template: `
        <dora-sticky id="sticky" bind:unstick="onUnstick"></dora-sticky>
      `,
      methods: { onUnstick },
    })
    const wrapper = simulate.render(compId)
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)

    const sticky = wrapper.querySelector('#sticky')
    const nativeSticky = sticky.querySelector('.dora-sticky')

    nativeSticky.dispatchEvent('unstick')
    await simulate.sleep(0)
    expect(onUnstick).toHaveBeenCalled()
  })

  test('should call emitStick method', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    const $sticky = getStickyInstance(wrapper)

    expect(() => {
      $sticky.emitStick({ index: 0 })
    }).not.toThrow()
  })

  test('should call emitUnstick method', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    const $sticky = getStickyInstance(wrapper)

    expect(() => {
      $sticky.emitUnstick({ index: 0 })
    }).not.toThrow()
  })

  test('should not crash when onScroll called with no children', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    const $sticky = getStickyInstance(wrapper)

    expect(() => {
      $sticky.onScroll(100)
    }).not.toThrow()
  })

  test('should not crash when updated called with no children', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    const $sticky = getStickyInstance(wrapper)

    expect(() => {
      $sticky.updated()
    }).not.toThrow()
  })

  test('should coordinate sticky-item fixed state with measured rects', async () => {
    const mockedUseRect = useRect as jest.Mock
    mockedUseRect.mockResolvedValue({ top: 0, height: 0 })

    const compId = simulate.load({
      usingComponents: {
        'dora-sticky': id,
        'dora-sticky-item': itemId,
      },
      template: `
        <dora-sticky id="sticky">
          <dora-sticky-item id="sticky-item-0" title="第一项" content="内容一"></dora-sticky-item>
          <dora-sticky-item id="sticky-item-1" title="第二项" content="内容二"></dora-sticky-item>
        </dora-sticky>
      `,
    })

    const wrapper = simulate.render(compId)
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)

    mockedUseRect.mockClear()
    const rects = [
      { top: 100, height: 50 },
      { top: 200, height: 60 },
    ]
    let rectIndex = 0
    mockedUseRect.mockImplementation(() => Promise.resolve(rects[rectIndex++] ?? rects[rects.length - 1]))

    const stickyItem0 = wrapper.querySelector('#sticky-item-0')
    const stickyItem1 = wrapper.querySelector('#sticky-item-1')
    const $stickyItem0 = getStickyItemInstance(stickyItem0)
    const $stickyItem1 = getStickyItemInstance(stickyItem1)

    $stickyItem0.updated(0)
    $stickyItem1.updated(1)
    await simulate.sleep(0)

    expect(mockedUseRect).toHaveBeenCalledTimes(2)
    expect(mockedUseRect).toHaveBeenNthCalledWith(1, '.dora-sticky-item', expect.anything())
    expect(mockedUseRect).toHaveBeenNthCalledWith(2, '.dora-sticky-item', expect.anything())

    $stickyItem0.onScroll(110)
    await simulate.sleep(0)
    expect(stickyItem0.querySelectorAll('.dora-sticky-item--fixed').length).toBe(1)
    expect(stickyItem1.querySelectorAll('.dora-sticky-item--fixed').length).toBe(0)

    $stickyItem0.onScroll(151)
    await simulate.sleep(0)
    expect(stickyItem0.querySelectorAll('.dora-sticky-item--fixed').length).toBe(0)

    $stickyItem1.onScroll(210)
    await simulate.sleep(0)
    expect(stickyItem1.querySelectorAll('.dora-sticky-item--fixed').length).toBe(1)
  })

  test('should render title text', () => {
    const wrapper = simulate.render(itemId, { title: '我的标题' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-sticky-item__title').length).toBe(1)
  })

  test('should render content text', () => {
    const wrapper = simulate.render(itemId, { content: '我的内容' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-sticky-item__content').length).toBe(1)
  })

  test('should call useRect when updated is called', () => {
    const mockedUseRect = useRect as jest.Mock
    mockedUseRect.mockResolvedValue({ top: 100, height: 50 })

    const wrapper = simulate.render(itemId)
    wrapper.attach(document.createElement('parent-wrapper'))
    const $item = getStickyItemInstance(wrapper)

    $item.updated(2)

    expect(mockedUseRect).toHaveBeenCalledWith('.dora-sticky-item', expect.anything())
  })

  test('should not crash when useRect returns null in updated', async () => {
    const mockedUseRect = useRect as jest.Mock
    mockedUseRect.mockResolvedValue(null)

    const wrapper = simulate.render(itemId)
    wrapper.attach(document.createElement('parent-wrapper'))
    const $item = getStickyItemInstance(wrapper)

    expect(() => {
      $item.updated(0)
    }).not.toThrow()

    await simulate.sleep(0)
  })

  test('should not crash when StickyItem onScroll is called', () => {
    const wrapper = simulate.render(itemId, { title: '标题' })
    wrapper.attach(document.createElement('parent-wrapper'))
    const $item = getStickyItemInstance(wrapper)

    expect(() => {
      $item.onScroll(15)
    }).not.toThrow()
  })
})
