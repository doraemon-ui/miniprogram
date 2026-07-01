import path from 'path'
import simulate from 'miniprogram-simulate'
import type { Component, RootComponent } from 'miniprogram-simulate'
import type { NavbarInstance } from '../src/types'

function getComponentInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): NavbarInstance {
  return wrapper.instance.$component as unknown as NavbarInstance
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

describe('Navbar', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-navbar', { less: true })
  })

  mountTest(getId)
  mountTest(getId, { color: 'stable' })

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-navbar').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-navbar-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-navbar-custom').length).toBe(1)
  })

  test('should support to change color', async () => {
    const wrapper = simulate.render(id, { color: 'stable' })
    wrapper.attach(document.createElement('parent-wrapper'))
    const $comp = getComponentInstance(wrapper)

    expect($comp.$props.color).toBe('stable')
    expect(wrapper.querySelectorAll('.dora-color--stable').length).toBe(1)

    wrapper.setData({ color: 'positive' })
    await simulate.sleep(0)

    expect($comp.$props.color).toBe('positive')
    expect(wrapper.querySelectorAll('.dora-color--stable').length).toBe(0)
    expect(wrapper.querySelectorAll('.dora-color--positive').length).toBe(1)
  })

  test('should support to change left and right text', async () => {
    const wrapper = simulate.render(id, {
      leftText: 'Back',
      rightText: 'More',
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    const $comp = getComponentInstance(wrapper)

    expect($comp.$props.leftText).toBe('Back')
    expect($comp.$props.rightText).toBe('More')
    expect(wrapper.querySelectorAll('.dora-navbar__text').length).toBe(2)
    expect(wrapper.dom?.textContent).toContain('Back')
    expect(wrapper.dom?.textContent).toContain('More')

    wrapper.setData({
      leftText: '',
      rightText: '',
    })
    await simulate.sleep(0)

    expect($comp.$props.leftText).toBe('')
    expect($comp.$props.rightText).toBe('')
    expect(wrapper.querySelectorAll('.dora-navbar__text').length).toBe(0)
    expect(wrapper.dom?.textContent).not.toContain('Back')
    expect(wrapper.dom?.textContent).not.toContain('More')
  })

  test('should support to trigger click event with type', async () => {
    const onClick = jest.fn()
    const hostId = simulate.load({
      usingComponents: {
        'dora-navbar': id,
      },
      template: `
        <dora-navbar
          id="dora-navbar"
          title="NavBar"
          leftText="Back"
          rightText="More"
          bind:click="onClick"
        />
      `,
      methods: {
        onClick,
      },
    })
    const wrapper = simulate.render(hostId)
    wrapper.attach(document.createElement('parent-wrapper'))

    const navbar = wrapper.querySelector('#dora-navbar')
    const $comp = getComponentInstance(navbar)
    const left = navbar.querySelector('.dora-navbar__left')
    const right = navbar.querySelector('.dora-navbar__right')

    left.dispatchEvent('tap')
    await simulate.sleep(0)
    right.dispatchEvent('tap')
    await simulate.sleep(0)

    expect($comp.$props.leftText).toBe('Back')
    expect($comp.$props.rightText).toBe('More')
    expect(onClick).toHaveBeenCalledTimes(2)
    expect(onClick.mock.calls[0][0].detail).toEqual({ type: 'left' })
    expect(onClick.mock.calls[1][0].detail).toEqual({ type: 'right' })
  })
})
