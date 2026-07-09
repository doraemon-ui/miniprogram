import type { Component, RootComponent } from 'miniprogram-simulate'
import simulate from 'miniprogram-simulate'
import path from 'path'

import type { GridInstance, GridItemInstance } from '../src/types'

function getGridInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): GridInstance {
  return wrapper.instance.$component as unknown as GridInstance
}

function getGridItemInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): GridItemInstance {
  return wrapper.instance.$component as unknown as GridItemInstance
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

let gridID: string
let gridItemID: string

function getGridID() {
  return gridID
}

function getGridItemID() {
  return gridItemID
}

function renderInline(methods: Record<string, (...args: any[]) => void> = {}, data: Record<string, unknown> = {}) {
  return simulate.render(
    simulate.load({
      usingComponents: {
        'dora-grid': gridID,
        'dora-grid-item': gridItemID,
      },
      template: `
        <dora-grid id="grid" prefixCls="{{ prefixCls }}" col="{{ col }}" bordered="{{ bordered }}" square="{{ square }}">
          <dora-grid-item id="item-0" prefixCls="{{ itemPrefixCls }}" hoverClass="{{ hoverClass }}" label="{{ labelOne }}" />
          <dora-grid-item id="item-1" prefixCls="{{ itemPrefixCls }}" hoverClass="{{ hoverClass }}" label="{{ labelTwo }}" />
        </dora-grid>
      `,
      data: {
        prefixCls: 'dora-grid',
        itemPrefixCls: 'dora-grid-item',
        col: 2,
        bordered: true,
        square: false,
        hoverClass: 'grid-hover',
        labelOne: 'Grid 1',
        labelTwo: 'Grid 2',
        ...data,
      },
      methods,
    }),
  )
}

function renderGridItemHost(methods: Record<string, (...args: any[]) => void> = {}, data: Record<string, unknown> = {}) {
  return simulate.render(
    simulate.load({
      usingComponents: {
        'dora-grid-item': gridItemID,
      },
      template: `
        <dora-grid-item
          id="grid-item"
          prefixCls="{{ itemPrefixCls }}"
          hoverClass="{{ hoverClass }}"
          label="{{ label }}"
          bind:click="onClick"
        />
      `,
      data: {
        itemPrefixCls: 'dora-grid-item',
        hoverClass: 'grid-hover',
        label: 'Grid Item',
        ...data,
      },
      methods: {
        onClick: jest.fn(),
        ...methods,
      },
    }),
  )
}

describe('Grid', () => {
  beforeAll(() => {
    gridID = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-grid', { less: true, shareCache: true } as object)
    gridItemID = simulate.load(path.resolve(__dirname, '../src/item'), 'dora-grid-item', { less: true, shareCache: true } as object)
  })

  afterAll(() => {
    global.simulatePatch.restore()
  })

  mountTest(getGridID)
  mountTest(getGridItemID)

  test('mount correctly', async () => {
    const wrapper = renderInline()
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)

    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to trigger event', async () => {
    const onClick = jest.fn()
    const wrapper = renderGridItemHost({ onClick })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)

    const gridItem = wrapper.querySelector('#grid-item')
    const nativeGridItem = gridItem.querySelector('.dora-grid-item')
    nativeGridItem.dispatchEvent('tap')
    await simulate.sleep(0)

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onClick.mock.calls[0][0].detail).toEqual({ index: 0 })
  })

  test('should support to change props', async () => {
    const wrapper = renderInline()
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)

    const grid = wrapper.querySelector('#grid')
    const item0 = wrapper.querySelector('#item-0')
    const $grid = getGridInstance(grid)
    const $item0 = getGridItemInstance(item0)

    wrapper.setData({ prefixCls: 'dora-grid-custom' })
    await simulate.sleep(0)
    expect($grid.$props.prefixCls).toBe('dora-grid-custom')
    expect(grid.querySelectorAll('.dora-grid-custom').length).toBe(1)

    wrapper.setData({ col: 4 })
    await simulate.sleep(0)
    expect($grid.$props.col).toBe(4)

    wrapper.setData({ bordered: false })
    await simulate.sleep(0)
    expect($grid.$props.bordered).toBe(false)
    expect(grid.querySelectorAll('.dora-grid-custom--bordered').length).toBe(0)

    wrapper.setData({ itemPrefixCls: 'dora-grid-entry' })
    await simulate.sleep(0)
    expect($item0.$props.prefixCls).toBe('dora-grid-entry')
    expect(item0.querySelectorAll('.dora-grid-entry').length).toBe(1)

    wrapper.setData({ labelOne: 'Grid Alpha' })
    await simulate.sleep(0)
    expect($item0.$props.label).toBe('Grid Alpha')
    expect(item0.querySelector('.dora-grid-entry__label').dom.innerHTML).toBe('Grid Alpha')
  })
})
