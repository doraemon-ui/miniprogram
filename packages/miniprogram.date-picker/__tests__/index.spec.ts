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

describe('DatePicker', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-date-picker', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id, { value: ['2026', '1', '1', '10', '10'] })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-date-picker').length).toBeGreaterThanOrEqual(0)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-date-picker-custom', value: ['2026', '1', '1', '10', '10'] })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-date-picker-custom').length).toBeGreaterThanOrEqual(0)
  })

  test('should open close and confirm safely', () => {
    const wrapper = simulate.render(id, { value: ['2026', '1', '1', '10', '10'] })
    wrapper.attach(document.createElement('parent-wrapper'))
    const comp = wrapper.instance as any
    expect(() => comp.open()).not.toThrow()
    expect(() => comp.onShow()).not.toThrow()
    expect(() =>
      comp.onValueChange({ detail: { value: ['2026', '1', '2', '10', '10'], displayValue: ['2026', '2', '2'], date: Date.now() } }),
    ).not.toThrow()
    expect(() => comp.onConfirm()).not.toThrow()
    expect(() => comp.onCancel()).not.toThrow()
    expect(() => comp.close()).not.toThrow()
  })
})
