import path from 'path'
import simulate from 'miniprogram-simulate'

jest.mock('@doraemon-ui/miniprogram.shared', () => ({
  useRectAll: jest.fn(() => Promise.resolve([[{ height: 20 }], [{ top: 10, height: 20, dataset: { index: 0, name: 'A', brief: 'A' } }]])),
  useRect: jest.fn(() => Promise.resolve({ top: 10, height: 20 })),
  vibrateShort: jest.fn(() => Promise.resolve()),
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

describe('Index', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-index', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-index').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-index-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-index-custom').length).toBe(1)
  })

  test('should update style and activate target', async () => {
    type IndexLike = {
      updateStyle: (height?: string | number) => void
      setActive: (current: number, name: string) => void
      getTargetFromPoint: (y: number) => unknown
      onTouchStart: (e: { target: { dataset: { index: number; name: string } } }) => void
      onTouchMove: (e: { changedTouches: Array<{ pageY: number }> }) => void
      onTouchEnd: () => void
      onScroll: (e: { detail: { scrollTop: number } }) => void
      checkActiveIndex: (scrollTop: number) => void
      updateChildren: () => void
      scrollTo: (index: number | string) => void
      getInternalHooks: (key: string) => unknown
      children: Array<{ index: number; name: string; top: number; height: number; brief: string }>
      points: Array<{ offsets: [number, number]; dataset: { index: number; name: string; brief: string } }>
    }

    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)
    const comp = wrapper.instance as unknown as IndexLike

    comp.updateStyle(480)
    wrapper.setData({
      children: [{ index: 0, name: 'A', top: 10, height: 20, brief: 'A' }],
      current: -1,
      currentName: '',
      currentBrief: '',
      colHight: 20,
      indicatorPosition: 'right',
      parentOffsetTop: 0,
    })
    comp.setActive(0, 'A')

    comp.points = [{ offsets: [10, 40], dataset: { index: 0, name: 'A', brief: 'A' } }]
    expect(comp.getTargetFromPoint(20)).toBeTruthy()

    comp.onTouchStart({ target: { dataset: { index: 0, name: 'A' } } })
    comp.onTouchMove({ changedTouches: [{ pageY: 20 }] })
    comp.onTouchEnd()
    comp.onScroll({ detail: { scrollTop: 12 } })
    comp.checkActiveIndex(15)
    comp.updateChildren()
    comp.scrollTo('A')
    expect(comp.getInternalHooks('INDEX_HOOK_MARK')).toBeTruthy()
    await simulate.sleep(0)
  })
})
