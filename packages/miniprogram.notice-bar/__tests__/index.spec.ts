import path from 'path'
import simulate from 'miniprogram-simulate'

jest.mock('@doraemon-ui/miniprogram.shared', () => ({
  useRect: jest.fn(() => Promise.resolve({ width: 200 })),
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

describe('NoticeBar', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-notice-bar', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-notice-bar').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-notice-bar-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-notice-bar-custom').length).toBe(1)
  })

  test('should support animation and close action', async () => {
    type NoticeBarLike = {
      initAnimation: (force?: boolean) => void
      resetAnimation: () => void
      stopAnimation: () => void
      onAction: () => void
      onClick: () => void
    }
    const wrapper = simulate.render(id, {
      content: 'hello world',
      mode: 'closable',
      loop: true,
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)
    const comp = wrapper.instance as unknown as NoticeBarLike

    expect(() => comp.initAnimation(true)).not.toThrow()
    expect(() => comp.resetAnimation()).not.toThrow()
    expect(() => comp.stopAnimation()).not.toThrow()
    expect(() => comp.onClick()).not.toThrow()

    expect(() => comp.onAction()).not.toThrow()
  })
})
