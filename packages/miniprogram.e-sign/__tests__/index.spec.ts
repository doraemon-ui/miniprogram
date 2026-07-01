import path from 'path'
import simulate from 'miniprogram-simulate'
import type { RootComponent, Component } from 'miniprogram-simulate'
import type { ESignInstance } from '../src/types'

const mockUseRef = jest.fn()
const mockGetSystemInfoSync = jest.fn(() => ({ pixelRatio: 2 }))
const mockGetTouchPoints = jest.fn((e) => {
  const point = e?.touches?.[0] || e?.changedTouches?.[0] || { pageX: 0, pageY: 0 }
  return { x: point.pageX, y: point.pageY }
})
const mockToDataURL = jest.fn(() => Promise.resolve('data:image/png;base64,mock'))
const mockGetCanvasRef = jest.fn()

jest.mock('@doraemon-ui/miniprogram.shared', () => {
  const actual = jest.requireActual('@doraemon-ui/miniprogram.shared')
  return {
    ...actual,
    useRef: mockUseRef,
    getSystemInfoSync: mockGetSystemInfoSync,
    getTouchPoints: mockGetTouchPoints,
    toDataURL: mockToDataURL,
    getCanvasRef: mockGetCanvasRef,
  }
})

function mountTest(id: string | (() => string), defaultProps: Record<string, unknown> = {}) {
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

type MockCanvas = ReturnType<typeof makeCanvas>

let id: string
let activeCanvas: MockCanvas
let activeWrapRef: {
  clientWidth: number
  clientHeight: number
  clientLeft: number
  clientTop: number
  left: number
  top: number
}

function getId() {
  return id
}

function getComponentInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): ESignInstance {
  return wrapper.instance.$component as unknown as ESignInstance
}

function makeCtx() {
  return {
    scale: jest.fn(),
    fillRect: jest.fn(),
    clearRect: jest.fn(),
    closePath: jest.fn(),
    beginPath: jest.fn(),
    lineTo: jest.fn(),
    stroke: jest.fn(),
    getImageData: jest.fn(() => ({ data: [1, 2, 3] })),
    putImageData: jest.fn(),
    lineWidth: 0,
    strokeStyle: '',
    lineCap: '',
    lineJoin: '',
    fillStyle: '',
  }
}

function makeCanvas() {
  const ctx = makeCtx()
  const canvas = {
    width: 0,
    height: 0,
    toDataURL: jest.fn(() => 'data:image/png;base64,mock'),
    getContext: jest.fn(() => ctx),
  }
  return { canvas, ctx }
}

function asThenable<T>(value: T) {
  return {
    then(resolve: (resolved: T) => unknown) {
      return Promise.resolve(resolve(value))
    },
  }
}

function setCanvasEnv({
  wrap = {
    clientWidth: 300,
    clientHeight: 200,
    clientLeft: 0,
    clientTop: 0,
    left: 0,
    top: 0,
  },
  canvas = makeCanvas(),
}: {
  wrap?: {
    clientWidth: number
    clientHeight: number
    clientLeft: number
    clientTop: number
    left: number
    top: number
  }
  canvas?: MockCanvas
} = {}) {
  activeWrapRef = wrap
  activeCanvas = canvas
  mockUseRef.mockImplementation(() => asThenable(activeWrapRef))
  mockGetCanvasRef.mockImplementation(() => asThenable(activeCanvas.canvas))
}

function renderComponent(props: Record<string, unknown> = {}) {
  const wrapper = simulate.render(id, props)
  wrapper.attach(document.createElement('parent-wrapper'))
  return wrapper
}

function getCanvasNode(wrapper: RootComponent<any, any, any> | Component<any, any, any>) {
  return wrapper.querySelector('#dora-e-sign')
}

function getBodyNode(wrapper: RootComponent<any, any, any> | Component<any, any, any>) {
  return wrapper.querySelector('.dora-e-sign__bd')
}

function getFooterButtons(wrapper: RootComponent<any, any, any> | Component<any, any, any>) {
  return wrapper.querySelectorAll('.dora-e-sign__ft >>> .dora-button')
}

function attachCanvasRefs(
  comp: ESignInstance,
  {
    wrap = activeWrapRef,
    canvas = activeCanvas,
    draw = jest.fn(() => Promise.resolve('data:image/png;base64,mock')),
    clear = jest.fn(() => {
      canvas.ctx.clearRect(0, 0, wrap.clientWidth, wrap.clientHeight)
      canvas.ctx.closePath()
    }),
    resize = jest.fn(),
  }: {
    wrap?: typeof activeWrapRef
    canvas?: MockCanvas
    draw?: jest.Mock
    clear?: jest.Mock
    resize?: jest.Mock
  } = {},
) {
  Reflect.set(comp as unknown as object, 'wrapRef', asThenable(wrap))
  Reflect.set(
    comp as unknown as object,
    'canvasRef',
    asThenable({
      ctx: canvas.ctx,
      clear,
      draw,
      resize,
    }),
  )
  return { draw, clear, resize }
}

describe('ESign', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-e-sign', { less: true })
  })

  beforeEach(() => {
    jest.clearAllMocks()
    mockGetSystemInfoSync.mockReturnValue({ pixelRatio: 2 })
    mockToDataURL.mockResolvedValue('data:image/png;base64,mock')
    setCanvasEnv()
  })

  mountTest(getId)
  mountTest(getId, { width: 320 })
  mountTest(getId, { height: 240 })
  mountTest(getId, { bgColor: '#f5f5f5' })
  mountTest(getId, { hasFooter: false })

  test('mount correctly', () => {
    const wrapper = renderComponent()
    expect(wrapper.querySelectorAll('.dora-e-sign').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = renderComponent({ prefixCls: 'dora-e-sign-custom' })
    expect(wrapper.querySelectorAll('.dora-e-sign-custom').length).toBe(1)
  })

  test('should render footer texts from props', () => {
    const wrapper = renderComponent({ cancelText: '清空', confirmText: '保存' })
    const comp = getComponentInstance(wrapper)

    expect(comp.$props.cancelText).toBe('清空')
    expect(comp.$props.confirmText).toBe('保存')
    expect(wrapper.dom?.textContent).toContain('清空')
    expect(wrapper.dom?.textContent).toContain('保存')
  })

  test('should render footer slot when hasFooter is false', () => {
    const slotId = simulate.load({
      usingComponents: {
        'dora-e-sign': id,
      },
      template: `
        <dora-e-sign id="sign" hasFooter="{{false}}">
          <view slot="footer" class="custom-footer">custom footer</view>
        </dora-e-sign>
      `,
    })
    const wrapper = simulate.render(slotId)
    wrapper.attach(document.createElement('parent-wrapper'))
    const sign = wrapper.querySelector('#sign')
    const comp = getComponentInstance(sign)

    expect(comp.$props.hasFooter).toBe(false)
    expect(wrapper.dom?.textContent).toContain('custom footer')
    expect(sign.querySelectorAll('.dora-e-sign__ft >>> .dora-button').length).toBe(0)
  })

  test('should support to change width and height', async () => {
    const wrapper = renderComponent({ width: 280, height: 160 })
    const comp = getComponentInstance(wrapper)
    attachCanvasRefs(comp)

    wrapper.setData({ width: 320, height: 180 })
    await simulate.sleep(0)

    expect(comp.$props.width).toBe(320)
    expect(comp.$props.height).toBe(180)
    expect(JSON.stringify(wrapper.toJSON())).toContain('width: 320px')
    expect(JSON.stringify(wrapper.toJSON())).toContain('height: 180px')
  })

  test('should initialize canvas with scaled size and background color', async () => {
    const customCanvas = makeCanvas()
    setCanvasEnv({
      wrap: {
        clientWidth: 280,
        clientHeight: 160,
        clientLeft: 0,
        clientTop: 0,
        left: 0,
        top: 0,
      },
      canvas: customCanvas,
    })

    renderComponent({ width: 280, height: 160, bgColor: '#cccccc' })
    await simulate.sleep(0)
    await simulate.sleep(0)

    expect(customCanvas.canvas.width).toBe(560)
    expect(customCanvas.canvas.height).toBe(320)
    expect(customCanvas.ctx.scale).toHaveBeenCalledWith(2, 2)
    expect(customCanvas.ctx.fillStyle).toBe('#cccccc')
    expect(customCanvas.ctx.fillRect).toHaveBeenCalledWith(0, 0, 280, 160)
  })

  test('should emit start and apply line style on touchstart', async () => {
    const onStart = jest.fn()
    const hostId = simulate.load({
      usingComponents: {
        'dora-e-sign': id,
      },
      template: `<dora-e-sign id="sign" lineWidth="{{6}}" lineColor="#ff0000" bind:start="onStart" />`,
      methods: {
        onStart,
      },
    })
    const wrapper = simulate.render(hostId)
    wrapper.attach(document.createElement('parent-wrapper'))
    const sign = wrapper.querySelector('#sign')
    const comp = getComponentInstance(sign)
    attachCanvasRefs(comp)
    const canvas = getCanvasNode(sign)

    canvas.dispatchEvent('touchstart', {
      touches: [{ pageX: 30, pageY: 50 }],
      changedTouches: [{ pageX: 30, pageY: 50 }],
    })
    await simulate.sleep(0)

    expect(comp.$props.lineWidth).toBe(6)
    expect(comp.$props.lineColor).toBe('#ff0000')
    expect(activeCanvas.ctx.beginPath).toHaveBeenCalledTimes(1)
    expect(activeCanvas.ctx.lineWidth).toBe(6)
    expect(activeCanvas.ctx.strokeStyle).toBe('#ff0000')
    expect(onStart).toHaveBeenCalledTimes(1)
  })

  test('should emit signing with coordinates on touchmove', async () => {
    mockGetTouchPoints.mockReturnValue({ x: 30, y: 50 })
    setCanvasEnv({
      wrap: {
        clientWidth: 320,
        clientHeight: 200,
        clientLeft: 2,
        clientTop: 3,
        left: 10,
        top: 20,
      },
    })
    const onSigning = jest.fn()
    const hostId = simulate.load({
      usingComponents: {
        'dora-e-sign': id,
      },
      template: `<dora-e-sign id="sign" bind:signing="onSigning" />`,
      methods: {
        onSigning,
      },
    })
    const wrapper = simulate.render(hostId)
    wrapper.attach(document.createElement('parent-wrapper'))
    const sign = wrapper.querySelector('#sign')
    const comp = getComponentInstance(sign)
    attachCanvasRefs(comp)
    const canvas = getCanvasNode(sign)

    canvas.dispatchEvent('touchmove', {
      touches: [{ pageX: 30, pageY: 50 }],
      changedTouches: [{ pageX: 30, pageY: 50 }],
    })
    await simulate.sleep(0)

    expect(activeCanvas.ctx.lineCap).toBe('round')
    expect(activeCanvas.ctx.lineJoin).toBe('round')
    expect(activeCanvas.ctx.lineTo).toHaveBeenCalledWith(18, 27)
    expect(activeCanvas.ctx.stroke).toHaveBeenCalledTimes(1)
    expect(onSigning).toHaveBeenCalledTimes(1)
    expect(onSigning.mock.calls[0][0].detail).toEqual({ mouseX: 18, mouseY: 27 })
  })

  test('should emit end on touchend', async () => {
    const onEnd = jest.fn()
    const hostId = simulate.load({
      usingComponents: {
        'dora-e-sign': id,
      },
      template: `<dora-e-sign id="sign" bind:end="onEnd" />`,
      methods: {
        onEnd,
      },
    })
    const wrapper = simulate.render(hostId)
    wrapper.attach(document.createElement('parent-wrapper'))
    const sign = wrapper.querySelector('#sign')
    const comp = getComponentInstance(sign)
    attachCanvasRefs(comp)
    const canvas = getCanvasNode(sign)

    canvas.dispatchEvent('touchend', {
      changedTouches: [{ pageX: 30, pageY: 50 }],
    })
    await simulate.sleep(0)

    expect(onEnd).toHaveBeenCalledTimes(1)
  })

  test('should emit empty base64 when submit is clicked before signing', async () => {
    const onSubmit = jest.fn()
    const hostId = simulate.load({
      usingComponents: {
        'dora-e-sign': id,
      },
      template: `<dora-e-sign id="sign" bind:submit="onSubmit" />`,
      methods: {
        onSubmit,
      },
    })
    const wrapper = simulate.render(hostId)
    wrapper.attach(document.createElement('parent-wrapper'))
    const sign = wrapper.querySelector('#sign')
    const [, submitButton] = getFooterButtons(sign)

    submitButton.dispatchEvent('click')
    await simulate.sleep(0)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit.mock.calls[0][0].detail).toEqual({ base64Url: '' })
  })

  test('should emit clear when reset button is clicked after signing', async () => {
    const onClear = jest.fn()
    const hostId = simulate.load({
      usingComponents: {
        'dora-e-sign': id,
      },
      template: `<dora-e-sign id="sign" bind:clear="onClear" />`,
      methods: {
        onClear,
      },
    })
    const wrapper = simulate.render(hostId)
    wrapper.attach(document.createElement('parent-wrapper'))
    const sign = wrapper.querySelector('#sign')
    const comp = getComponentInstance(sign)
    attachCanvasRefs(comp)
    const canvas = getCanvasNode(sign)
    const [clearButton] = getFooterButtons(sign)

    canvas.dispatchEvent('touchmove', {
      touches: [{ pageX: 20, pageY: 30 }],
      changedTouches: [{ pageX: 20, pageY: 30 }],
    })
    await simulate.sleep(0)

    clearButton.dispatchEvent('click')
    await simulate.sleep(0)

    expect(activeCanvas.ctx.clearRect).toHaveBeenCalledWith(0, 0, 300, 200)
    expect(activeCanvas.ctx.closePath).toHaveBeenCalledTimes(1)
    expect(onClear).toHaveBeenCalledTimes(1)
  })

  test('should emit exported base64 when submit is clicked after signing', async () => {
    const onSubmit = jest.fn()
    const hostId = simulate.load({
      usingComponents: {
        'dora-e-sign': id,
      },
      template: `<dora-e-sign id="sign" type="jpeg" bind:submit="onSubmit" />`,
      methods: {
        onSubmit,
      },
    })
    const wrapper = simulate.render(hostId)
    wrapper.attach(document.createElement('parent-wrapper'))
    const sign = wrapper.querySelector('#sign')
    const comp = getComponentInstance(sign)
    const draw = jest.fn(() => Promise.resolve('data:image/png;base64,signed'))
    attachCanvasRefs(comp, {
      draw,
    })
    const canvas = getCanvasNode(sign)
    const [, submitButton] = getFooterButtons(sign)

    canvas.dispatchEvent('touchmove', {
      touches: [{ pageX: 20, pageY: 30 }],
      changedTouches: [{ pageX: 20, pageY: 30 }],
    })
    await simulate.sleep(0)

    submitButton.dispatchEvent('click')
    await simulate.sleep(0)
    await simulate.sleep(0)

    expect(comp.$props.type).toBe('jpeg')
    expect(draw).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit.mock.calls[0][0].detail).toEqual({ base64Url: 'data:image/png;base64,signed' })
  })
})
