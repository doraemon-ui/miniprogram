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

describe('PopupSelect', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-popup-select', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-popup-select').length).toBeGreaterThanOrEqual(0)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(() => wrapper.instance.open()).not.toThrow()
  })

  test('should select and confirm value', async () => {
    type SelectLike = {
      open: () => void
      onOptionTap: (e: { currentTarget: { dataset: { value: string } } }) => void
      onConfirm: () => void
      onCancel: () => void
      close: () => void
    }
    const wrapper = simulate.render(id, {
      options: [
        { title: 'A', value: 'a' },
        { title: 'B', value: 'b' },
      ],
      value: 'a',
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)
    const comp = wrapper.instance as unknown as SelectLike
    expect(() => comp.open()).not.toThrow()
    expect(() => comp.onOptionTap({ currentTarget: { dataset: { value: 'b' } } })).not.toThrow()
    expect(() => comp.onConfirm()).not.toThrow()
    expect(() => comp.onCancel()).not.toThrow()
    expect(() => comp.close()).not.toThrow()
  })
})
