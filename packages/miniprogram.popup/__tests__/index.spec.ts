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

describe('Popup', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-popup', { less: true })
  })

  mountTest(getId)
  mountTest(getId, { position: 'bottom' })
  mountTest(getId, { position: 'top' })
  mountTest(getId, { position: 'left' })
  mountTest(getId, { position: 'right' })
  mountTest(getId, { position: 'center' })

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-popup').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-pop-up' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-pop-up').length).toBe(1)
  })

  test('should support to change wrapStyle', () => {
    const wrapper = simulate.render(id, { wrapStyle: { color: 'red' } })
    wrapper.attach(document.createElement('parent-wrapper'))
    const $comp = wrapper.instance.$component as any
    expect($comp.$props.wrapStyle).toEqual({ color: 'red' })
    expect(wrapper.querySelector('.dora-popup').dom.style.color).toBe('red')
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
    const onShow = jest.fn()
    const onShowed = jest.fn()
    const onClose = jest.fn()
    const onClosed = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-popup': id,
        },
        template: `
          <dora-popup
            id="dora-popup"
            visible="{{visible}}"
            bind:show="onShow"
            bind:showed="onShowed"
            bind:close="onClose"
            bind:closed="onClosed"
          >
            dora-popup
          </dora-popup>
        `,
        data: {
          visible: false,
        },
        methods: {
          onShow,
          onShowed,
          onClose,
          onClosed,
        },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    const popup = wrapper.querySelector('#dora-popup')
    const $comp = popup.instance.$component as any
    const backdrop = popup.querySelector('#dora-backdrop')
    const animationGroup = popup.querySelector('#dora-animation-group')

    wrapper.setData({ visible: true })
    await simulate.sleep(1000 / 60)
    expect($comp.visible).toBe(true)

    animationGroup.dispatchEvent('enter')
    await simulate.sleep(0)
    expect(onShow).toHaveBeenCalled()

    animationGroup.dispatchEvent('entered')
    await simulate.sleep(0)
    expect(onShowed).toHaveBeenCalled()

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
    const onShow = jest.fn()
    const onShowed = jest.fn()
    const onClose = jest.fn()
    const onClosed = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-popup': id,
        },
        template: `
          <dora-popup
            id="dora-popup"
            visible="{{visible}}"
            closable
            bind:show="onShow"
            bind:showed="onShowed"
            bind:close="onClose"
            bind:closed="onClosed"
          >
            dora-popup
          </dora-popup>
        `,
        data: {
          visible: false,
        },
        methods: {
          onShow,
          onShowed,
          onClose,
          onClosed,
        },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    const popup = wrapper.querySelector('#dora-popup')
    const $comp = popup.instance.$component as any
    const animationGroup = popup.querySelector('#dora-animation-group')

    wrapper.setData({ visible: true })
    await simulate.sleep(1000 / 60)
    expect($comp.visible).toBe(true)

    animationGroup.dispatchEvent('enter')
    await simulate.sleep(0)
    expect(onShow).toHaveBeenCalled()

    animationGroup.dispatchEvent('entered')
    await simulate.sleep(0)
    expect(onShowed).toHaveBeenCalled()

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
