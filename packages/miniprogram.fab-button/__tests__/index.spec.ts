import path from 'path'
import simulate from 'miniprogram-simulate'

jest.mock('@doraemon-ui/miniprogram.shared', () => ({
  useRect: jest.fn(() => Promise.resolve({ width: 40 })),
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

type FabButtonLike = {
  onToggle: () => void
  onTap: (e: { currentTarget: { dataset: { index: number; value: { disabled?: boolean } } } }) => void
}

describe('FabButton', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-fab-button', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-fab-button').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-fab-button-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-fab-button-custom').length).toBe(1)
  })

  test('should toggle and update button style', async () => {
    const wrapper = simulate.render(id, {
      buttons: [{ label: 'A' }, { label: 'B' }],
      direction: 'horizontal',
      reverse: false,
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)

    const comp = wrapper.instance as unknown as FabButtonLike
    comp.onToggle()
    await simulate.sleep(0)
    expect(wrapper.data.buttonVisible).toBe(true)
    expect(Array.isArray(wrapper.data.buttonStyle)).toBe(true)
    expect(wrapper.data.buttonStyle.length).toBe(2)
  })

  test('should emit click and close when active button tapped', async () => {
    const wrapper = simulate.render(id, {
      buttons: [{ label: 'A', disabled: false }],
      defaultVisible: true,
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)
    const comp = wrapper.instance as unknown as FabButtonLike

    comp.onTap({
      currentTarget: {
        dataset: {
          index: 0,
          value: { disabled: false },
        },
      },
    })
    await simulate.sleep(0)

    expect(wrapper.data.buttonVisible).toBe(false)
  })
})
