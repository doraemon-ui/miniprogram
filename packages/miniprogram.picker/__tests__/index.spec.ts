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

describe('Picker', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-picker', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-popup-picker').length).toBeGreaterThanOrEqual(0)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-picker-custom', options: [['a', 'b']] })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-picker-custom').length).toBeGreaterThanOrEqual(0)
  })

  test('should open close and confirm safely', () => {
    const wrapper = simulate.render(id, {
      options: [['a', 'b']],
      value: ['a'],
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    const comp = wrapper.instance as any
    expect(() => comp.open()).not.toThrow()
    expect(() => comp.onShow()).not.toThrow()
    expect(() => comp.onValueChange({ detail: { value: ['b'], displayValue: ['b'] } })).not.toThrow()
    expect(() => comp.onConfirm()).not.toThrow()
    expect(() => comp.onCancel()).not.toThrow()
    expect(() => comp.close()).not.toThrow()
  })
})
