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

describe('Media', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-media', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-media').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-media-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-media-custom').length).toBe(1)
  })

  test('should support media props', async () => {
    type MediaLike = {
      onThumbStyleChange: (v: string | Record<string, unknown>) => void
    }
    const wrapper = simulate.render(id, {
      thumb: 'http://cdn.skyvow.cn/logo.png',
      title: '标题一',
      label: '描述',
      align: 'flex-start',
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)
    expect(wrapper.querySelectorAll('.dora-media--align-flex-start').length).toBeGreaterThanOrEqual(1)
    const comp = wrapper.instance as unknown as MediaLike
    expect(() => comp.onThumbStyleChange({ borderRadius: '50%' })).not.toThrow()
    expect(() => comp.onThumbStyleChange('border-radius:50%;')).not.toThrow()
  })
})
