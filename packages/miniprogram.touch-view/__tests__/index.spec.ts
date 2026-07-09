import type { Component, RootComponent } from 'miniprogram-simulate'
import simulate from 'miniprogram-simulate'
import path from 'path'

import type { TouchViewInstance } from '../src/types'

function getComponentInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): TouchViewInstance {
  return wrapper.instance.$component as unknown as TouchViewInstance
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

let id: string

function getId() {
  return id
}

describe('TouchView', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-touch-view', { less: true })
  })

  mountTest(getId)
  mountTest(getId, { wrapStyle: 'padding: 24rpx;' })
  mountTest(getId, { hoverClass: 'custom-hover' })

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-touch-view').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-touch-view-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-touch-view-custom').length).toBe(1)
  })

  test('should support to change wrapStyle', async () => {
    const wrapper = simulate.render(id, {
      wrapStyle: {
        color: 'red',
      },
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    const $comp = getComponentInstance(wrapper)
    const nativeView = wrapper.querySelector('.dora-touch-view')

    expect($comp.$props.wrapStyle).toEqual({ color: 'red' })
    expect(nativeView.dom?.getAttribute('style')).toContain('color: red')

    wrapper.setData({
      wrapStyle: 'padding: 24rpx; border: 1px solid #ddd;',
    })
    await simulate.sleep(0)

    expect($comp.$props.wrapStyle).toBe('padding: 24rpx; border: 1px solid #ddd;')
    expect(nativeView.dom?.getAttribute('style')).toContain('padding: 24px')
    expect(nativeView.dom?.getAttribute('style')).toContain('border: 1px solid #ddd')
  })

  test('should support to change hover props', async () => {
    const wrapper = simulate.render(id, {
      hoverClass: 'custom-hover',
      hoverStartTime: 30,
      hoverStayTime: 90,
      hoverStopPropagation: true,
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    const $comp = getComponentInstance(wrapper)
    const nativeView = wrapper.querySelector('.dora-touch-view')

    expect($comp.$props.hoverClass).toBe('custom-hover')
    expect($comp.$props.hoverStartTime).toBe(30)
    expect($comp.$props.hoverStayTime).toBe(90)
    expect($comp.$props.hoverStopPropagation).toBe(true)

    wrapper.setData({
      hoverClass: 'default',
      hoverStartTime: 10,
      hoverStayTime: 50,
      hoverStopPropagation: false,
    })
    await simulate.sleep(0)

    expect($comp.$props.hoverClass).toBe('default')
    expect($comp.$props.hoverStartTime).toBe(10)
    expect($comp.$props.hoverStayTime).toBe(50)
    expect($comp.$props.hoverStopPropagation).toBe(false)
  })

  test('should support to trigger click event', async () => {
    const onClick = jest.fn()
    const hostId = simulate.load({
      usingComponents: {
        'dora-touch-view': id,
      },
      template: `
        <dora-touch-view
          id="touch-view"
          bind:click="onClick"
          wrapStyle="padding: 24rpx; border: 1px solid #ddd;"
        >
          touch me
        </dora-touch-view>
      `,
      methods: {
        onClick,
      },
    })
    const wrapper = simulate.render(hostId)
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)

    const touchView = wrapper.querySelector('#touch-view')
    const $comp = getComponentInstance(touchView)
    const nativeView = touchView.querySelector('.dora-touch-view')

    expect($comp.$props.wrapStyle).toBe('padding: 24rpx; border: 1px solid #ddd;')

    nativeView.dispatchEvent('tap')
    await simulate.sleep(0)

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
