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

describe('Navbar', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-navbar', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-navbar').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-navbar-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-navbar-custom').length).toBe(1)
  })

  test('should emit click with type', async () => {
    type NavbarLike = {
      onClick: (e: { currentTarget: { dataset: { type: 'left' | 'right' } } }) => void
    }
    const wrapper = simulate.render(id, {
      title: 'NavBar',
      leftText: 'Back',
      rightText: 'Click me!',
      theme: 'dark',
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)
    const comp = wrapper.instance as unknown as NavbarLike
    expect(wrapper.querySelectorAll('.dora-navbar--dark').length).toBeGreaterThanOrEqual(1)
    expect(() => comp.onClick({ currentTarget: { dataset: { type: 'right' } } })).not.toThrow()
  })
})
