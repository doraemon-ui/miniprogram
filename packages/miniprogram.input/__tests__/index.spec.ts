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

describe('Input', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-input', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-input').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-input-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-input-custom').length).toBe(1)
  })

  test('should support uncontrolled value and clear', async () => {
    type InputLike = {
      onChange: (e: { detail: { value: string } }) => void
      onClear: () => void
    }
    const wrapper = simulate.render(id, { defaultValue: '1024', clear: true })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)

    const comp = wrapper.instance as unknown as InputLike
    expect(() => comp.onChange({ detail: { value: '2048' } })).not.toThrow()
    expect(() => comp.onClear()).not.toThrow()
    expect(wrapper.querySelectorAll('.dora-input').length).toBe(1)
  })

  test('should support controlled mode and numeric bound', async () => {
    type InputLike = {
      onChange: (e: { detail: { value: string } }) => void
      onBlur: (e: { detail: { value: string } }) => void
      onInternalVisibleChange: () => void
      checkValue: () => void
    }
    const wrapper = simulate.render(id, {
      controlled: true,
      value: '10',
      type: 'number',
      min: 1,
      max: 11,
      password: true,
      visibilityToggle: true,
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)

    const comp = wrapper.instance as unknown as InputLike
    expect(() => comp.onChange({ detail: { value: '999' } })).not.toThrow()
    expect(() => comp.checkValue()).not.toThrow()
    expect(() => comp.onInternalVisibleChange()).not.toThrow()

    jest.useFakeTimers()
    comp.onBlur({ detail: { value: '999' } })
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })
})
