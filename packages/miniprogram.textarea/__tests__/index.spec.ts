import path from 'path'
import simulate from 'miniprogram-simulate'
import * as shared from '@doraemon-ui/miniprogram.shared'

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

describe('Textarea', () => {
  beforeAll(() => {
    jest.spyOn(shared, 'useRect').mockResolvedValue({ width: 200, height: 40 } as any)
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-textarea', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-textarea').length).toBeGreaterThanOrEqual(0)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-textarea-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-textarea-custom').length).toBeGreaterThanOrEqual(0)
  })

  test('should handle input and clear safely', () => {
    const wrapper = simulate.render(id, { defaultValue: 'abc', clear: true })
    wrapper.attach(document.createElement('parent-wrapper'))
    const comp = wrapper.instance as any
    expect(() => comp.onChange({ detail: { value: 'abcd' } })).not.toThrow()
    expect(() => comp.onClear()).not.toThrow()
    expect(() => comp.onError()).not.toThrow()
  })

  test('should support controlled mode', () => {
    const wrapper = simulate.render(id, { controlled: true, value: 'x' })
    wrapper.attach(document.createElement('parent-wrapper'))
    const comp = wrapper.instance as any
    expect(() => wrapper.setData({ value: 'y' })).not.toThrow()
    expect(() => comp.onFocus({ detail: { value: 'y' } })).not.toThrow()
    expect(() => comp.onBlur({ detail: { value: 'y' } })).not.toThrow()
  })
})
