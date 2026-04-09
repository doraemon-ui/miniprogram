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

describe('Select', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-select', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-select').length).toBeGreaterThanOrEqual(0)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-select-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-select-custom').length).toBeGreaterThanOrEqual(0)
  })

  test('should support open close and callbacks', () => {
    const onChange = jest.fn()
    const onConfirm = jest.fn()
    const onCancel = jest.fn()
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    const comp = wrapper.instance as any

    expect(() =>
      comp.open({
        value: ['001'],
        multiple: true,
        options: [
          { title: 'A', value: '001' },
          { title: 'B', value: '002' },
        ],
        onChange,
        onConfirm,
        onCancel,
      }),
    ).not.toThrow()

    expect(() => comp.onValueChange({ detail: { value: ['001', '002'] } })).not.toThrow()
    expect(() => comp.onConfirm({ detail: { value: ['001'] } })).not.toThrow()
    expect(() => comp.onCancel({ detail: { value: ['001'] } })).not.toThrow()
    expect(onChange).toHaveBeenCalled()
    expect(onConfirm).toHaveBeenCalled()
    expect(onCancel).toHaveBeenCalled()

    expect(() => comp.close()).not.toThrow()
  })
})
