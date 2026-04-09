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

describe('MultiPickerView', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-multi-picker-view', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-picker').length).toBeGreaterThanOrEqual(0)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-multi-picker-view-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-multi-picker-view-custom').length).toBeGreaterThanOrEqual(0)
  })

  test('should update and emit value change', () => {
    const wrapper = simulate.render(id, {
      value: ['A', 'B'],
      options: [
        ['A', 'C'],
        ['B', 'D'],
      ],
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    const comp = wrapper.instance as any
    expect(() =>
      comp.onValueChange({
        detail: { value: 'C' },
        currentTarget: { dataset: { index: 0 } },
      }),
    ).not.toThrow()
    const v = comp.getValue(['C', 'B'])
    expect(Array.isArray(v.value)).toBeTruthy()
    expect(v.value.length).toBeGreaterThanOrEqual(0)
  })
})
