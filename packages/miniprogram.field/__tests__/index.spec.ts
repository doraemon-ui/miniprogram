import path from 'path'
import simulate from 'miniprogram-simulate'

jest.mock('@doraemon-ui/miniprogram.shared', () => ({
  useRect: jest.fn(() => Promise.resolve({ top: 10, left: 10, width: 100, height: 30 })),
}))

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

describe('Field', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-field', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-field').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-field-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-field-custom').length).toBe(1)
  })

  test('should support popover toggle', async () => {
    type FieldLike = {
      setPopoverVisible: () => void
      onPopoverChange: (e: { detail: { visible: boolean } }) => void
    }
    const wrapper = simulate.render(id, { label: 'foo', help: 'bar' })
    wrapper.attach(document.createElement('parent-wrapper'))
    const comp = wrapper.instance as unknown as FieldLike
    expect(() => comp.setPopoverVisible()).not.toThrow()
    await simulate.sleep(0)
    expect(() => comp.onPopoverChange({ detail: { visible: false } })).not.toThrow()
  })
})
