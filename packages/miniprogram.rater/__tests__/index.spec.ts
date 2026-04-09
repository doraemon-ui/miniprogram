import path from 'path'
import simulate from 'miniprogram-simulate'
jest.mock('@doraemon-ui/miniprogram.shared', () => ({
  useRectAll: jest.fn(() =>
    Promise.resolve([
      { left: 0, width: 20 },
      { left: 20, width: 20 },
      { left: 40, width: 20 },
      { left: 60, width: 20 },
      { left: 80, width: 20 },
    ]),
  ),
}))

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

describe('Rater', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-rater', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-rater').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-rater-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-rater-custom').length).toBe(1)
  })

  test('should support tap and touch move', async () => {
    type RaterLike = {
      onTap: (e: { currentTarget: { dataset: { index: number } }; detail: { x: number } }) => void
      onTouchMove: (e: { changedTouches: Array<{ pageX: number }> }) => void
      setValue: (v: number) => void
      updateHalfStarValue: (i: number, x: number, cb: (v: number) => void) => void
    }
    const wrapper = simulate.render(id, {
      allowHalf: true,
      allowTouchMove: true,
      defaultValue: 2,
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)
    const comp = wrapper.instance as unknown as RaterLike
    expect(() => comp.setValue(3)).not.toThrow()
    expect(() => comp.onTap({ currentTarget: { dataset: { index: 2 } }, detail: { x: 45 } })).not.toThrow()
    expect(() => comp.onTouchMove({ changedTouches: [{ pageX: 30 }] })).not.toThrow()
    expect(() => comp.updateHalfStarValue(0, 5, () => {})).not.toThrow()
  })
})
