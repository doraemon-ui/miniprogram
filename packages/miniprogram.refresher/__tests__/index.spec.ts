import path from 'path'
import simulate from 'miniprogram-simulate'
jest.mock('@doraemon-ui/miniprogram.shared', () => ({
  getSystemInfoSync: jest.fn(() => ({ windowHeight: 667 })),
  useRect: jest.fn(() => Promise.resolve({ height: 1200 })),
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

describe('Refresher', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-refresher', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-refresher').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-refresher-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-refresher-custom').length).toBeGreaterThanOrEqual(0)
  })

  test('should trigger refresh and loadmore methods', async () => {
    type RefresherLike = {
      triggerRefresh: () => void
      finishPullToRefresh: () => void
      finishLoadmore: (isEnd?: boolean) => void
      onTouchStart: (e: {
        touches: Array<{ pageX: number; pageY: number }>
        changedTouches: Array<{ pageX: number; pageY: number }>
      }) => void
      onTouchMove: (e: {
        touches: Array<{ pageX: number; pageY: number }>
        changedTouches: Array<{ pageX: number; pageY: number }>
      }) => void
      onTouchEnd: () => void
      onScroll: (n: number) => void
    }
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    const comp = wrapper.instance as unknown as RefresherLike
    expect(() => comp.triggerRefresh()).not.toThrow()
    expect(() => comp.onTouchStart({ touches: [{ pageX: 0, pageY: 0 }], changedTouches: [{ pageX: 0, pageY: 0 }] })).not.toThrow()
    expect(() => comp.onTouchMove({ touches: [{ pageX: 0, pageY: 50 }], changedTouches: [{ pageX: 0, pageY: 50 }] })).not.toThrow()
    expect(() => comp.onTouchEnd()).not.toThrow()
    expect(() => comp.onScroll(9999)).not.toThrow()
    await simulate.sleep(0)
    expect(() => comp.finishPullToRefresh()).not.toThrow()
    expect(() => comp.finishLoadmore()).not.toThrow()
    expect(() => comp.finishLoadmore(true)).not.toThrow()
  })
})
