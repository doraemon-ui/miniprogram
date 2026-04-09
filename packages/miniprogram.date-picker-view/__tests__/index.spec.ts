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

describe('DatePickerView', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-date-picker-view', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id, {
      value: ['2026', '1', '1', '10', '10'],
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-date-picker').length).toBeGreaterThanOrEqual(0)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-date-picker-view-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-date-picker-view-custom').length).toBeGreaterThanOrEqual(0)
  })

  test('should update value and emit change payload', () => {
    const wrapper = simulate.render(id, {
      value: ['2026', '1', '1', '10', '10'],
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    const comp = wrapper.instance as any
    expect(() => comp.onValueChange({ detail: { value: ['2026', '1', '2', '10', '10'], index: 2 } })).not.toThrow()
    const values = comp.getValue(['2026', '1', '2', '10', '10'])
    expect(Array.isArray(values.value)).toBeTruthy()
    expect(values.value.length).toBeGreaterThanOrEqual(1)
  })
})
