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

describe('Progress', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-progress', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-progress').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-progress-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-progress-custom').length).toBe(1)
  })

  test('should update style safely', () => {
    type ProgressLike = {
      updateStyle: () => void
      onBarStyleChange: (v: string | Record<string, unknown>) => void
    }
    const wrapper = simulate.render(id, {
      percent: 50,
      status: 'progress',
      showInfo: true,
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    const comp = wrapper.instance as unknown as ProgressLike
    expect(() => comp.onBarStyleChange('background-color: #5cb85c')).not.toThrow()
    expect(() => comp.updateStyle()).not.toThrow()
  })
})
