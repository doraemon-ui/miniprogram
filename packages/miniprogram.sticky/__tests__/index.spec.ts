import path from 'path'
import simulate from 'miniprogram-simulate'
import type { Component, RootComponent } from 'miniprogram-simulate'
import { useRect } from '@doraemon-ui/miniprogram.shared'
import type { StickyInstance, StickyItemInstance } from '../src/types'

jest.mock('@doraemon-ui/miniprogram.shared', () => ({
  useRect: jest.fn(),
}))

function getStickyInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): StickyInstance {
  return wrapper.instance.$component as unknown as StickyInstance
}

function getStickyItemInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): StickyItemInstance {
  return wrapper.instance.$component as unknown as StickyItemInstance
}

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

let stickyID: string
let stickyItemID: string

function getStickyID() {
  return stickyID
}

function getStickyItemID() {
  return stickyItemID
}

function renderInline(methods: Record<string, (...args: any[]) => void> = {}, data: Record<string, unknown> = {}) {
  return simulate.render(
    simulate.load({
      usingComponents: {
        'dora-sticky': stickyID,
        'dora-sticky-item': stickyItemID,
      },
      template: `
        <dora-sticky id="sticky" prefixCls="{{ prefixCls }}" scrollTop="{{ scrollTop }}" bind:stick="onStick" bind:unstick="onUnstick">
          <dora-sticky-item id="item-0" prefixCls="{{ itemPrefixCls }}" title="{{ titleOne }}" content="{{ contentOne }}" />
          <dora-sticky-item id="item-1" prefixCls="{{ itemPrefixCls }}" title="{{ titleTwo }}" content="{{ contentTwo }}" />
        </dora-sticky>
      `,
      data: {
        prefixCls: 'dora-sticky',
        itemPrefixCls: 'dora-sticky-item',
        scrollTop: 0,
        titleOne: 'Alpha',
        contentOne: 'Content A',
        titleTwo: 'Beta',
        contentTwo: 'Content B',
        ...data,
      },
      methods: {
        onStick: jest.fn(),
        onUnstick: jest.fn(),
        ...methods,
      },
    }),
  )
}

describe('Sticky', () => {
  beforeAll(() => {
    stickyID = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-sticky', { less: true, shareCache: true } as object)
    stickyItemID = simulate.load(path.resolve(__dirname, '../src/item'), 'dora-sticky-item', {
      less: true,
      shareCache: true,
    } as object)
  })

  afterAll(() => {
    global.simulatePatch.restore()
  })

  beforeEach(() => {
    let stickyItemRectCallCount = 0
    ;(useRect as jest.Mock).mockImplementation(() => {
      const stickyItemRects = [
        { top: 100, height: 40 },
        { top: 160, height: 50 },
      ]
      const nextRect = stickyItemRects[stickyItemRectCallCount % stickyItemRects.length]
      stickyItemRectCallCount += 1
      return Promise.resolve(nextRect)
    })
  })

  mountTest(getStickyID)
  mountTest(getStickyItemID)

  test('mount correctly', async () => {
    const wrapper = renderInline()
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(30)

    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to trigger event', async () => {
    const onStick = jest.fn()
    const onUnstick = jest.fn()
    const wrapper = renderInline({ onStick, onUnstick })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(80)

    const item0 = wrapper.querySelector('#item-0')
    wrapper.setData({ scrollTop: 120 })
    await simulate.sleep(30)
    expect(onStick).toHaveBeenCalledTimes(1)
    expect(onStick.mock.calls[0][0].detail).toEqual({ index: 0 })
    expect(item0.querySelectorAll('.dora-sticky-item--fixed').length).toBe(1)

    wrapper.setData({ scrollTop: 0 })
    await simulate.sleep(30)
    expect(onUnstick).toHaveBeenCalledTimes(1)
    expect(onUnstick.mock.calls[0][0].detail).toEqual({ index: 0 })
    expect(item0.querySelectorAll('.dora-sticky-item--fixed').length).toBe(0)
  })

  test('should support to change props', async () => {
    const wrapper = renderInline()
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(30)

    const sticky = wrapper.querySelector('#sticky')
    const item0 = wrapper.querySelector('#item-0')
    const item1 = wrapper.querySelector('#item-1')
    const $sticky = getStickyInstance(sticky)
    const $item0 = getStickyItemInstance(item0)
    const $item1 = getStickyItemInstance(item1)

    wrapper.setData({ prefixCls: 'dora-sticky-custom' })
    await simulate.sleep(0)
    expect($sticky.$props.prefixCls).toBe('dora-sticky-custom')
    expect(sticky.querySelectorAll('.dora-sticky-custom').length).toBe(1)

    wrapper.setData({ itemPrefixCls: 'dora-sticky-entry' })
    await simulate.sleep(0)
    expect($item0.$props.prefixCls).toBe('dora-sticky-entry')
    expect(item0.querySelectorAll('.dora-sticky-entry').length).toBe(1)

    wrapper.setData({ titleOne: 'Changed Alpha' })
    await simulate.sleep(0)
    expect($item0.$props.title).toBe('Changed Alpha')
    expect(item0.querySelector('.dora-sticky-entry__title').dom.innerHTML).toBe('Changed Alpha')

    wrapper.setData({ contentTwo: 'Changed Content B' })
    await simulate.sleep(0)
    expect($item1.$props.content).toBe('Changed Content B')
    expect(item1.querySelector('.dora-sticky-entry__content').dom.innerHTML).toBe('Changed Content B')
  })
})
