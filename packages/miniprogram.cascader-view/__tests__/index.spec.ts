import path from 'path'
import simulate from 'miniprogram-simulate'

type CascaderViewComponentLike = {
  onTabsChange: (e: { detail: { key: string } }) => void
  onChange: (currentOptions: { value?: string; label?: string; isLeaf?: boolean }, activeValue: string[]) => void
}

type RenderProxyLike = {
  triggerEvent: (event: string, detail?: unknown) => void
  $component: CascaderViewComponentLike
}

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

let id: string

function getId() {
  return id
}

describe('CascaderView', () => {
  jest.setTimeout(15000)

  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-cascader-view', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id, {
      options: [
        {
          label: 'Zhejiang',
          value: 'zj',
          children: [{ label: 'Hangzhou', value: 'hz' }],
        },
      ],
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-cascader-view').length).toBe(1)
    expect(wrapper.data.showOptions.length).toBeGreaterThan(0)
    expect(wrapper.data.activeOptions.length).toBeGreaterThan(0)
  })

  test('should update scrollViewStyle when height changes', async () => {
    const wrapper = simulate.render(id, {
      height: '200px',
      options: [],
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)
    expect(wrapper.data.scrollViewStyle).toContain('200px')

    wrapper.setData({ height: '300px' })
    await simulate.sleep(0)
    expect(wrapper.data.scrollViewStyle).toContain('300px')
  })

  test('should trigger tabsChange when onTabsChange called', async () => {
    const wrapper = simulate.render(id, { options: [] })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)

    const renderProxy = wrapper.instance as unknown as RenderProxyLike
    const triggerEvent = jest.spyOn(renderProxy, 'triggerEvent')
    renderProxy.$component.onTabsChange({ detail: { key: '1' } })
    await simulate.sleep(0)

    expect(wrapper.data.activeIndex).toBe(1)
    expect(wrapper.data.bodyStyle).toContain('translate')
    expect(triggerEvent).toHaveBeenCalledWith('tabsChange', { index: 1 })
  })

  test('should emit load when async option selected', async () => {
    const wrapper = simulate.render(id, {
      controlled: true,
      value: [],
      options: [{ value: 'beijing', label: '北京', isLeaf: false }],
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)

    const renderProxy = wrapper.instance as unknown as RenderProxyLike
    const triggerEvent = jest.spyOn(renderProxy, 'triggerEvent')
    renderProxy.$component.onChange({ value: 'beijing', label: '北京', isLeaf: false }, ['beijing'])
    await simulate.sleep(0)

    const calledEvents = (triggerEvent.mock.calls as Array<[string, unknown]>).map((c) => c[0])
    expect(calledEvents).toContain('change')
    expect(calledEvents).toContain('load')
  })
})
