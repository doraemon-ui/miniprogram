import path from 'path'
import simulate from 'miniprogram-simulate'
import type { Component, RootComponent } from 'miniprogram-simulate'
import type { FooterInstance } from '../src/types'

function getComponentInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): FooterInstance {
  return wrapper.instance.$component as unknown as FooterInstance
}

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

let id: string

function getId() {
  return id
}

const links = [
  { text: 'Docs' },
  { text: 'GitHub' },
  { text: 'Back', url: '/pages/index/index', openType: 'navigateBack', delta: 1 },
]

const chips = [
  { text: 'MIT' },
  { text: 'Open Source', type: 'link' as const },
]

describe('Footer', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-footer', { less: true })
  })

  mountTest(getId)
  mountTest(getId, { links, chips })

  test('mount correctly', () => {
    const wrapper = simulate.render(id, {
      label: 'Doraemon UI',
      content: 'Open source miniprogram components',
      links,
      chips,
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-footer').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className and color', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-footer-custom', color: 'assertive' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-footer-custom').length).toBe(1)
    expect(wrapper.querySelectorAll('.dora-color').length).toBe(1)
    expect(wrapper.querySelectorAll('.dora-color--assertive').length).toBe(1)
  })

  test('should emit linkClick when tapping link item', () => {
    const onLinkClick = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-footer': id,
        },
        template: `<dora-footer id="footer" links="{{links}}" bind:linkClick="onLinkClick" />`,
        data: { links },
        methods: { onLinkClick },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))

    const footer = wrapper.querySelector('#footer')
    const comp = getComponentInstance(footer)
    comp.onLinkClick({
      currentTarget: { dataset: { index: 1 } },
    } as any)

    expect(onLinkClick).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: {
          item: links[1],
          index: 1,
        },
      }),
    )
  })

  test('should emit chipClick only for link type chip', () => {
    const onChipClick = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-footer': id,
        },
        template: `<dora-footer id="footer" chips="{{chips}}" bind:chipClick="onChipClick" />`,
        data: { chips },
        methods: { onChipClick },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))

    const footer = wrapper.querySelector('#footer')
    const comp = getComponentInstance(footer)

    comp.onChipClick({
      currentTarget: { dataset: { index: 0 } },
    } as any)
    expect(onChipClick).not.toHaveBeenCalled()

    comp.onChipClick({
      currentTarget: { dataset: { index: 1 } },
    } as any)
    expect(onChipClick).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: {
          item: chips[1],
          index: 1,
        },
      }),
    )
  })
})
