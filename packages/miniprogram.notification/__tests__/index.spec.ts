import type { Component, RootComponent } from 'miniprogram-simulate'
import simulate from 'miniprogram-simulate'
import path from 'path'

import * as notification from '../src/notification'
import type { NotificationInstance } from '../src/types'

function getComponentInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): NotificationInstance {
  return wrapper.instance.$component as unknown as NotificationInstance
}

function createTouchEvent(pageX: number, pageY: number) {
  return {
    touches: [{ pageX, pageY }],
    changedTouches: [{ pageX, pageY }],
  } as any
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

describe('Notification', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-notification', { less: true })
  })

  mountTest(getId)

  test('mount correctly', async () => {
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-notification': id,
        },
        template: '<dora-notification id="dora-notification" />',
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))

    notification.show(
      {
        title: '宝宝',
        text: '嘤嘤嘤，人家拿小拳拳捶你胸口!!!',
      },
      '#dora-notification',
      wrapper.instance,
    )
    await simulate.sleep(10)

    const json = JSON.stringify(wrapper.toJSON())
    expect(json).toContain('dora-notification__content')
    expect(json).toContain('dora-notification__title')
    expect(json).toContain('嘤嘤嘤，人家拿小拳拳捶你胸口!!!')
  })

  test('should support declarative visible mode', async () => {
    const wrapper = simulate.render(id, {
      visible: true,
      title: '宝宝',
      text: '嘤嘤嘤，人家拿小拳拳捶你胸口!!!',
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(10)

    const json = JSON.stringify(wrapper.toJSON())
    expect(json).toContain('dora-notification__content')
    expect(json).toContain('dora-notification__title')
    expect(json).toContain('嘤嘤嘤，人家拿小拳拳捶你胸口!!!')
  })

  test('should trigger click and close events in declarative mode', async () => {
    const wrapper = simulate.render(id, {
      visible: true,
      title: '宝宝',
      text: '嘤嘤嘤，人家拿小拳拳捶你胸口!!!',
      data: { message: '逗你玩的!!!' },
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(10)

    const instance = getComponentInstance(wrapper)
    const emitSpy = jest.spyOn(instance, '$emit')

    wrapper.querySelector('.dora-notification__content').dispatchEvent('tap')
    instance.onClose({ message: '逗你玩的!!!' })
    await simulate.sleep(10)

    expect(emitSpy).toHaveBeenCalledWith('click', { message: '逗你玩的!!!' })
    expect(emitSpy).toHaveBeenCalledWith('close', { message: '逗你玩的!!!' })
  })

  test('should support functional show helper', async () => {
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-notification': id,
        },
        template: '<dora-notification id="dora-notification" />',
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))

    const hide = notification.show(
      {
        title: '宝宝',
        text: '嘤嘤嘤，人家拿小拳拳捶你胸口!!!',
      },
      '#dora-notification',
      wrapper.instance,
    )

    await simulate.sleep(10)
    expect(typeof hide).toBe('function')
    hide()
  })

  test('should support thenable hide handle', async () => {
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-notification': id,
        },
        template: '<dora-notification id="dora-notification" />',
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))

    const hide = notification.show(
      {
        title: '宝宝',
        text: '嘤嘤嘤，人家拿小拳拳捶你胸口!!!',
        duration: 0,
      },
      '#dora-notification',
      wrapper.instance,
    )

    setTimeout(() => {
      hide()
    }, 0)

    const done = jest.fn()
    await hide.then(done)
    expect(done).toHaveBeenCalled()
  })

  test('should support swipe to close', async () => {
    const wrapper = simulate.render(id, {
      visible: true,
      swipeToClose: true,
      title: '宝宝',
      text: '嘤嘤嘤，人家拿小拳拳捶你胸口!!!',
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(10)

    const instance = getComponentInstance(wrapper) as NotificationInstance & {
      _notificationHeight: number
      onTouchStart: (e: any) => void
      onTouchMove: (e: any) => void
      onTouchEnd: () => void
    }
    const emitSpy = jest.spyOn(instance, '$emit')

    instance._notificationHeight = 20
    instance.onTouchStart(createTouchEvent(0, 40))
    instance.onTouchMove(createTouchEvent(0, 0))
    instance.onTouchEnd()
    await simulate.sleep(10)

    expect(emitSpy).toHaveBeenCalledWith('close', null)
  })
})
