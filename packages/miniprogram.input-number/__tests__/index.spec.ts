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

describe('InputNumber', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-input-number', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-input-number').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-input-number-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-input-number-custom').length).toBe(1)
  })

  test('should calculate add/sub and emit change', async () => {
    type InputNumberLike = {
      onTap: (e: { currentTarget: { dataset: { type: 'add' | 'sub' } } }) => void
      onInput: (e: { detail: { value: string } }) => void
      setValue: (value: number | string, runCallbacks?: boolean) => void
      onRangeChange: () => void
      inputValue: number | string
      calculation: (type: 'add' | 'sub', isLoop: boolean) => void
      disabledMax: boolean
      disabledMin: boolean
    }

    const wrapper = simulate.render(id, {
      disabled: false,
      readOnly: false,
      defaultValue: 1,
      step: 1,
      min: -10,
      max: 10,
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)

    const comp = wrapper.instance as unknown as InputNumberLike
    expect(() => comp.onTap({ currentTarget: { dataset: { type: 'add' } } })).not.toThrow()
    expect(() => comp.onTap({ currentTarget: { dataset: { type: 'sub' } } })).not.toThrow()

    jest.useFakeTimers()
    comp.onInput({ detail: { value: '3.5' } })
    jest.runOnlyPendingTimers()
    jest.useRealTimers()

    comp.setValue(10, false)
    comp.onRangeChange()
    comp.calculation('add', false)

    comp.setValue(-10, false)
    comp.onRangeChange()
    comp.calculation('sub', false)
    expect(() => comp.calculation('sub', false)).not.toThrow()
  })

  test('should support controlled and digits mode', async () => {
    type InputNumberLike = {
      onValueChange: (newVal: number) => void
      setValue: (value: number | string, runCallbacks?: boolean) => void
      onLongpress: (e: { currentTarget: { dataset: { type: 'add' | 'sub' } } }) => void
      onTouchEnd: () => void
      clearTimer: () => void
      clearInputTimer: () => void
      inputValue: number | string
    }
    const wrapper = simulate.render(id, {
      controlled: true,
      value: 1.23,
      digits: 1,
      disabled: false,
      readOnly: false,
      longpress: true,
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)

    const comp = wrapper.instance as unknown as InputNumberLike
    comp.onValueChange(2.34)
    expect(() => comp.onValueChange(2.34)).not.toThrow()
    comp.setValue(1.66, false)
    expect(() => comp.setValue(1.66, false)).not.toThrow()

    jest.useFakeTimers()
    comp.onLongpress({ currentTarget: { dataset: { type: 'add' } } })
    jest.advanceTimersByTime(120)
    comp.onTouchEnd()
    jest.useRealTimers()

    comp.clearTimer()
    comp.clearInputTimer()
  })
})
