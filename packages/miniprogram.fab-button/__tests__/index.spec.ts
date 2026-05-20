import path from 'path'
import simulate from 'miniprogram-simulate'
import type { Component, RootComponent } from 'miniprogram-simulate'
import type { FabButtonInstance } from '../src/types'

jest.mock('@doraemon-ui/miniprogram.shared', () => ({
  useRect: jest.fn(() => Promise.resolve({ width: 40 })),
}))

function getComponentInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): FabButtonInstance {
  return wrapper.instance.$component as unknown as FabButtonInstance
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

describe('FabButton', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-fab-button', { less: true })
  })

  mountTest(getId)
  mountTest(getId, { position: 'topLeft' })
  mountTest(getId, { direction: 'vertical' })
  mountTest(getId, { color: 'balanced' })

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-fab-button').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-fab-button-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-fab-button-custom').length).toBe(1)
  })

  test('should apply color utility classes', () => {
    const wrapper = simulate.render(id, { color: 'balanced' })
    wrapper.attach(document.createElement('parent-wrapper'))

    const tree = JSON.stringify(wrapper.toJSON())
    expect(tree).toContain('dora-color')
    expect(tree).toContain('dora-color--balanced')
  })

  test('should open actions on tap and render backdrop', async () => {
    const wrapper = simulate.render(id, {
      buttons: [{ label: 'A' }, { label: 'B' }],
      backdrop: true,
      direction: 'horizontal',
    })
    wrapper.attach(document.createElement('parent-wrapper'))

    const root = wrapper.querySelector('.dora-fab-button')
    root.dispatchEvent('tap')
    await simulate.sleep(0)

    expect(wrapper.querySelectorAll('.dora-fab-button--opened').length).toBe(1)
    expect(wrapper.querySelectorAll('.dora-fab-button__backdrop').length).toBe(1)

    const tree = JSON.stringify(wrapper.toJSON())
    expect(tree).toContain('opacity: 1; transition-duration: 300ms; transform: scale(0.9) translate3d(-50px, 0px, 0)')
    expect(tree).toContain('opacity: 1; transition-duration: 300ms; transform: scale(0.9) translate3d(-100px, 0px, 0)')
  })

  test('should support controlled visible updates without toggling internal state on tap', async () => {
    const onChange = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-fab-button': id,
        },
        template: `
          <dora-fab-button
            id="fab-button"
            controlled
            visible="{{visible}}"
            buttons="{{buttons}}"
            bind:change="onChange"
          />
        `,
        data: {
          visible: false,
          buttons: [{ label: 'A' }],
        },
        methods: {
          onChange,
        },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))

    const fabButton = wrapper.querySelector('#fab-button')
    const root = fabButton.querySelector('.dora-fab-button')
    root.dispatchEvent('tap')
    await simulate.sleep(0)

    expect(onChange).toHaveBeenCalled()
    expect(fabButton.querySelectorAll('.dora-fab-button--opened').length).toBe(0)

    wrapper.setData({ visible: true })
    await simulate.sleep(0)

    expect(fabButton.querySelectorAll('.dora-fab-button--opened').length).toBe(1)
  })

  test('should emit click and close when enabled action button tapped', async () => {
    const onClick = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-fab-button': id,
        },
        template: `
          <dora-fab-button
            id="fab-button"
            defaultVisible
            buttons="{{buttons}}"
            bind:click="onClick"
          />
        `,
        data: {
          buttons: [{ label: 'A', disabled: false, value: 'first' }],
        },
        methods: {
          onClick,
        },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))

    const fabButton = wrapper.querySelector('#fab-button')
    const button = fabButton.querySelector('.dora-fab-button__button')
    button.dispatchEvent('tap')
    await simulate.sleep(0)

    expect(onClick).toHaveBeenCalled()
    expect(fabButton.querySelectorAll('.dora-fab-button--opened').length).toBe(0)
  })

  test('should ignore disabled action button tap', async () => {
    const onClick = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-fab-button': id,
        },
        template: `
          <dora-fab-button
            id="fab-button"
            defaultVisible
            buttons="{{buttons}}"
            bind:click="onClick"
          />
        `,
        data: {
          buttons: [{ label: 'A', disabled: true }],
        },
        methods: {
          onClick,
        },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))

    const fabButton = wrapper.querySelector('#fab-button')
    const button = fabButton.querySelector('.dora-fab-button__button')
    button.dispatchEvent('tap')
    await simulate.sleep(0)

    expect(onClick).not.toHaveBeenCalled()
    expect(fabButton.querySelectorAll('.dora-fab-button--opened').length).toBe(1)
  })

  test('should forward open type events with detail and dataset', async () => {
    const onGetUserInfo = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-fab-button': id,
        },
        template: `
          <dora-fab-button
            id="fab-button"
            buttons="{{buttons}}"
            bind:getuserinfo="onGetUserInfo"
          />
        `,
        data: {
          buttons: [{ label: 'Profile', value: 'profile', openType: 'getUserInfo' }],
        },
        methods: {
          onGetUserInfo,
        },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))

    const fabButton = wrapper.querySelector('#fab-button')
    const button = fabButton.querySelector('.dora-fab-button__button')
    button.dispatchEvent('getuserinfo', {
      detail: {
        userInfo: { nickName: 'Doraemon' },
      },
    })
    await simulate.sleep(0)

    expect(onGetUserInfo).toHaveBeenCalled()
  })

  test('should support to change visible prop in component instance', async () => {
    const wrapper = simulate.render(id, { controlled: true, visible: false, buttons: [{ label: 'A' }] })
    wrapper.attach(document.createElement('parent-wrapper'))
    const $comp = getComponentInstance(wrapper)

    expect($comp.$props.visible).toBe(false)

    wrapper.setData({ visible: true })
    await simulate.sleep(0)

    expect($comp.$props.visible).toBe(true)
    expect(wrapper.querySelectorAll('.dora-fab-button--opened').length).toBe(1)
  })
})
