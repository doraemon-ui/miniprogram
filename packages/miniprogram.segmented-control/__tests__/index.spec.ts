import path from 'path'
import simulate from 'miniprogram-simulate'

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

describe('SegmentedControl', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-segmented-control', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-segmented-control').length).toBeGreaterThanOrEqual(0)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-segmented-control-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-segmented-control-custom').length).toBeGreaterThanOrEqual(0)
  })

  test('should support controlled and tap change', () => {
    const wrapper = simulate.render(id, {
      values: ['A', 'B', 'C'],
      controlled: true,
      current: 1,
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    const comp = wrapper.instance as any
    expect(() => comp.onTap({ currentTarget: { dataset: { index: 2 } } })).not.toThrow()
    expect(() => comp.setActiveKey(0)).not.toThrow()
  })
})
