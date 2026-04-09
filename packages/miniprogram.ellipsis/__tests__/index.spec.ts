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

describe('Ellipsis', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-ellipsis', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-ellipsis').length).toBeGreaterThanOrEqual(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-ellipsis-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-ellipsis-custom').length).toBeGreaterThanOrEqual(1)
  })

  test('should ellipsis long text by direction', async () => {
    const longText = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    const wrapper = simulate.render(id, {
      content: longText,
      rows: 1,
      direction: 'end',
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)
    expect(wrapper.data.exceeded).toBe(true)
    expect(String(wrapper.data.ellipsised.leading)).toContain('...')

    wrapper.setData({ direction: 'start' })
    await simulate.sleep(0)
    expect(String(wrapper.data.ellipsised.tailing)).toContain('...')
  })

  test('should toggle expanded state', async () => {
    type EllipsisLike = {
      setExpanded: (e: { target: { dataset: { expanded: string } } }) => void
    }
    const wrapper = simulate.render(id, {
      content: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
      rows: 1,
      expandText: '展开',
      collapseText: '收起',
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)

    const comp = wrapper.instance as unknown as EllipsisLike
    comp.setExpanded({ target: { dataset: { expanded: '1' } } })
    await simulate.sleep(0)
    expect(wrapper.data.expanded).toBe(true)
  })
})
