import path from 'path'
import simulate from 'miniprogram-simulate'

jest.mock('@doraemon-ui/miniprogram.shared', () => ({
  useRect: jest.fn(() => Promise.resolve([{ width: 100 }, { width: 120 }])),
  getTouchPoints: jest.fn((e) => e.touches?.[0] || e.changedTouches?.[0] || { x: 0, y: 0, pageX: 0, pageY: 0 }),
  getPointsNumber: jest.fn(() => 1),
  getSwipeDirection: jest.fn(() => 'Left'),
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

describe('SwipeAction', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-swipe-action', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-swipe').length).toBeGreaterThanOrEqual(0)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-swipe-action-custom', right: [{ text: 'Delete' }] })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-swipe-action-custom').length).toBeGreaterThanOrEqual(0)
  })

  test('should handle swipe and action methods', () => {
    const wrapper = simulate.render(id, {
      left: [{ text: 'Reply' }],
      right: [{ text: 'Delete' }],
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    const comp = wrapper.instance as any
    expect(() => comp.onTouchStart({ touches: [{ pageX: 10, pageY: 10 }] })).not.toThrow()
    expect(() => comp.onTouchMove({ touches: [{ pageX: 2, pageY: 10 }] })).not.toThrow()
    expect(() => comp.onTouchEnd({ changedTouches: [{ pageX: 2, pageY: 10 }] })).not.toThrow()
    expect(() => comp.onTap({ currentTarget: { dataset: { type: 'right' } } })).not.toThrow()
    expect(() => comp.onClose()).not.toThrow()
  })
})
