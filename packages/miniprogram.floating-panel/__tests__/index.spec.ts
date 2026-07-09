import type { Component, RootComponent } from 'miniprogram-simulate'
import simulate from 'miniprogram-simulate'
import path from 'path'

import type { FloatingPanelInstance } from '../src/types'

jest.mock('@doraemon-ui/miniprogram.shared', () => {
  const actual = jest.requireActual('@doraemon-ui/miniprogram.shared')
  return {
    ...actual,
    getSystemInfoSync: jest.fn(() => ({ windowHeight: 600 })),
    getPointsNumber: jest.fn(() => 1),
    getTouchPoints: jest.fn((e: any) => ({ x: e?.detail?.x ?? 0, y: e?.detail?.y ?? 0 })),
  }
})

function getComponentInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): FloatingPanelInstance {
  return wrapper.instance.$component as unknown as FloatingPanelInstance
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

describe('FloatingPanel', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-floating-panel', { less: true })
  })

  mountTest(getId)
  mountTest(getId, { defaultAnchors: [100, 300, 500] })

  test('mount correctly', () => {
    const wrapper = simulate.render(id, { defaultAnchors: [100, 300, 500] })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-floating-panel').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-floating-panel-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-floating-panel-custom').length).toBe(1)
  })

  test('should expose setHeight', () => {
    const wrapper = simulate.render(id, { defaultAnchors: [100, 300, 500] })
    wrapper.attach(document.createElement('parent-wrapper'))
    const $comp = getComponentInstance(wrapper)

    $comp.setHeight(300)

    expect(JSON.stringify(wrapper.toJSON())).toContain('translate3d(0, calc(100% + -300px), 0)')
  })

  test('should support drag interactions and emit heightChange', async () => {
    const onHeightChange = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-floating-panel': id,
        },
        template: '<dora-floating-panel id="panel" defaultAnchors="{{anchors}}" bind:heightChange="onHeightChange">content</dora-floating-panel>',
        data: {
          anchors: [100, 300, 500],
        },
        methods: {
          onHeightChange,
        },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))

    const panel = wrapper.querySelector('#panel')
    const comp = getComponentInstance(panel) as unknown as {
      onTouchStart: (e: { detail: { y: number } }) => void
      onTouchMove: (e: { detail: { y: number } }) => void
      onTouchEnd: (e: { detail: { y: number } }) => void
    }

    // `miniprogram-simulate` does not reliably forward touch detail payloads for
    // catchtouch* handlers, so we verify the drag path through the public
    // component instance methods after mount.
    comp.onTouchStart({ detail: { y: 500 } })
    comp.onTouchMove({ detail: { y: 320 } })
    comp.onTouchEnd({ detail: { y: 320 } })
    await simulate.sleep(350)

    expect(onHeightChange).toHaveBeenCalled()
    expect(JSON.stringify(wrapper.toJSON())).toContain('translate3d(0, calc(100% + -300px), 0)')
  })
})
