import path from 'path'
import simulate from 'miniprogram-simulate'

type CascaderComponentLike = {
  onChange: (e: { detail: { value: string[]; options: unknown[]; done: boolean } }) => void
  onConfirm: () => void
  onCancel: () => void
  onClosed: () => void
  close: () => void
  getValue: (value?: string[]) => { value: string[]; options: unknown[]; done: boolean } | null

  cascaderView: { getValue: (activeValue?: string[]) => { value: string[]; options: unknown[]; done: boolean } } | null
  shouldRender: boolean
  innerValue: string[]
  activeValue: string[]
}

type RenderProxyLike = {
  triggerEvent: (event: string, detail?: unknown) => void
  $component: CascaderComponentLike
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

describe('Cascader', () => {
  jest.setTimeout(15000)

  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-cascader', { less: true })
  })

  mountTest(getId)

  test('mount correctly (visible=true)', async () => {
    const wrapper = simulate.render(id, {
      visible: true,
      title: '所在地区',
      options: [
        {
          label: 'Zhejiang',
          value: 'zj',
          children: [{ label: 'Hangzhou', value: 'hz' }],
        },
      ],
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)
    expect(wrapper.data.shouldRender).toBe(true)
    expect(wrapper.querySelectorAll('.dora-cascader').length).toBe(1)
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { visible: true, prefixCls: 'dora-cascader-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-cascader-custom').length).toBe(1)
  })

  test('should set shouldRender=true when visible changes to true', async () => {
    const wrapper = simulate.render(id, { visible: false })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)
    expect(wrapper.data.shouldRender).toBe(false)

    wrapper.setData({ visible: true })
    await simulate.sleep(0)
    expect(wrapper.data.shouldRender).toBe(true)
  })

  test('should sync activeValue/innerValue when controlled=true and value changes', async () => {
    const wrapper = simulate.render(id, { controlled: true, value: ['a'], visible: true })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)
    expect(wrapper.data.activeValue).toEqual(['a'])
    expect(wrapper.data.innerValue).toEqual(['a'])

    wrapper.setData({ value: ['b'] })
    await simulate.sleep(0)
    expect(wrapper.data.activeValue).toEqual(['b'])
    expect(wrapper.data.innerValue).toEqual(['b'])
  })

  test('onChange should emit change only when visible=true', async () => {
    const wrapper = simulate.render(id, { visible: true })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)

    const renderProxy = wrapper.instance as unknown as RenderProxyLike
    const triggerEvent = jest.spyOn(renderProxy, 'triggerEvent')
    renderProxy.$component.onChange({ detail: { value: ['x'], options: [], done: false } })
    await simulate.sleep(0)

    expect(wrapper.data.innerValue).toEqual(['x'])
    expect(triggerEvent).toHaveBeenCalledWith('change', { value: ['x'], options: [], done: false })

    triggerEvent.mockClear()
    wrapper.setData({ visible: false })
    await simulate.sleep(0)
    renderProxy.$component.onChange({ detail: { value: ['y'], options: [], done: false } })
    await simulate.sleep(0)
    expect(wrapper.data.innerValue).toEqual(['y'])
    expect(triggerEvent).not.toHaveBeenCalled()
  })

  test('onConfirm should emit confirm+close and update activeValue when uncontrolled', async () => {
    const wrapper = simulate.render(id, { visible: true, controlled: false })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)

    const renderProxy = wrapper.instance as unknown as RenderProxyLike
    const triggerEvent = jest.spyOn(renderProxy, 'triggerEvent')
    renderProxy.$component.cascaderView = {
      getValue: () => ({ value: ['x'], options: [{ value: 'x', label: 'X' }], done: true }),
    }
    wrapper.setData({ innerValue: ['x'] })
    await simulate.sleep(0)

    renderProxy.$component.onConfirm()
    await simulate.sleep(0)

    expect(wrapper.data.activeValue).toEqual(['x'])
    const calledEvents = (triggerEvent.mock.calls as Array<[string, unknown]>).map((c) => c[0])
    expect(calledEvents).toContain('confirm')
    expect(calledEvents).toContain('close')
  })

  test('onCancel should emit cancel+close', async () => {
    const wrapper = simulate.render(id, { visible: true })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)

    const renderProxy = wrapper.instance as unknown as RenderProxyLike
    const triggerEvent = jest.spyOn(renderProxy, 'triggerEvent')
    renderProxy.$component.cascaderView = {
      getValue: () => ({ value: ['a'], options: [{ value: 'a', label: 'A' }], done: true }),
    }
    wrapper.setData({ activeValue: ['a'], innerValue: ['b'] })
    await simulate.sleep(0)

    renderProxy.$component.onCancel()
    await simulate.sleep(0)

    const calledEvents = (triggerEvent.mock.calls as Array<[string, unknown]>).map((c) => c[0])
    expect(calledEvents).toContain('cancel')
    expect(calledEvents).toContain('close')
    expect(wrapper.data.activeValue).toEqual(['a'])
  })

  test('onClosed should reset innerValue and shouldRender', async () => {
    const wrapper = simulate.render(id, { visible: true })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)

    const renderProxy = wrapper.instance as unknown as RenderProxyLike
    wrapper.setData({ shouldRender: true, activeValue: ['a'], innerValue: ['b'] })
    await simulate.sleep(0)

    renderProxy.$component.onClosed()
    await simulate.sleep(0)

    expect(wrapper.data.innerValue).toEqual(['a'])
    expect(wrapper.data.shouldRender).toBe(false)
  })
})
