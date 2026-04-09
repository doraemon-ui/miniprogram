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

describe('Landscape', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-landscape', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-landscape').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-landscape-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-landscape-custom').length).toBe(1)
  })

  test('should emit close event with next visibility', async () => {
    type LandscapeLike = {
      onClose: () => void
      onMaskChange: (mask: boolean) => void
    }
    const wrapper = simulate.render(id, { visible: true })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)
    const comp = wrapper.instance as unknown as LandscapeLike

    expect(() => comp.onMaskChange(false)).not.toThrow()
    expect(() => comp.onClose()).not.toThrow()
  })
})
