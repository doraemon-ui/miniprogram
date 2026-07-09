import type { Component, RootComponent } from 'miniprogram-simulate'
import simulate from 'miniprogram-simulate'
import path from 'path'

import type { AccordionInstance, PanelInstance } from '../src/types'

function getAccordionInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): AccordionInstance {
  return wrapper.instance.$component as unknown as AccordionInstance
}

function getAccordionPanelInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): PanelInstance {
  return wrapper.instance.$component as unknown as PanelInstance
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

let accordionID: string
let accordionPanelID: string

function getAccordionID() {
  return accordionID
}

function getAccordionPanelID() {
  return accordionPanelID
}

function renderInline(methods: Record<string, (...args: any[]) => void> = {}, data: Record<string, unknown> = {}) {
  return simulate.render(
    simulate.load({
      usingComponents: {
        'dora-accordion': accordionID,
        'dora-accordion-panel': accordionPanelID,
      },
      template: `
        <dora-accordion
          id="accordion"
          prefixCls="{{ prefixCls }}"
          title="{{ title }}"
          label="{{ label }}"
          defaultCurrent="{{ defaultCurrent }}"
          current="{{ current }}"
          controlled="{{ controlled }}"
          accordion="{{ accordion }}"
          bind:change="onChange"
        >
          <dora-accordion-panel
            id="panel-1"
            prefixCls="{{ panelPrefixCls }}"
            key="key1"
            thumb="{{ thumb }}"
            title="Accordion 1"
            content="Content 1"
            disabled="{{ disabled }}"
            showArrow="{{ showArrow }}"
          />
          <dora-accordion-panel
            id="panel-2"
            prefixCls="{{ panelPrefixCls }}"
            key="key2"
            title="Accordion 2"
            content="Content 2"
          />
        </dora-accordion>
      `,
      data: {
        prefixCls: 'dora-accordion',
        panelPrefixCls: 'dora-accordion-panel',
        title: 'Default',
        label: 'Accordion model',
        defaultCurrent: ['key1'],
        current: ['key1'],
        controlled: false,
        accordion: true,
        thumb: 'http://cdn.skyvow.cn/logo.png',
        disabled: true,
        showArrow: true,
        ...data,
      },
      methods: {
        onChange: jest.fn(),
        ...methods,
      },
    }),
  )
}

describe('Accordion', () => {
  beforeAll(() => {
    accordionID = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-accordion', {
      less: true,
      shareCache: true,
    } as object)
    accordionPanelID = simulate.load(path.resolve(__dirname, '../src/panel'), 'dora-accordion-panel', {
      less: true,
      shareCache: true,
    } as object)
  })

  afterAll(() => {
    global.simulatePatch.restore()
  })

  mountTest(getAccordionID)
  mountTest(getAccordionPanelID)

  test('mount correctly', async () => {
    const wrapper = renderInline()
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(30)

    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to trigger event', async () => {
    const onChange = jest.fn()
    const wrapper = renderInline({ onChange }, { disabled: false })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(30)

    const accordion = wrapper.querySelector('#accordion')
    const panel2 = wrapper.querySelector('#panel-2')
    const enabledHeader = panel2.querySelector('.dora-accordion-panel__hd')
    enabledHeader.dispatchEvent('tap')
    await simulate.sleep(100)

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0].detail).toEqual(expect.objectContaining({ key: 'key2' }))
  })

  test('should support to change props', async () => {
    const wrapper = renderInline({}, { controlled: true, current: ['key2'], accordion: false })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(30)

    const accordion = wrapper.querySelector('#accordion')
    const panel1 = wrapper.querySelector('#panel-1')
    const $accordion = getAccordionInstance(accordion)
    const $panel1 = getAccordionPanelInstance(panel1)

    wrapper.setData({ prefixCls: 'dora-accordion-custom' })
    await simulate.sleep(0)
    expect($accordion.$props.prefixCls).toBe('dora-accordion-custom')
    expect(accordion.querySelectorAll('.dora-accordion-custom').length).toBe(1)

    wrapper.setData({ current: ['key1'] })
    await simulate.sleep(10)
    expect($accordion.$props.current).toEqual(['key1'])

    wrapper.setData({ disabled: false })
    await simulate.sleep(0)
    expect($panel1.$props.disabled).toBe(false)
    expect(panel1.querySelectorAll('.dora-accordion-panel--disabled').length).toBe(0)

    wrapper.setData({ showArrow: false })
    await simulate.sleep(0)
    expect($panel1.$props.showArrow).toBe(false)
    expect(panel1.querySelectorAll('.dora-accordion-panel__arrow').length).toBe(0)

    wrapper.setData({ thumb: '' })
    await simulate.sleep(0)
    expect($panel1.$props.thumb).toBe('')
    expect(panel1.querySelectorAll('.dora-accordion-panel__thumb').length).toBe(0)
  })
})
