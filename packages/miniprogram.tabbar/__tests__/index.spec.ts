import path from 'path'
import simulate from 'miniprogram-simulate'
import type { Component, RootComponent } from 'miniprogram-simulate'
import type { TabbarInstance, TabbarItemInstance } from '../src/types'

function getComponentInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): TabbarInstance {
  return wrapper.instance.$component as unknown as TabbarInstance
}

function getTabbarItemInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): TabbarItemInstance {
  return wrapper.instance.$component as unknown as TabbarItemInstance
}

function mountTest(id: string | (() => string | RootComponent<any, any, any>), defaultProps: Record<string, unknown> = {}) {
  describe('mount and unmount', () => {
    it('component could be updated and unmounted without errors', () => {
      const target = typeof id === 'function' ? id() : id
      const wrapper = typeof target === 'string' ? simulate.render(target, defaultProps) : target
      wrapper.attach(document.createElement('parent-wrapper'))
      expect(() => {
        wrapper.setData({})
        wrapper.detach()
      }).not.toThrow()
    })
  })
}

let tabbarID: string
let tabbarItemID: string

function getTabbarID() {
  return tabbarID
}

function renderInline(template: string, methods: Record<string, (...args: any[]) => void> = {}, data: Record<string, unknown> = {}) {
  return simulate.render(
    simulate.load({
      usingComponents: {
        'dora-tabbar': tabbarID,
        'dora-tabbar-item': tabbarItemID,
      },
      template,
      methods,
      data,
    }),
  )
}

describe('Tabbar', () => {
  beforeAll(() => {
    tabbarItemID = simulate.load(path.resolve(__dirname, '../src/item'), 'dora-tabbar-item', {
      less: true,
      shareCache: true,
    } as object)
    tabbarID = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-tabbar', {
      less: true,
      shareCache: true,
    } as object)
  })

  afterAll(() => {
    global.simulatePatch.restore()
  })

  mountTest(getTabbarID)
  mountTest(() =>
    renderInline(`
      <dora-tabbar id="tabbar">
        <dora-tabbar-item id="home-tab" key="home" title="Home" />
      </dora-tabbar>
    `),
  )

  test('mount correctly', async () => {
    const wrapper = renderInline(`
      <dora-tabbar id="tabbar" defaultCurrent="home">
        <dora-tabbar-item id="home-tab" key="home" title="Home" />
        <dora-tabbar-item id="profile-tab" key="profile" title="Profile" />
      </dora-tabbar>
    `)
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(100)

    const tabbar = wrapper.querySelector('#tabbar')

    expect(tabbar.querySelectorAll('.dora-tabbar').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to trigger event', async () => {
    const onChange = jest.fn()
    const onClick = jest.fn()
    const wrapper = renderInline(
      `
        <dora-tabbar id="tabbar" defaultCurrent="home" bind:change="onChange">
          <dora-tabbar-item id="home-tab" key="home" title="Home" />
          <dora-tabbar-item id="profile-tab" key="profile" title="Profile" disabled="{{disabled}}" bind:click="onClick" />
        </dora-tabbar>
      `,
      {
        onChange,
        onClick,
      },
      {
        disabled: false,
      },
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(100)

    const profileTab = wrapper.querySelector('#profile-tab')
    const profileTabItem = profileTab.querySelector('.dora-tabbar-item')
    const $profileTab = getTabbarItemInstance(profileTab)

    profileTabItem.dispatchEvent('tap')
    await simulate.sleep(0)

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0].detail).toEqual(
      expect.objectContaining({
        key: 'profile',
      }),
    )

    wrapper.setData({ disabled: true })
    await simulate.sleep(0)
    expect($profileTab.$props.disabled).toBe(true)
    expect(profileTab.querySelectorAll('.dora-tabbar-item--disabled').length).toBe(1)

    profileTabItem.dispatchEvent('tap')
    await simulate.sleep(0)
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  test('should support to change props', async () => {
    const wrapper = renderInline(
      `
        <dora-tabbar
          id="tabbar"
          prefixCls="{{prefixCls}}"
          defaultCurrent="{{defaultCurrent}}"
          current="{{current}}"
          controlled="{{controlled}}"
          color="{{color}}"
          backgroundColor="{{backgroundColor}}"
          position="{{position}}"
          safeArea="{{safeArea}}"
        >
          <dora-tabbar-item id="home-tab" key="home" title="Home" />
          <dora-tabbar-item id="profile-tab" key="profile" title="Profile" disabled="{{disabled}}" />
        </dora-tabbar>
      `,
      {},
      {
        prefixCls: 'dora-tabbar',
        defaultCurrent: 'home',
        current: 'home',
        controlled: false,
        color: 'positive',
        backgroundColor: '#fff',
        position: '',
        safeArea: false,
        disabled: false,
      },
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(100)

    const tabbar = wrapper.querySelector('#tabbar')
    const profileTab = wrapper.querySelector('#profile-tab')
    const $tabbar = getComponentInstance(tabbar)
    const $profileTab = getTabbarItemInstance(profileTab)

    wrapper.setData({ position: 'top' })
    await simulate.sleep(0)
    expect($tabbar.$props.position).toBe('top')
    expect(tabbar.querySelectorAll('.dora-tabbar--top').length).toBe(1)

    wrapper.setData({ backgroundColor: '#f5f5f5' })
    await simulate.sleep(0)
    expect($tabbar.$props.backgroundColor).toBe('#f5f5f5')
    expect(tabbar.querySelector('.dora-tabbar').dom.getAttribute('style')).toContain('background-color: #f5f5f5')

    wrapper.setData({ controlled: true })
    await simulate.sleep(0)
    expect($tabbar.$props.controlled).toBe(true)

    wrapper.setData({ current: 'profile' })
    await simulate.sleep(100)
    expect($tabbar.$props.current).toBe('profile')

    wrapper.setData({ disabled: true })
    await simulate.sleep(0)
    expect($profileTab.$props.disabled).toBe(true)
    expect(profileTab.querySelectorAll('.dora-tabbar-item--disabled').length).toBe(1)

    wrapper.setData({ prefixCls: 'dora-tabbar-custom' })
    await simulate.sleep(0)
    expect($tabbar.$props.prefixCls).toBe('dora-tabbar-custom')
    expect(tabbar.querySelectorAll('.dora-tabbar-custom').length).toBe(1)
  })
})
