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

describe('AnimationGroup', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-animation-group', { less: true })
  })

  mountTest(getId)
  mountTest(getId, { type: 'transition' })
  mountTest(getId, { type: 'animation' })

  test('should support to trigger event', async () => {
    const onEnter = jest.fn()
    const onEntering = jest.fn()
    const onEntered = jest.fn()
    const onExit = jest.fn()
    const onExiting = jest.fn()
    const onExited = jest.fn()
    const onChange = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-animation-group': id,
        },
        template: `
          <dora-animation-group
            id="dora-animation-group"
            wrapCls="dora-animation-group"
            in="{{in}}"
            enter="{{enter}}"
            exit="{{exit}}"
            classNames="{{classNames}}"
            bind:enter="onEnter"
            bind:entering="onEntering"
            bind:entered="onEntered"
            bind:exit="onExit"
            bind:exiting="onExiting"
            bind:exited="onExited"
            bind:change="onChange"
          >
            dora-animation-group
          </dora-animation-group>
        `,
        data: {
          in: false,
          enter: true,
          exit: true,
          classNames: 'dora-animate--fadeIn',
        },
        methods: {
          onEnter,
          onEntering,
          onEntered,
          onExit,
          onExiting,
          onExited,
          onChange,
        },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    const animationGroup = wrapper.querySelector('#dora-animation-group')
    const $comp = animationGroup.instance.$component as any

    wrapper.setData({ in: true })
    await simulate.sleep(1000 / 60)
    const view = animationGroup.querySelector('.dora-animation-group')
    expect($comp.in).toBe(true)
    expect(onEnter).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledTimes(3)
    await simulate.sleep(1000 / 60)
    expect(onEntering).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledTimes(4)
    view.dispatchEvent('transitionend')
    await simulate.sleep(350 + 1000 / 60)
    expect(onEntered).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledTimes(5)
    expect(wrapper.toJSON()).toMatchSnapshot()

    wrapper.setData({ in: false })
    await simulate.sleep(1000 / 60)
    expect($comp.in).toBe(false)
    expect(onExit).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledTimes(6)
    await simulate.sleep(1000 / 60)
    expect(onExiting).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledTimes(7)
    view.dispatchEvent('transitionend')
    await simulate.sleep(350 + 1000 / 60)
    expect(onExited).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledTimes(9)
  })

  test('should support to change props', async () => {
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-animation-group': id,
        },
        template: `
          <dora-animation-group
            id="dora-animation-group"
            wrapCls="dora-animation-group"
            wrapStyle="{{wrapStyle}}"
            in="{{in}}"
            enter="{{enter}}"
            exit="{{exit}}"
            classNames="{{classNames}}"
            disableScroll="{{disableScroll}}"
          >
            dora-animation-group
          </dora-animation-group>
        `,
        data: {
          in: false,
          enter: true,
          exit: true,
          classNames: 'dora-animate--fadeIn',
          wrapStyle: null,
          disableScroll: false,
        },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    const animationGroup = wrapper.querySelector('#dora-animation-group')
    const $comp = animationGroup.instance.$component as any

    wrapper.setData({ in: true })
    await simulate.sleep(1000 / 60)
    expect($comp.in).toBe(true)

    wrapper.setData({ wrapStyle: { color: 'red' } })
    await simulate.sleep(0)
    expect($comp.$props.wrapStyle).toEqual({ color: 'red' })
    expect(animationGroup.querySelector('.dora-animation-group').dom.style.color).toBe('red')

    wrapper.setData({ disableScroll: true })
    await simulate.sleep(0)
    expect($comp.$props.disableScroll).toBe(true)
  })
})
