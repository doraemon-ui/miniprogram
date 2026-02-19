import path from 'path'
import simulate from 'miniprogram-simulate'

function mountTest (id: string | (() => string), defaultProps = {}) {
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

function getId () {
  return id
}

describe('Dialog', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-dialog', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-dialog').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-dialog-box' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-dialog-box').length).toBe(1)
  })

  test('should support to change visible', () => {
    const wrapper = simulate.render(id, { visible: false })
    wrapper.attach(document.createElement('parent-wrapper'))
    const $comp = wrapper.instance.$component as any
    expect($comp.visible).toBe(false)
    $comp.visible = true
    expect($comp.visible).toBe(true)
  })

  test('should support to change zIndex', () => {
    const wrapper = simulate.render(id, { zIndex: 9999 })
    wrapper.attach(document.createElement('parent-wrapper'))
    const $comp = wrapper.instance.$component as any
    expect($comp.zIndex).toBe(9999)
  })

  test('should support to trigger event when click the backdrop', async () => {
    const onClose = jest.fn()
    const onClosed = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-dialog': id,
        },
        template: `
          <dora-dialog
            id="dora-dialog"
            title="This is title"
            visible="{{visible}}"
            bind:close="onClose"
            bind:closed="onClosed"
          >
            dora-dialog
          </dora-dialog>
        `,
        data: {
          visible: false,
        },
        methods: {
          onClose,
          onClosed,
        },
      })
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    const dialog = wrapper.querySelector('#dora-dialog')
    const $comp = dialog.instance.$component as any
    const popup = dialog.querySelector('#dora-popup')
    const backdrop = popup.querySelector('#dora-backdrop')
    const animationGroup = popup.querySelector('#dora-animation-group')

    wrapper.setData({ visible: true })
    await simulate.sleep(1000 / 60)
    expect($comp.visible).toBe(true)

    animationGroup.dispatchEvent('enter')
    await simulate.sleep(0)

    animationGroup.dispatchEvent('entered')
    await simulate.sleep(0)

    backdrop.dispatchEvent('click')
    await simulate.sleep(0)
    expect(onClose).toHaveBeenCalled()
    wrapper.setData({ visible: false })
    await simulate.sleep(1000 / 60)
    expect($comp.visible).toBe(false)

    animationGroup.dispatchEvent('exited')
    await simulate.sleep(0)
    expect(onClosed).toHaveBeenCalled()
  })

  test('should support to trigger event when click the close button', async () => {
    const onClose = jest.fn()
    const onClosed = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-dialog': id,
        },
        template: `
          <dora-dialog
            id="dora-dialog"
            title="This is title"
            visible="{{visible}}"
            closable
            bind:close="onClose"
            bind:closed="onClosed"
          >
            dora-dialog
          </dora-dialog>
        `,
        data: {
          visible: false,
        },
        methods: {
          onClose,
          onClosed,
        },
      })
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    const dialog = wrapper.querySelector('#dora-dialog')
    const $comp = dialog.instance.$component as any
    const popup = dialog.querySelector('#dora-popup')
    const animationGroup = popup.querySelector('#dora-animation-group')

    wrapper.setData({ visible: true })
    await simulate.sleep(1000 / 60)
    expect($comp.visible).toBe(true)

    animationGroup.dispatchEvent('enter')
    await simulate.sleep(0)

    animationGroup.dispatchEvent('entered')
    await simulate.sleep(0)

    const close = popup.querySelector('.dora-popup__close')
    close.dispatchEvent('tap')
    await simulate.sleep(0)
    expect(onClose).toHaveBeenCalled()
    wrapper.setData({ visible: false })
    await simulate.sleep(1000 / 60)
    expect($comp.visible).toBe(false)

    animationGroup.dispatchEvent('exited')
    await simulate.sleep(0)
    expect(onClosed).toHaveBeenCalled()
  })
})
