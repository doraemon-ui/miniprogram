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

describe('Loading', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-loading', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-loading').length).toBeGreaterThanOrEqual(0)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    type LoadingLike = { show: (opts?: Record<string, unknown>) => void }
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    const comp = wrapper.instance as unknown as LoadingLike
    comp.show({ prefixCls: 'dora-loading-custom' })
    expect(wrapper.querySelectorAll('.dora-loading-custom').length).toBeGreaterThanOrEqual(0)
  })

  test('should support show and hide methods', async () => {
    type LoadingLike = {
      show: (opts?: Record<string, unknown>) => void
      hide: () => void
    }
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)
    const comp = wrapper.instance as unknown as LoadingLike
    comp.show({
      text: '测试加载',
      classNames: 'dora-animate--fadeIn',
      mask: false,
    })
    expect(() => comp.show({ text: '测试加载' })).not.toThrow()
    expect(() => comp.hide()).not.toThrow()
  })
})
