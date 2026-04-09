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

describe('Keyboard', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-keyboard', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-keyboard').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-keyboard-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-keyboard-custom').length).toBe(1)
  })

  test('should show/hide and input value', async () => {
    type KeyboardLike = {
      show: (opts?: Record<string, unknown>) => () => void
      hide: () => void
      increase: (e: { currentTarget: { dataset: { value: number } } }) => void
      decrease: () => void
      updateValue: (value: string) => void
    }
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)
    const comp = wrapper.instance as unknown as KeyboardLike

    const onChange = jest.fn()
    const hide = comp.show({ maxlength: 4, showCancel: true, onChange })
    expect(typeof hide).toBe('function')

    comp.increase({ currentTarget: { dataset: { value: 1 } } })
    comp.increase({ currentTarget: { dataset: { value: 2 } } })

    comp.decrease()

    comp.updateValue('1234')
    expect(onChange).toHaveBeenNthCalledWith(1, '1')
    expect(onChange).toHaveBeenNthCalledWith(2, '12')
    expect(onChange).toHaveBeenNthCalledWith(3, '1')
    expect(onChange).toHaveBeenNthCalledWith(4, '1234')

    expect(() => hide()).not.toThrow()
    expect(() => comp.hide()).not.toThrow()
  })

  test('should close when callback returns promise', async () => {
    type KeyboardLike = {
      show: (opts?: Record<string, unknown>) => () => void
      updateValue: (value: string) => void
    }
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)
    const comp = wrapper.instance as unknown as KeyboardLike

    const callback = jest.fn(() => Promise.resolve(true))
    comp.show({
      maxlength: 2,
      callback,
    })
    comp.updateValue('12')
    await simulate.sleep(0)
    expect(callback).toHaveBeenCalledWith('12')
  })
})
