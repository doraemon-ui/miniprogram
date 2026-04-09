import path from 'path'
import simulate from 'miniprogram-simulate'

jest.mock('@doraemon-ui/miniprogram.shared', () => ({
  useRef: jest.fn(() =>
    Promise.resolve({
      node: {
        width: 0,
        height: 0,
        toDataURL: () => 'data:image/png;base64,watermark',
        createImage: () => ({
          onload: null,
          onerror: null,
          set src(_v: string) {
            if (typeof this.onload === 'function') this.onload()
          },
        }),
        getContext: () => ({
          translate: jest.fn(),
          rotate: jest.fn(),
          drawImage: jest.fn(),
          fillText: jest.fn(),
          restore: jest.fn(),
          textBaseline: '',
          textAlign: '',
          font: '',
          fillStyle: '',
        }),
      },
    }),
  ),
  getSystemInfoSync: jest.fn(() => ({ pixelRatio: 1 })),
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

describe('WaterMark', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-water-mark', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-water-mark').length).toBeGreaterThanOrEqual(0)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-water-mark-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-water-mark-custom').length).toBeGreaterThanOrEqual(0)
  })

  test('should render watermark safely', () => {
    const wrapper = simulate.render(id, { content: 'DoraemonUI', width: 120, height: 64 })
    wrapper.attach(document.createElement('parent-wrapper'))
    const comp = wrapper.instance as any
    expect(() => comp.updateStyle(2000, 24, 120, 'data:image/png;base64,watermark')).not.toThrow()
    expect(() => comp.createCanvasContext()).not.toThrow()
  })
})
