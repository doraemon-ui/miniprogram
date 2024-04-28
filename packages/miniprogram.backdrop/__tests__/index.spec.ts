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

describe('Backdrop', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-backdrop', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-backdrop__bd').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })
  
  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-mask' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-mask__bd').length).toBe(1)
  })

  test('should support to change transparent', () => {
    const wrapper = simulate.render(id, { transparent: true })
    wrapper.attach(document.createElement('parent-wrapper'))
    const $comp = wrapper.instance.$component as any
    expect($comp.transparent).toBe(true)
    $comp.transparent = false
    expect($comp.transparent).toBe(false)
  })

  test('should support to change disableScroll', () => {
    const wrapper = simulate.render(id, { disableScroll: false })
    wrapper.attach(document.createElement('parent-wrapper'))
    const $comp = wrapper.instance.$component as any
    expect($comp.disableScroll).toBe(false)
    $comp.disableScroll = true
    expect($comp.disableScroll).toBe(true)
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

  test('should support to trigger event', async () => {
    const onClick = jest.fn()
    const onShow = jest.fn()
    const onShowed = jest.fn()
    const onClose = jest.fn()
    const onClosed = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-backdrop': id,
        },
        template: `
          <dora-backdrop
            id="dora-backdrop"
            visible="{{visible}}"
            bind:show="onShow"
            bind:showed="onShowed"
            bind:close="onClose"
            bind:closed="onClosed"
            bind:click="onClick"
          >
            dora-backdrop
          </dora-backdrop>
        `,
        data: {
          visible: false,
        },
        methods: {
          onShow,
          onShowed,
          onClose,
          onClosed,
          onClick,
        },
      })
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    const backdrop = wrapper.querySelector('#dora-backdrop')
    const $comp = backdrop.instance.$component as any
    const animationGroup = backdrop.querySelector('#dora-animation-group')

    wrapper.setData({ visible: true })
    await simulate.sleep(1000 / 60)
    expect($comp.visible).toBe(true)

    animationGroup.dispatchEvent('click')
    await simulate.sleep(0)
    expect(onClick).toHaveBeenCalled()

    animationGroup.dispatchEvent('enter')
    await simulate.sleep(0)
    expect(onShow).toHaveBeenCalled()

    animationGroup.dispatchEvent('entered')
    await simulate.sleep(0)
    expect(onShowed).toHaveBeenCalled()

    wrapper.setData({ visible: false })
    await simulate.sleep(1000 / 60)
    expect($comp.visible).toBe(false)
    expect(onClose).toHaveBeenCalled()

    animationGroup.dispatchEvent('exited')
    await simulate.sleep(0)
    expect(onClosed).toHaveBeenCalled()

    $comp.retain()
    expect($comp.backdropHolds).toBe(1)
    $comp.retain()
    expect($comp.backdropHolds).toBe(2)
    $comp.release()
    $comp.release()
    expect($comp.backdropHolds).toBe(0)
  })
})
