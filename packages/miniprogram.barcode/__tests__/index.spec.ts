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

describe('Barcode', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-barcode', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-barcode').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-barcode-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-barcode-custom').length).toBe(1)
  })

  test('should draw and emit events', async () => {
    const { useRef } = require('@doraemon-ui/miniprogram.shared')
    const ctx = {
      clearRect: jest.fn(),
      fillRect: jest.fn(),
      scale: jest.fn(),
      fillText: jest.fn(),
      beginPath: jest.fn(),
      rect: jest.fn(),
      fill: jest.fn(),
      font: '',
      fillStyle: '',
      restore: jest.fn(),
    }
    const canvas = {
      width: 0,
      height: 0,
      getContext: jest.fn(() => ctx),
      toDataURL: jest.fn(() => 'data:image/png;base64,xxx'),
    }
    useRef.mockResolvedValue({ node: canvas })

    const onValid = jest.fn()
    const onInvalid = jest.fn()
    const onSuccess = jest.fn()
    const onError = jest.fn()
    const onLoad = jest.fn()

    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-barcode': id,
        },
        template: `
          <dora-barcode
            id="dora-barcode"
            number="9787115335524"
            bind:valid="onValid"
            bind:invalid="onInvalid"
            bind:success="onSuccess"
            bind:error="onError"
            bind:load="onLoad"
          />
        `,
        methods: {
          onValid,
          onInvalid,
          onSuccess,
          onError,
          onLoad,
        },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))

    await simulate.sleep(0)
    await simulate.sleep(0)

    expect(onLoad).toHaveBeenCalled()
    const loadEvent = onLoad.mock.calls[0][0]
    expect(loadEvent.detail.base64Url).toBe('data:image/png;base64,xxx')
  })

  test('should emit error when number is invalid', async () => {
    const { useRef } = require('@doraemon-ui/miniprogram.shared')
    const ctx = {
      clearRect: jest.fn(),
      fillRect: jest.fn(),
      scale: jest.fn(),
      fillText: jest.fn(),
      beginPath: jest.fn(),
      rect: jest.fn(),
      fill: jest.fn(),
      font: '',
      fillStyle: '',
      restore: jest.fn(),
    }
    const canvas = {
      width: 0,
      height: 0,
      getContext: jest.fn(() => ctx),
      toDataURL: jest.fn(() => 'data:image/png;base64,xxx'),
    }
    useRef.mockResolvedValue({ node: canvas })

    const onError = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-barcode': id,
        },
        template: `
          <dora-barcode
            id="dora-barcode"
            number="123"
            bind:error="onError"
          />
        `,
        methods: {
          onError,
        },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)
    expect(onError).toHaveBeenCalled()
  })
})
