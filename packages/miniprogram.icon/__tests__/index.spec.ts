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

describe('Icon', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-icon', { less: true })
  })

  mountTest(getId)
  mountTest(getId, { type: 'alert' })
  mountTest(getId, { size: 24 })
  mountTest(getId, { size: '24' })
  mountTest(getId, { color: 'currentColor' })
  mountTest(getId, { hidden: true })

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.doraicons').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })
})
