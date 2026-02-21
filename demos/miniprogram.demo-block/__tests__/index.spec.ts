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

describe('DemoBlock', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-demo-block')
  })

  mountTest(getId)
  mountTest(getId, { direction: 'column' })
  mountTest(getId, { bordered: true })
  mountTest(getId, { padding: '0' })
  mountTest(getId, { background: '0 0' })
  mountTest(getId, { direction: 'column' })
  mountTest(getId, { align: 'center' })
})
