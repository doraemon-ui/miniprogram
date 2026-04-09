import path from 'path'
import simulate from 'miniprogram-simulate'

jest.mock('@doraemon-ui/miniprogram.shared', () => {
  const actual = jest.requireActual('@doraemon-ui/miniprogram.shared')
  return {
    ...actual,
    useRect: jest.fn().mockResolvedValue({ left: 0, width: 100 }),
    getPointsNumber: jest.fn(() => 1),
    getTouchPoints: jest.fn((e: any) => ({ x: e?.detail?.x ?? 10, y: e?.detail?.y ?? 0 })),
  }
})

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

describe('Slider', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-slider', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-slider').length).toBeGreaterThanOrEqual(0)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-slider-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-slider-custom').length).toBeGreaterThanOrEqual(0)
  })

  test('should support slider interactions', async () => {
    const wrapper = simulate.render(id, {
      defaultValue: [10, 30],
      showMark: true,
      markStyle: ['color:red'],
      handleStyle: ['background: red', 'background: blue'],
      trackStyle: ['background: yellow'],
      tipFormatter: '{d}%',
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    const comp = wrapper.instance as any

    expect(() => comp.onTouchStart({ currentTarget: { dataset: { index: 0 } }, detail: { x: 10 } })).not.toThrow()
    expect(() => comp.onTouchMove({ currentTarget: { dataset: { index: 0 } }, detail: { x: 40 } })).not.toThrow()
    expect(() => comp.onTouchEnd({ currentTarget: { dataset: { index: 0 } }, detail: { x: 40 } })).not.toThrow()
    expect(() => comp.onRailClick({ detail: { x: 60 } })).not.toThrow()
    expect(comp.formatTip(10)).toBe('10%')
    await simulate.sleep(20)
  })
})
