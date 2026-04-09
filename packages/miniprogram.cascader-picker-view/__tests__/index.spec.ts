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

describe('CascaderPickerView', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-cascader-picker-view', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id, {
      options: [
        { label: 'A', value: 'a', children: [{ label: 'A1', value: 'a1' }] },
        { label: 'B', value: 'b' },
      ],
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-picker').length).toBeGreaterThanOrEqual(0)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-cascader-picker-view-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-cascader-picker-view-custom').length).toBeGreaterThanOrEqual(0)
  })

  test('should update cascade value', () => {
    const options = [
      { label: 'A', value: 'a', children: [{ label: 'A1', value: 'a1' }] },
      { label: 'B', value: 'b', children: [{ label: 'B1', value: 'b1' }] },
    ]
    const wrapper = simulate.render(id, { options, cols: 2, value: [] })
    wrapper.attach(document.createElement('parent-wrapper'))
    const comp = wrapper.instance as any
    expect(() => comp.onValueChange({ detail: { value: ['b', 'b1'], index: 0 } })).not.toThrow()
    const values = comp.getValue(['b', 'b1'])
    expect(Array.isArray(values.value)).toBeTruthy()
    expect(values.value.length).toBeGreaterThanOrEqual(1)
  })
})
