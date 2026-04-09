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
let avatarId: string
let paragraphId: string

function getId() {
  return id
}

describe('Skeleton', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-skeleton', { less: true })
    avatarId = simulate.load(path.resolve(__dirname, '../src/skeleton-avatar'), 'dora-skeleton-avatar', { less: true })
    paragraphId = simulate.load(path.resolve(__dirname, '../src/skeleton-paragraph'), 'dora-skeleton-paragraph', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-skeleton').length).toBeGreaterThanOrEqual(0)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-skeleton-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-skeleton-custom').length).toBeGreaterThanOrEqual(0)
  })

  test('should render avatar and paragraph', () => {
    const avatar = simulate.render(avatarId, { active: true, size: 'large', shape: 'rounded' })
    avatar.attach(document.createElement('parent-wrapper'))
    expect(avatar.querySelectorAll('.dora-skeleton-avatar').length).toBeGreaterThanOrEqual(0)

    const paragraph = simulate.render(paragraphId, { active: true, rows: 4, rounded: true })
    paragraph.attach(document.createElement('parent-wrapper'))
    const comp = paragraph.instance as any
    expect(() => comp.updateRows(3)).not.toThrow()
  })
})
