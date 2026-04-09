import path from 'path'
import simulate from 'miniprogram-simulate'

jest.mock('@doraemon-ui/miniprogram.shared', () => ({
  useRef: jest.fn(),
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

describe('Qrcode', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-qrcode', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-qrcode').length).toBeGreaterThanOrEqual(0)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-qrcode-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-qrcode-custom').length).toBeGreaterThanOrEqual(0)
  })

  test('should draw and expose canvas methods', async () => {
    const { useRef } = require('@doraemon-ui/miniprogram.shared')
    const ctx = {
      scale: jest.fn(),
      fillRect: jest.fn(),
      restore: jest.fn(),
      fillStyle: '',
    }
    const canvas = {
      width: 0,
      height: 0,
      getContext: jest.fn(() => ctx),
      toDataURL: jest.fn(() => 'data:image/png;base64,xxx'),
    }
    useRef.mockResolvedValue({ node: canvas })

    const wrapper = simulate.render(id, { data: 'hello world' })
    wrapper.attach(document.createElement('parent-wrapper'))
    const comp = wrapper.instance as any
    await simulate.sleep(0)
    await simulate.sleep(0)
    expect(await comp.getCanvasNode()).toBe(canvas)
    expect(comp.getBase64Url()).toContain('data:image')
    expect(() => comp.onMaskClick()).not.toThrow()
  })
})
