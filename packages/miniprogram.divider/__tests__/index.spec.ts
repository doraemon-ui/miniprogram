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

describe('Divider', () => {
  jest.setTimeout(15000)

  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-divider', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-divider').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-divider-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-divider-custom').length).toBe(1)
  })

  test('should support dashed', () => {
    const wrapper = simulate.render(id, { dashed: true })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-divider--dashed').length).toBe(1)
  })

  test('should hide text when showText=false', () => {
    const wrapper = simulate.render(id, { showText: false, text: 'Wux Weapp' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-divider__text').length).toBe(0)
    expect(wrapper.querySelectorAll('.dora-divider--text').length).toBe(0)
  })

  test('should support position=left when showText=true', () => {
    const wrapper = simulate.render(id, { showText: true, position: 'left', text: 'Wux Weapp' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-divider--text-left').length).toBe(1)
  })

  test('should support direction=vertical', () => {
    const wrapper = simulate.render(id, { direction: 'vertical', showText: false })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-divider--vertical').length).toBe(1)
  })
})
