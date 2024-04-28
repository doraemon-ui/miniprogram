import path from 'path'
import simulate from 'miniprogram-simulate'

function mountTest (id: string | (() => string), defaultProps = {}) {
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

function getId () {
  return id
}

describe('Dialog', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-dialog', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-dialog').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-dialog-box' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-dialog-box').length).toBe(1)
  })

  test('should support to change visible', () => {
    const wrapper = simulate.render(id, { visible: false })
    wrapper.attach(document.createElement('parent-wrapper'))
    const $comp = wrapper.instance.$component as any
    expect($comp.visible).toBe(false)
    $comp.visible = true
    expect($comp.visible).toBe(true)
  })

  test('should support to change zIndex', () => {
    const wrapper = simulate.render(id, { zIndex: 9999 })
    wrapper.attach(document.createElement('parent-wrapper'))
    const $comp = wrapper.instance.$component as any
    expect($comp.zIndex).toBe(9999)
  })
})
