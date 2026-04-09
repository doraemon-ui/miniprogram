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

describe('Circle', () => {
  jest.setTimeout(15000)

  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-circle', { less: true })

    // Provide a default mock canvas for mount tests
    const { useRef } = require('@doraemon-ui/miniprogram.shared')
    const ctx = {
      scale: jest.fn(),
      fillRect: jest.fn(),
      clearRect: jest.fn(),
      beginPath: jest.fn(),
      arc: jest.fn(),
      stroke: jest.fn(),
      lineWidth: 0,
      strokeStyle: '',
      lineCap: '',
    }
    const canvas = {
      width: 0,
      height: 0,
      getContext: jest.fn(() => ctx),
    }
    useRef.mockResolvedValue({ node: canvas })
  })

  mountTest(getId)

  test('should update style when size changes', async () => {
    const { useRef } = require('@doraemon-ui/miniprogram.shared')
    const ctx = {
      scale: jest.fn(),
      fillRect: jest.fn(),
      clearRect: jest.fn(),
      beginPath: jest.fn(),
      arc: jest.fn(),
      stroke: jest.fn(),
      lineWidth: 0,
      strokeStyle: '',
      lineCap: '',
    }
    const canvas = {
      width: 0,
      height: 0,
      getContext: jest.fn(() => ctx),
    }
    useRef.mockResolvedValue({ node: canvas })

    const wrapper = simulate.render(id, { size: 120, animate: false })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)
    await simulate.sleep(0)
    expect(wrapper.data.style).toContain('120px')

    wrapper.setData({ size: 90 })
    await simulate.sleep(0)
    expect(wrapper.data.style).toContain('90px')
  })

  test('should draw and emit change when percent changes', async () => {
    const { useRef } = require('@doraemon-ui/miniprogram.shared')
    const ctx = {
      scale: jest.fn(),
      fillRect: jest.fn(),
      clearRect: jest.fn(),
      beginPath: jest.fn(),
      arc: jest.fn(),
      stroke: jest.fn(),
      lineWidth: 0,
      strokeStyle: '',
      lineCap: '',
    }
    const canvas = {
      width: 0,
      height: 0,
      getContext: jest.fn(() => ctx),
    }
    useRef.mockResolvedValue({ node: canvas })

    const onChange = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-circle': id,
        },
        template: `
          <dora-circle
            id="dora-circle"
            animate="{{ animate }}"
            percent="{{ percent }}"
            bind:change="onChange"
          />
        `,
        data: {
          animate: false,
          percent: 0,
        },
        methods: {
          onChange,
        },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)
    await simulate.sleep(0)

    wrapper.setData({ percent: 80 })
    await simulate.sleep(0)
    await simulate.sleep(0)

    expect(onChange).toHaveBeenCalled()
    const last = onChange.mock.calls[onChange.mock.calls.length - 1][0]
    expect(last.detail.value).toBeCloseTo((288 / 180) * Math.PI, 4)
  })
})
