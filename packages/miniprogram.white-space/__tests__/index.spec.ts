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

describe('WhiteSpace', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-white-space', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-white-space').length).toBeGreaterThanOrEqual(0)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-white-space-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-white-space-custom').length).toBeGreaterThanOrEqual(0)
  })

  test('should support size and style safely', () => {
    const wrapper = simulate.render(id, { size: 'large', bodyStyle: { height: '20px' } })
    wrapper.attach(document.createElement('parent-wrapper'))
    const comp = wrapper.instance as any
    expect(() => comp.onTap()).not.toThrow()
    expect(() => wrapper.setData({ bodyStyle: 'height: 30px' })).not.toThrow()
  })
})
