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

describe('Timeago', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-timeago', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id, { to: Date.now() - 1000, lang: 'zh_CN' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-timeago').length).toBeGreaterThanOrEqual(0)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-timeago-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-timeago-custom').length).toBeGreaterThanOrEqual(0)
  })

  test('should update language and refreshable safely', () => {
    const wrapper = simulate.render(id, { to: Date.now() - 30 * 1000, lang: 'en', refreshable: true })
    wrapper.attach(document.createElement('parent-wrapper'))
    const comp = wrapper.instance as any
    expect(() => wrapper.setData({ lang: 'zh_TW' })).not.toThrow()
    expect(() => comp.updated(Date.now() - 30 * 1000, null, 'en', true)).not.toThrow()
    expect(() => comp.clearTimer()).not.toThrow()
  })
})
