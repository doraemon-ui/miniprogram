import path from 'path'
import simulate from 'miniprogram-simulate'
import type { RootComponent, Component } from 'miniprogram-simulate'
import type { MyCompInstance } from './types'
import { Doraemon, Component as ComponentDecorator } from '../src'
import type { Config } from '../src'

function getComponentInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): MyCompInstance {
  return wrapper.instance.$component as unknown as MyCompInstance
}

let id: string

describe('CoreJs', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, './my-comp'), 'my-comp')
  })

  test('data: should collect from class properties', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    const $comp = getComponentInstance(wrapper)
    expect($comp.a).toBe('hello')
  })

  test('data: should collect from decorated class properties', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    const $comp = getComponentInstance(wrapper)
    expect($comp.field1).toBe('field1')
    expect($comp.field2).toBe('field2')
  })

  test('computed', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    const $comp = getComponentInstance(wrapper)
    expect($comp.b).toBe(2)
  })

  test('methods', async () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    const $comp = getComponentInstance(wrapper)
    $comp.hello()
    await simulate.sleep(0)
    expect($comp.msg).toBe('hi')
    $comp.$nextTick(() => {
      $comp.msg = 'hhha'
    })
    await simulate.sleep(0)
    expect($comp.msg).toBe('hhha')
  })

  test('class name', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    const $comp = getComponentInstance(wrapper)
    expect($comp.$options.name).toBe('MyComp')
  })

  test('prop decorator', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    const $comp = getComponentInstance(wrapper)
    expect($comp.bar).toBe('3q')
    expect(($comp.$options.props as Record<string, unknown>).bar).toEqual({ type: String, default: '3q' })
  })

  test('watch decorator', async () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    const $comp = getComponentInstance(wrapper)
    expect($comp.changed).toBe(false)
    $comp.a = 'hi'
    await simulate.sleep(0)
    expect($comp.changed).toBe(true)
  })

  test('emit decorator', async () => {
    const onReset = jest.fn()
    const onPromise = jest.fn()
    const onIncrement = jest.fn()
    const onDecrement = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'my-comp': id,
        },
        template: `
          <my-comp
            id="my-comp"
            bind:reset="onReset"
            bind:promise="onPromise"
            bind:increment="onIncrement"
            bind:decrement="onDecrement"
          />
        `,
        methods: {
          onReset,
          onPromise,
          onIncrement,
          onDecrement,
        },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    const myComp = wrapper.querySelector('#my-comp')
    const $comp = getComponentInstance(myComp)

    $comp.resetCount()
    await simulate.sleep(0)
    expect(onReset).toHaveBeenCalledTimes(1)
    expect($comp.count).toBe(0)

    $comp.promise()
    await simulate.sleep(0)
    expect(onPromise).toHaveBeenCalledTimes(1)

    $comp.increment({
      detail: {
        value: 10,
      },
    })
    await simulate.sleep(0)
    expect(onIncrement).toHaveBeenCalledTimes(1)
    expect($comp.count).toBe(11)

    $comp.decrement(11, 2)
    await simulate.sleep(0)
    expect(onDecrement).toHaveBeenCalledTimes(1)
    expect($comp.count).toBe(9)
  })

  test('lifecycle hook', async () => {
    const beforeCreate = jest.fn()
    const created = jest.fn()
    const mounted = jest.fn()
    const destroyed = jest.fn()
    const unmounted = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'my-comp': id,
        },
        template: `
          <my-comp
            id="my-comp"
            bind:hook:before-create="beforeCreate"
            bind:hook:created="created"
            bind:hook:mounted="mounted"
            bind:hook:destroyed="destroyed"
            bind:hook:unmounted="unmounted"
          />
        `,
        methods: {
          beforeCreate,
          created,
          mounted,
          destroyed,
          unmounted,
        },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)
    expect(created).toHaveBeenCalledTimes(1)
    expect(mounted).toHaveBeenCalledTimes(1)

    await simulate.sleep(0)
    wrapper.detach()
    expect(unmounted).toHaveBeenCalledTimes(1)
  })

  test('components', async () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    const testComp = wrapper.querySelectorAll('.test-comp')
    expect(testComp.length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })
})

describe('CoreJs internals', () => {
  test('$data getter should return undefined before _renderProxy is set', () => {
    const vm = new Doraemon()
    expect(vm.$data).toBeUndefined()
  })

  test('$props getter should return undefined before _renderProxy is set', () => {
    const vm = new Doraemon()
    expect(vm.$props).toBeUndefined()
  })

  test('Component.registerHooks should add hooks without error', () => {
    expect(() => {
      ComponentDecorator.registerHooks(['customHook1', 'customHook2'])
    }).not.toThrow()
  })

  test('Doraemon.config setter should warn in dev mode', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const config = Doraemon.config
    Doraemon.config = {} as Config
    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockRestore()
  })
})
