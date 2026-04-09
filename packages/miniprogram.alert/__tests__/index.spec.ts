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

function getId() {
  return id
}

describe('Alert', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-alert', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-alert').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-alert-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-alert-custom').length).toBe(1)
  })

  test('should support to trigger click event', async () => {
    const onClick = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-alert': id,
        },
        template: `
          <dora-alert
            id="dora-alert"
            title="微信小程序自定义组件"
            bind:click="onClick"
          />
        `,
        methods: {
          onClick,
        },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    const alert = wrapper.querySelector('#dora-alert')
    const root = alert.querySelector('.dora-alert')
    root.dispatchEvent('click')
    await simulate.sleep(0)
    expect(onClick).toHaveBeenCalled()
  })

  test('should support closable', async () => {
    const onClick = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-alert': id,
        },
        template: `
          <dora-alert
            id="dora-alert"
            closable
            title="微信小程序自定义组件"
            bind:click="onClick"
          />
        `,
        methods: {
          onClick,
        },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    const alert = wrapper.querySelector('#dora-alert')
    const $comp = alert.instance.$component as any
    expect($comp.visible).toBe(true)
    const close = alert.querySelector('.dora-alert__closable')
    close.dispatchEvent('tap')
    await simulate.sleep(0)
    expect(onClick).toHaveBeenCalled()
    expect($comp.visible).toBe(false)
  })
})
