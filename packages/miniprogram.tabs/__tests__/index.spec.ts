import type { Component, RootComponent } from 'miniprogram-simulate'
import simulate from 'miniprogram-simulate'
import path from 'path'

import type { TabInstance, TabsInstance } from '../src/types'

jest.mock('@doraemon-ui/miniprogram.shared', () => {
  const actual = jest.requireActual('@doraemon-ui/miniprogram.shared')
  return {
    ...actual,
    useRef: jest.fn(async () => ({
      width: 200,
      height: 100,
      scrollWidth: 600,
      scrollHeight: 300,
      scrollLeft: 10,
      scrollTop: 0,
      left: 0,
      top: 0,
    })),
    useRect: jest.fn(async () => ({
      left: 120,
      width: 40,
      top: 0,
      height: 30,
    })),
  }
})

function getComponentInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): TabsInstance {
  return wrapper.instance.$component as unknown as TabsInstance
}

function getTabInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): TabInstance {
  return wrapper.instance.$component as unknown as TabInstance
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

let tabsID: string
let tabID: string

function getTabsID() {
  return tabsID
}

function renderInline(template: string, methods: Record<string, (...args: any[]) => void> = {}, data: Record<string, unknown> = {}) {
  return simulate.render(
    simulate.load({
      usingComponents: {
        'dora-tabs': tabsID,
        'dora-tab': tabID,
      },
      template,
      methods,
      data,
    }),
  )
}

describe('Tabs', () => {
  beforeAll(() => {
    tabID = simulate.load(path.resolve(__dirname, '../src/tab'), 'dora-tab', {
      less: true,
      shareCache: true,
    } as object)
    tabsID = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-tabs', {
      less: true,
      shareCache: true,
    } as object)
  })

  afterAll(() => {
    global.simulatePatch.restore()
  })

  mountTest(getTabsID)
  mountTest(() =>
    renderInline(`
      <dora-tabs id="tabs">
        <dora-tab id="home-tab" key="home" title="Home" />
      </dora-tabs>
    `),
  )

  test('mount correctly', async () => {
    const wrapper = renderInline(`
      <dora-tabs id="tabs" defaultCurrent="home">
        <dora-tab id="home-tab" key="home" title="Home" />
        <dora-tab id="profile-tab" key="profile" title="Profile" />
      </dora-tabs>
    `)
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(100)

    const tabs = wrapper.querySelector('#tabs')

    expect(tabs.querySelectorAll('.dora-tabs').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to trigger event', async () => {
    const onChange = jest.fn()
    const onClick = jest.fn()
    const wrapper = renderInline(
      `
        <dora-tabs id="tabs" defaultCurrent="home" bind:change="onChange">
          <dora-tab id="home-tab" key="home" title="Home" />
          <dora-tab id="profile-tab" key="profile" title="Profile" disabled="{{disabled}}" bind:click="onClick" />
        </dora-tabs>
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
    const profileTabItem = profileTab.querySelector('.dora-tabs__tab')
    const $profileTab = getTabInstance(profileTab)

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
    expect(profileTab.querySelectorAll('.dora-tabs__tab--disabled').length).toBe(1)

    profileTabItem.dispatchEvent('tap')
    await simulate.sleep(0)
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  test('should support to change props', async () => {
    const wrapper = renderInline(
      `
        <dora-tabs
          id="tabs"
          prefixCls="{{prefixCls}}"
          defaultCurrent="{{defaultCurrent}}"
          current="{{current}}"
          controlled="{{controlled}}"
          scroll="{{scroll}}"
          color="{{color}}"
          direction="{{direction}}"
          justify="{{justify}}"
          activeLineMode="{{activeLineMode}}"
        >
          <dora-tab id="home-tab" key="home" title="Home" disabled="{{disabled}}" />
          <dora-tab id="profile-tab" key="profile" title="Profile" />
        </dora-tabs>
      `,
      {},
      {
        prefixCls: 'dora-tabs',
        defaultCurrent: 'home',
        current: 'home',
        controlled: false,
        scroll: false,
        color: 'positive',
        direction: 'horizontal',
        justify: 'space-around',
        activeLineMode: 'auto',
        disabled: false,
      },
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(100)

    const tabs = wrapper.querySelector('#tabs')
    const homeTab = wrapper.querySelector('#home-tab')
    const $tabs = getComponentInstance(tabs)
    const $homeTab = getTabInstance(homeTab)

    wrapper.setData({ scroll: true })
    await simulate.sleep(0)
    expect($tabs.$props.scroll).toBe(true)
    expect(tabs.querySelectorAll('.dora-tabs--scroll').length).toBe(1)

    wrapper.setData({ justify: 'flex-start' })
    await simulate.sleep(0)
    expect($tabs.$props.justify).toBe('flex-start')
    expect(tabs.querySelector('.dora-tabs__scroll-view').dom.getAttribute('style')).toContain('justify-content: flex-start')

    wrapper.setData({ direction: 'vertical' })
    await simulate.sleep(0)
    expect($tabs.$props.direction).toBe('vertical')
    expect(tabs.querySelectorAll('.dora-tabs--vertical').length).toBe(1)

    wrapper.setData({ controlled: true })
    await simulate.sleep(0)
    expect($tabs.$props.controlled).toBe(true)

    wrapper.setData({ current: 'profile' })
    await simulate.sleep(100)
    expect($tabs.$props.current).toBe('profile')

    wrapper.setData({ disabled: true })
    await simulate.sleep(0)
    expect($homeTab.$props.disabled).toBe(true)
    expect(homeTab.querySelectorAll('.dora-tabs__tab--disabled').length).toBe(1)

    wrapper.setData({ prefixCls: 'dora-tabs-custom' })
    await simulate.sleep(0)
    expect($tabs.$props.prefixCls).toBe('dora-tabs-custom')
    expect(tabs.querySelectorAll('.dora-tabs-custom').length).toBe(1)
  })
})
