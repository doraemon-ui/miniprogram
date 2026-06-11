import path from 'path'
import simulate from 'miniprogram-simulate'
import type { RootComponent, Component } from 'miniprogram-simulate'
import { useRectAll, useRect, vibrateShort } from '@doraemon-ui/miniprogram.shared'
import type { IndexListInstance, IndexListItemInstance } from '../src/types'

jest.mock('@doraemon-ui/miniprogram.shared', () => ({
  useRectAll: jest.fn(),
  useRect: jest.fn(),
  vibrateShort: jest.fn(() => Promise.resolve()),
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

function getComponentInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): IndexListInstance {
  return wrapper.instance.$component as unknown as IndexListInstance
}

function getItemComponentInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): IndexListItemInstance {
  return wrapper.instance.$component as unknown as IndexListItemInstance
}

let id: string
let itemId: string
let hostId: string

function loadHost(): string {
  return simulate.load({
    usingComponents: {
      'dora-index-list': id,
      'dora-index-list-item': itemId,
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
    },
    methods: {
      onChange: jest.fn(),
    },
  }) as unknown as string
}

function getHostId(): string {
  return hostId
}

async function connectChildren(wrapper: RootComponent<any, any, any> | Component<any, any, any>) {
  const indexList = wrapper.querySelector('#index-list')
  const itemA = wrapper.querySelector('#item-a')
  const itemB = wrapper.querySelector('#item-b')
  const $indexList = getComponentInstance(indexList)
  const $itemA = getItemComponentInstance(itemA)
  const $itemB = getItemComponentInstance(itemB)

  jest.spyOn(indexList.instance, 'getRelationNodes').mockImplementation((relationKey: string) => {
    if (relationKey === './item') {
      return [itemA.instance, itemB.instance]
    }
    return []
  })
  jest.spyOn(itemA.instance, 'getRelationNodes').mockImplementation((relationKey: string) => {
    if (relationKey === './index') {
      return [indexList.instance]
    }
    return []
  })
  jest.spyOn(itemB.instance, 'getRelationNodes').mockImplementation((relationKey: string) => {
    if (relationKey === './index') {
      return [indexList.instance]
    }
    return []
  })

  $itemA.updated(0)
  $itemB.updated(1)
  await simulate.sleep(30)
  $indexList.updateNavList()
  await simulate.sleep(30)

  return {
    indexList,
    $indexList,
    itemA,
    itemB,
  }
}

describe('IndexList', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-index-list', {
      less: true,
      shareCache: true,
    } as object)
    itemId = simulate.load(path.resolve(__dirname, '../src/item'), 'dora-index-list-item', {
      less: true,
      shareCache: true,
    } as object)
    hostId = loadHost()
  })

  beforeEach(() => {
    let rectCallCount = 0
    ;(useRect as jest.Mock).mockImplementation(() => {
      const rects = [
        { top: 80, height: 48 },
        { top: 168, height: 56 },
      ]
      const rect = rects[rectCallCount % rects.length]
      rectCallCount += 1
      return Promise.resolve(rect)
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

  mountTest(getHostId)

  test('mount correctly', async () => {
    const wrapper = simulate.render(hostId)
    wrapper.attach(document.createElement('parent-wrapper'))
    await connectChildren(wrapper)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support changing parent props through host data', async () => {
    const wrapper = simulate.render(hostId)
    wrapper.attach(document.createElement('parent-wrapper'))
    const { indexList, $indexList } = await connectChildren(wrapper)

    wrapper.setData({
      prefixCls: 'dora-index-list-custom',
      height: 480,
    })
    await simulate.sleep(30)

    expect($indexList.$props.prefixCls).toBe('dora-index-list-custom')
    expect($indexList.$props.height).toBe(480)
    expect(indexList.querySelectorAll('.dora-index-list-custom').length).toBe(1)
  })

  test('should refresh nav item when child name changes', async () => {
    const wrapper = simulate.render(hostId)
    wrapper.attach(document.createElement('parent-wrapper'))
    await connectChildren(wrapper)

    wrapper.setData({
      nameA: 'Charlie',
    })
    await simulate.sleep(30)

    const navItem = wrapper.querySelector('#index-list').querySelector('.dora-index-list__nav-item')
    expect(navItem.dom.innerHTML).toBe('C')
    expect(wrapper.querySelector('#item-a').querySelector('.dora-index-list-item__hd').dom.innerHTML).toBe('Charlie')
  })

  test('should trigger change when touching nav item', async () => {
    const onChange = jest.fn()
    const hostId = simulate.load({
      usingComponents: {
        'dora-index-list': id,
        'dora-index-list-item': itemId,
      },
      template: `
        <dora-index-list
          id="index-list"
          indicatorPosition="right"
          bind:change="onChange"
        >
          <dora-index-list-item id="item-a" name="Alpha">
            <view>Aaron</view>
          </dora-index-list-item>
          <dora-index-list-item id="item-b" name="Beta">
            <view>Braden</view>
          </dora-index-list-item>
        </dora-index-list>
      `,
      methods: {
        onChange,
      },
    })

    const wrapper = simulate.render(hostId)
    wrapper.attach(document.createElement('parent-wrapper'))
    const { indexList } = await connectChildren(wrapper)

    const navItem = indexList.querySelectorAll('.dora-index-list__nav-item')[1]
    navItem.dispatchEvent('touchstart')
    await simulate.sleep(0)

    expect(vibrateShort).toHaveBeenCalledWith({ type: 'light' })
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0].detail).toEqual({ index: 1, name: 'Beta', brief: 'B' })
    expect(indexList.querySelectorAll('.dora-index-list__nav-item--current').length).toBe(1)
    expect(indexList.querySelectorAll('.dora-index-list__indicator--right').length).toBe(1)
  })

  test('should support scrollTo with child items', async () => {
    const onChange = jest.fn()
    const hostId = simulate.load({
      usingComponents: {
        'dora-index-list': id,
        'dora-index-list-item': itemId,
      },
      template: `
        <dora-index-list id="index-list" bind:change="onChange">
          <dora-index-list-item id="item-a" name="Alpha">
            <view>Aaron</view>
          </dora-index-list-item>
          <dora-index-list-item id="item-b" name="Beta">
            <view>Braden</view>
          </dora-index-list-item>
        </dora-index-list>
      `,
      methods: {
        onChange,
      },
    })

    const wrapper = simulate.render(hostId)
    wrapper.attach(document.createElement('parent-wrapper'))
    const { $indexList } = await connectChildren(wrapper)

    $indexList.scrollTo('Beta')
    await simulate.sleep(30)

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0].detail).toEqual({ index: 1, name: 'Beta', brief: 'B' })
    expect(wrapper.querySelector('#index-list').querySelectorAll('.dora-index-list__nav-item--current').length).toBe(1)
  })
})
