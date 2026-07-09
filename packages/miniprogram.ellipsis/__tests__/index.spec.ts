import type { Component, RootComponent } from 'miniprogram-simulate'
import simulate from 'miniprogram-simulate'
import path from 'path'

import type { EllipsisDirection, EllipsisInstance } from '../src/types'

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

function getComponentInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): EllipsisInstance {
  return wrapper.instance.$component as unknown as EllipsisInstance
}

function renderComponent(props: Record<string, unknown> = {}) {
  const wrapper = simulate.render(id, props)
  wrapper.attach(document.createElement('parent-wrapper'))
  return wrapper
}

function getRoot(wrapper: RootComponent<any, any, any> | Component<any, any, any>) {
  return wrapper.querySelector('.dora-ellipsis')
}

const longText = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

describe('Ellipsis', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-ellipsis', { less: true })
  })

  mountTest(getId)
  mountTest(getId, { direction: 'start' })
  mountTest(getId, { direction: 'middle' })
  mountTest(getId, { rows: 2 })
  mountTest(getId, { defaultExpanded: true })

  test('mount correctly', () => {
    const wrapper = renderComponent()
    expect(wrapper.querySelectorAll('.dora-ellipsis').length).toBeGreaterThanOrEqual(1)
    expect(wrapper.querySelectorAll('.dora-ellipsis--container').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = renderComponent({ prefixCls: 'dora-ellipsis-custom' })
    expect(wrapper.querySelectorAll('.dora-ellipsis-custom').length).toBeGreaterThanOrEqual(1)
    expect(wrapper.querySelectorAll('.dora-ellipsis-custom--container').length).toBe(1)
  })

  test('should support to change direction and rows', async () => {
    const wrapper = renderComponent({
      content: longText,
      rows: 1,
      direction: 'end' as EllipsisDirection,
    })
    const comp = getComponentInstance(wrapper)
    await simulate.sleep(0)

    expect(comp.$props.direction).toBe('end')
    expect(wrapper.dom?.textContent).toContain('...')

    wrapper.setData({ direction: 'start' })
    await simulate.sleep(0)
    expect(comp.$props.direction).toBe('start')
    expect(wrapper.dom?.textContent?.trim().startsWith('...')).toBe(true)

    wrapper.setData({ direction: 'middle' })
    await simulate.sleep(0)
    expect(comp.$props.direction).toBe('middle')
    expect((wrapper.dom?.textContent?.match(/\.\.\./g) || []).length).toBeGreaterThanOrEqual(2)

    wrapper.setData({ rows: 3 })
    await simulate.sleep(0)
    expect(comp.$props.rows).toBe(3)
    expect(wrapper.dom?.textContent).toContain(longText)
    expect(wrapper.querySelectorAll('.dora-ellipsis__expanded').length).toBe(0)
  })

  test('should support to change content', async () => {
    const wrapper = renderComponent({
      content: 'short text',
      rows: 1,
    })
    const comp = getComponentInstance(wrapper)
    await simulate.sleep(0)

    expect(comp.$props.content).toBe('short text')
    expect(wrapper.dom?.textContent).toContain('short text')

    wrapper.setData({ content: longText })
    await simulate.sleep(0)
    expect(comp.$props.content).toBe(longText)
    expect(wrapper.dom?.textContent).toContain('...')
    expect(wrapper.querySelectorAll('.dora-ellipsis--container').length).toBe(1)
  })

  test('should support defaultExpanded', async () => {
    const wrapper = renderComponent({
      content: longText,
      rows: 1,
      defaultExpanded: true,
      expandText: '展开',
      collapseText: '收起',
    })
    const comp = getComponentInstance(wrapper)
    await simulate.sleep(0)

    expect(comp.$props.defaultExpanded).toBe(true)
    expect(wrapper.dom?.textContent).toContain(longText)
    expect(wrapper.querySelectorAll('.dora-ellipsis__expanded').length).toBe(0)
  })

  test('should emit click event from root tap', async () => {
    const onClick = jest.fn()
    const hostId = simulate.load({
      usingComponents: {
        'dora-ellipsis': id,
      },
      template: '<dora-ellipsis id="ellipsis" content="hello world" bind:click="onClick" />',
      methods: {
        onClick,
      },
    })
    const wrapper = simulate.render(hostId)
    wrapper.attach(document.createElement('parent-wrapper'))

    const ellipsis = wrapper.querySelector('#ellipsis')
    const root = getRoot(ellipsis)
    root.dispatchEvent('tap')
    await simulate.sleep(0)

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  test('should expand by dispatching tap on expand text', async () => {
    const wrapper = renderComponent({
      content: longText,
      rows: 1,
      expandText: '展开',
      collapseText: '收起',
    })
    const comp = getComponentInstance(wrapper)
    await simulate.sleep(0)

    expect(comp.$props.expandText).toBe('展开')
    expect(comp.$props.collapseText).toBe('收起')
    expect(wrapper.querySelectorAll('.dora-ellipsis__expanded').length).toBe(1)

    const expandText = wrapper.querySelector('.dora-ellipsis__expanded')
    expandText.dispatchEvent('tap')
    await simulate.sleep(0)

    expect(wrapper.querySelectorAll('.dora-ellipsis__expanded').length).toBe(0)
    expect(wrapper.dom?.textContent).toContain(longText)
  })
})
