import path from 'path'
import simulate from 'miniprogram-simulate'

jest.setTimeout(15000)

function mountTest(id: string | (() => string), defaultProps = {}) {
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

let tabsId: string

describe('Tabs', () => {
  beforeAll(() => {
    tabsId = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-tabs', { less: true })
  })

  mountTest(() => tabsId)

  test('should emit change when setActiveKey', async () => {
    const onChange = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-tabs': tabsId,
        },
        template: `
          <dora-tabs id="tabs" bind:change="onChange" />
        `,
        methods: {
          onChange,
        },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    const tabs = wrapper.querySelector('#tabs')
    tabs.instance.setActiveKey('tab2')
    await simulate.sleep(0)
    expect(onChange).toHaveBeenCalled()
    expect(onChange.mock.calls[0][0].detail.key).toBe('tab2')
  })

  test('should update children context and scroll masks', async () => {
    const wrapper = simulate.render(tabsId, {
      scroll: true,
      direction: 'horizontal',
      justify: 'flex-start',
      defaultCurrent: 'tab1',
    })
    wrapper.attach(document.createElement('parent-wrapper'))

    const child = {
      key: 'tab1',
      title: 'Tab 1',
      disabled: false,
      activeTabRef: jest.fn(async () => ({ activeTabLeft: 120, activeTabWidth: 40, activeTabTop: 0, activeTabHeight: 0 })),
    }

    ;(wrapper.instance as any).tabsContainerRef = async () => ({
      containerWidth: 200,
      containerHeight: 100,
      containerScrollWidth: 600,
      containerScrollHeight: 300,
      containerScrollLeft: 10,
      containerScrollTop: 0,
      containerOffsetX: 0,
      containerOffsetY: 0,
    })
    ;(wrapper.instance as any).setStyles('flex-end')
    void (wrapper.instance as any).setNextScroll(child)
    await simulate.sleep(0)
    ;(wrapper.instance as any).onScrollFix()
    await simulate.sleep(0)
    expect(typeof wrapper.data.showPrevMask).toBe('boolean')
    expect(typeof wrapper.data.showNextMask).toBe('boolean')

    wrapper.setData({ direction: 'vertical' })
    await simulate.sleep(0)
    ;(wrapper.instance as any).onScrollFix()
    await simulate.sleep(0)
    expect(typeof wrapper.data.showPrevMask).toBe('boolean')
    expect(typeof wrapper.data.showNextMask).toBe('boolean')
  })
})
