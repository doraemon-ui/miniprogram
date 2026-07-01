import path from 'path'
import simulate from 'miniprogram-simulate'
import type { Component, RootComponent } from 'miniprogram-simulate'
import { useRectAll, useRect, vibrateShort } from '@doraemon-ui/miniprogram.shared'
import type { IndexListInstance, IndexListItemInstance } from '../src/types'

jest.mock('@doraemon-ui/miniprogram.shared', () => ({
  useRectAll: jest.fn(),
  useRect: jest.fn(),
  vibrateShort: jest.fn(() => Promise.resolve()),
}))

function getIndexListInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): IndexListInstance {
  return wrapper.instance.$component as unknown as IndexListInstance
}

function getIndexListItemInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): IndexListItemInstance {
  return wrapper.instance.$component as unknown as IndexListItemInstance
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

let indexListID: string
let indexListItemID: string

function getIndexListID() {
  return indexListID
}

function getIndexListItemID() {
  return indexListItemID
}

function renderInline(methods: Record<string, (...args: any[]) => void> = {}, data: Record<string, unknown> = {}) {
  return simulate.render(
    simulate.load({
      usingComponents: {
        'dora-index-list': indexListID,
        'dora-index-list-item': indexListItemID,
      },
      template: `
        <dora-index-list
          id="index-list"
          prefixCls="{{ prefixCls }}"
          height="{{ height }}"
          showIndicator="{{ showIndicator }}"
          indicatorPosition="{{ indicatorPosition }}"
          parentOffsetTop="{{ parentOffsetTop }}"
          bind:change="onChange"
        >
          <dora-index-list-item id="item-a" name="{{ nameA }}">
            <view class="cell">{{ valueA }}</view>
          </dora-index-list-item>
          <dora-index-list-item id="item-b" name="{{ nameB }}">
            <view class="cell">{{ valueB }}</view>
          </dora-index-list-item>
        </dora-index-list>
      `,
      data: {
        prefixCls: 'dora-index-list',
        height: 320,
        showIndicator: true,
        indicatorPosition: 'center',
        parentOffsetTop: 0,
        nameA: 'Alpha',
        nameB: 'Beta',
        valueA: 'Aaron',
        valueB: 'Braden',
        ...data,
      },
      methods: {
        onChange: jest.fn(),
        ...methods,
      },
    }),
  )
}

describe('IndexList', () => {
  beforeAll(() => {
    indexListID = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-index-list', {
      less: true,
      shareCache: true,
    } as object)
    indexListItemID = simulate.load(path.resolve(__dirname, '../src/item'), 'dora-index-list-item', {
      less: true,
      shareCache: true,
    } as object)
  })

  afterAll(() => {
    global.simulatePatch.restore()
  })

  beforeEach(() => {
    let itemRectCallCount = 0
    ;(useRect as jest.Mock).mockImplementation(() => {
      const itemRects = [
        { top: 80, height: 48 },
        { top: 168, height: 56 },
      ]
      const nextRect = itemRects[itemRectCallCount % itemRects.length]
      itemRectCallCount += 1
      return Promise.resolve(nextRect)
    })
    ;(useRectAll as jest.Mock).mockResolvedValue([
      [{ top: 0, height: 20 }],
      [
        { top: 12, height: 20, dataset: { index: 0, name: 'Alpha', brief: 'A' } },
        { top: 32, height: 20, dataset: { index: 1, name: 'Beta', brief: 'B' } },
      ],
    ])
    ;(vibrateShort as jest.Mock).mockClear()
  })

  mountTest(getIndexListID)
  mountTest(getIndexListItemID)

  test('mount correctly', async () => {
    const wrapper = renderInline()
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(80)

    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to trigger event', async () => {
    const onChange = jest.fn()
    const wrapper = renderInline({ onChange }, { indicatorPosition: 'right' })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(80)

    const indexList = wrapper.querySelector('#index-list')
    const itemA = wrapper.querySelector('#item-a')
    const itemB = wrapper.querySelector('#item-b')

    itemA.setData({ index: 0, top: 80, height: 48 })
    itemB.setData({ index: 1, top: 168, height: 56 })
    indexList.setData({
      navList: [
        { index: 0, name: 'Alpha', brief: 'A' },
        { index: 1, name: 'Beta', brief: 'B' },
      ],
    })
    await simulate.sleep(10)

    const navItem = indexList.querySelectorAll('.dora-index-list__nav-item')[1]
    navItem.dispatchEvent('touchstart')
    await simulate.sleep(0)

    expect(vibrateShort).toHaveBeenCalledWith({ type: 'light' })
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0].detail).toEqual({ index: 1, name: 'Beta', brief: 'B' })
  })

  test('should support to change props', async () => {
    const wrapper = renderInline()
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(80)

    const indexList = wrapper.querySelector('#index-list')
    const itemA = wrapper.querySelector('#item-a')
    const $indexList = getIndexListInstance(indexList)
    const $itemA = getIndexListItemInstance(itemA)

    wrapper.setData({ prefixCls: 'dora-index-list-custom' })
    await simulate.sleep(0)
    expect($indexList.$props.prefixCls).toBe('dora-index-list-custom')
    expect(indexList.querySelectorAll('.dora-index-list-custom').length).toBe(1)

    wrapper.setData({ height: 480 })
    await simulate.sleep(0)
    expect($indexList.$props.height).toBe(480)

    wrapper.setData({ showIndicator: false })
    await simulate.sleep(0)
    expect($indexList.$props.showIndicator).toBe(false)

    wrapper.setData({ nameA: 'Charlie' })
    await simulate.sleep(80)
    expect($itemA.$props.name).toBe('Charlie')
    expect(itemA.querySelector('.dora-index-list-item__hd').dom.innerHTML).toBe('Charlie')
  })
})
