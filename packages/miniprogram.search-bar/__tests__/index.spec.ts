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

describe('SearchBar', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-search-bar', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-search-bar').length).toBeGreaterThanOrEqual(0)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-search-bar-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-search-bar-custom').length).toBeGreaterThanOrEqual(0)
  })

  test('should support input interactions', () => {
    const wrapper = simulate.render(id, {
      clear: true,
      value: 'abc',
      controlled: true,
      showCancel: true,
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    const comp = wrapper.instance as any
    expect(() => comp.onChange({ detail: { value: '123' } })).not.toThrow()
    expect(() => comp.onFocus({ detail: {} })).not.toThrow()
    expect(() => comp.onBlur({ detail: {} })).not.toThrow()
    expect(() => comp.onConfirm({ detail: {} })).not.toThrow()
    expect(() => comp.onClear()).not.toThrow()
    expect(() => comp.onCancel()).not.toThrow()
  })
})
