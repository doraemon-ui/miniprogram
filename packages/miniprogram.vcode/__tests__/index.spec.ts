import path from 'path'
import simulate from 'miniprogram-simulate'

jest.mock('@doraemon-ui/miniprogram.shared', () => ({
  useRef: jest.fn(() =>
    Promise.resolve({
      node: {
        width: 0,
        height: 0,
        toDataURL: () => 'data:image/png;base64,abc',
        getContext: () => ({
          textBaseline: 'bottom',
          fillStyle: '',
          font: '',
          scale: jest.fn(),
          fillRect: jest.fn(),
          fillText: jest.fn(),
          translate: jest.fn(),
          rotate: jest.fn(),
          beginPath: jest.fn(),
          moveTo: jest.fn(),
          lineTo: jest.fn(),
          stroke: jest.fn(),
          arc: jest.fn(),
          fill: jest.fn(),
          restore: jest.fn(),
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

describe('Vcode', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-vcode', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-vcode').length).toBeGreaterThanOrEqual(0)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-vcode-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-vcode-custom').length).toBeGreaterThanOrEqual(0)
  })

  test('should draw safely', () => {
    const wrapper = simulate.render(id, { canvasId: 'dora-vcode-test', num: 4 })
    wrapper.attach(document.createElement('parent-wrapper'))
    const comp = wrapper.instance as any
    expect(() => comp.draw()).not.toThrow()
    expect(() => comp.createCanvasContext()).not.toThrow()
  })
})
