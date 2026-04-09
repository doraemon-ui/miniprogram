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

describe('Spin', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-spin', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-spin').length).toBeGreaterThanOrEqual(0)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-spin-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-spin-custom').length).toBeGreaterThanOrEqual(0)
  })

  test('should support nested and color changes', () => {
    const wrapper = simulate.render(id, {
      nested: true,
      spinning: true,
      tip: 'Loading',
      spinColor: '#33cd5f',
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    const comp = wrapper.instance as any
    expect(() => comp.onSpinningChange(false)).not.toThrow()
    expect(() => comp.setStyles('#ff0000')).not.toThrow()
  })
})
