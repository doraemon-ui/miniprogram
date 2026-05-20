import path from 'path'
import simulate from 'miniprogram-simulate'
import type { RootComponent, Component } from 'miniprogram-simulate'
import * as gallery from '../src/gallery'
import type { GalleryInstance } from '../src/types'

function getComponentInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): GalleryInstance {
  return wrapper.instance.$component as unknown as GalleryInstance
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

describe('Gallery', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-gallery', { less: true })
  })

  mountTest(getId)

  test('mount correctly', async () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    getComponentInstance(wrapper).show({
      urls: ['https://cdn.skyvow.cn/logo.png'],
    })
    await simulate.sleep(10)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should show gallery items through instance api', async () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))

    const instance = getComponentInstance(wrapper)

    instance.show({
      current: 1,
      urls: ['https://cdn.skyvow.cn/logo.png', 'https://cdn.skyvow.cn/logo.png?2'],
      indicatorDots: true,
    })
    await simulate.sleep(10)

    const json = JSON.stringify(wrapper.toJSON())
    expect(json).toContain('https://cdn.skyvow.cn/logo.png?2')
    expect(json).toContain('dora-gallery__swiper')
  })

  test('should render delete operation area', async () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))

    const instance = getComponentInstance(wrapper)

    instance.show({
      urls: ['https://cdn.skyvow.cn/logo.png', 'https://cdn.skyvow.cn/logo.png?2'],
    })
    await simulate.sleep(10)

    const json = JSON.stringify(wrapper.toJSON())
    expect(json).toContain('dora-gallery__opr')
  })

  test('should support declarative visible mode', async () => {
    const wrapper = simulate.render(id, {
      visible: true,
      current: 1,
      urls: ['https://cdn.skyvow.cn/logo.png', 'https://cdn.skyvow.cn/logo.png?2'],
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(10)

    const json = JSON.stringify(wrapper.toJSON())
    expect(json).toContain('https://cdn.skyvow.cn/logo.png?2')
    expect(json).toContain('dora-gallery__swiper')
  })

  test('should support functional show helper', async () => {
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-gallery': id,
        },
        template: `<dora-gallery id="dora-gallery" />`,
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))

    let close: (() => void) | null = null
    expect(() => {
      close = gallery.show(
        {
          urls: ['https://cdn.skyvow.cn/logo.png'],
        },
        '#dora-gallery',
        wrapper.instance,
      )
    }).not.toThrow()

    expect(typeof close).toBe('function')
    expect(() => {
      close?.()
    }).not.toThrow()
  })
})
