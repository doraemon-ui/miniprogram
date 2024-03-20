import path from 'path'
import simulate from 'miniprogram-simulate'

function mountTest (id: string | (() => string) ,defaultProps = {}) {
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

describe('Icon', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-icon')
  })

  mountTest(getId)
  mountTest(getId, { type: 'alert' })
  mountTest(getId, { size: 24 })
  mountTest(getId, { size: '24' })
  mountTest(getId, { color: 'currentColor' })
})
