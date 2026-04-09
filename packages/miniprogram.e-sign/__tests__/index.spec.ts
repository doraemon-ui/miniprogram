import path from 'path'
import simulate from 'miniprogram-simulate'

jest.mock('@doraemon-ui/miniprogram.shared', () => ({
  useRef: jest.fn(),
  getSystemInfoSync: jest.fn(() => ({ pixelRatio: 1 })),
  getTouchPoints: jest.fn((e) => {
    const point = e?.touches?.[0] || e?.changedTouches?.[0] || { pageX: 0, pageY: 0 }
    return { x: point.pageX, y: point.pageY }
  }),
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

describe('ESign', () => {
  const makeCtx = () => ({
    scale: jest.fn(),
    fillRect: jest.fn(),
    clearRect: jest.fn(),
    closePath: jest.fn(),
    beginPath: jest.fn(),
    lineTo: jest.fn(),
    stroke: jest.fn(),
    getImageData: jest.fn(() => ({ data: [] })),
    putImageData: jest.fn(),
    lineWidth: 0,
    strokeStyle: '',
    lineCap: '',
    lineJoin: '',
    fillStyle: '',
  })

  const makeCanvas = () => {
    const ctx = makeCtx()
    return {
      node: {
        width: 0,
        height: 0,
        toDataURL: jest.fn(() => 'data:image/png;base64,mock'),
        getContext: jest.fn(() => ctx),
      },
      ctx,
    }
  }

  beforeAll(() => {
    const { useRef } = require('@doraemon-ui/miniprogram.shared')
    const { node } = makeCanvas()
    useRef.mockImplementation((selector: string) => {
      if (selector.startsWith('.')) {
        return Promise.resolve({ clientWidth: 300, clientHeight: 200 })
      }
      return Promise.resolve({ node })
    })
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-e-sign', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-e-sign').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-e-sign-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-e-sign-custom').length).toBe(1)
  })

  test('should emit signing/clear/submit events', async () => {
    const { useRef } = require('@doraemon-ui/miniprogram.shared')
    const { node } = makeCanvas()
    useRef.mockImplementation((selector: string) => {
      if (selector.startsWith('.')) {
        return Promise.resolve({ clientWidth: 320, clientHeight: 200 })
      }
      return Promise.resolve({ node })
    })

    const wrapper = simulate.render(id, { width: 320 })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)
    await simulate.sleep(0)

    type ESignComponentLike = {
      onTouchMove: (e: Record<string, unknown>) => void
      clear: () => void
      submit: () => void
    }
    const comp = wrapper.instance as unknown as ESignComponentLike

    expect(() => {
      comp.onTouchMove({
        touches: [{ pageX: 10, pageY: 20 }],
        changedTouches: [{ pageX: 10, pageY: 20 }],
        currentTarget: { offsetLeft: 0, offsetTop: 0 },
      })
    }).not.toThrow()
    await simulate.sleep(0)

    expect(() => {
      comp.submit()
    }).not.toThrow()
    await simulate.sleep(0)

    expect(() => {
      comp.clear()
    }).not.toThrow()
    await simulate.sleep(0)

    expect(typeof wrapper.data.bodyStyle).toBe('string')
  })

  test('should create canvas context and export base64 url', async () => {
    const { useRef } = require('@doraemon-ui/miniprogram.shared')
    const ctx = {
      scale: jest.fn(),
      fillRect: jest.fn(),
      clearRect: jest.fn(),
      closePath: jest.fn(),
      beginPath: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
      getImageData: jest.fn(() => ({ data: [] })),
      putImageData: jest.fn(),
      lineWidth: 0,
      strokeStyle: '',
      lineCap: '',
      lineJoin: '',
      fillStyle: '',
    }
    const canvas = {
      width: 0,
      height: 0,
      toDataURL: jest.fn(() => 'data:image/png;base64,ok'),
      getContext: jest.fn(() => ctx),
    }
    useRef.mockImplementation((selector: string) => {
      if (selector.startsWith('.')) {
        return Promise.resolve({ clientWidth: 280, clientHeight: 160 })
      }
      return Promise.resolve({ node: canvas })
    })

    const wrapper = simulate.render(id, { width: 280, height: 160 })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)

    type ESignWithCreateContext = {
      createCanvasContext: (props: {
        prefixCls: string
        width: number | string
        height: number
        bgColor: string
        type: 'png' | 'jpg' | 'jpeg' | 'webp'
      }) => Promise<{
        draw: () => Promise<string>
      }>
    }
    const comp = wrapper.instance as unknown as ESignWithCreateContext
    const canvasRef = await comp.createCanvasContext({
      prefixCls: 'dora-e-sign',
      width: 280,
      height: 160,
      bgColor: '#ffffff',
      type: 'png',
    })

    const base64 = await canvasRef.draw()
    expect(base64).toContain('data:image/png;base64')
  })
})
