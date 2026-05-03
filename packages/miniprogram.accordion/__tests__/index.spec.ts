import path from 'path'
import simulate from 'miniprogram-simulate'
import type { RootComponent, Component } from 'miniprogram-simulate'
import type { AccordionInstance, PanelInstance } from '../src/types'
import type { TestCompInstance } from './test-comp'

function getAccordionInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): AccordionInstance {
  return wrapper.instance.$component as unknown as AccordionInstance
}

function getAccordionPanelInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): PanelInstance {
  return wrapper.instance.$component as unknown as PanelInstance
}

function getComponentInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): TestCompInstance {
  return wrapper.instance.$component as unknown as TestCompInstance
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
let testCompID: string

function getAccordionID() {
  return accordionID
}

function getAccordionPanelID() {
  return accordionPanelID
}

function getTestCompID() {
  return testCompID
}

function renderInline(template: string) {
  return simulate.render(
    simulate.load({
      usingComponents: {
        'dora-accordion': accordionID,
        'dora-accordion-panel': accordionPanelID,
      },
      template,
    }),
  )
}

describe('Accordion', () => {
  beforeAll(() => {
    accordionID = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-accordion', { less: true })
    accordionPanelID = simulate.load(path.resolve(__dirname, '../src/panel'), 'dora-accordion-panel', { less: true })
    testCompID = simulate.load(path.resolve(__dirname, './test-comp'), 'test-comp', { less: true })
  })

  mountTest(getAccordionID)
  mountTest(getAccordionPanelID)
  mountTest(getTestCompID)

  test('mount correctly', () => {
    const wrapper = renderInline(`
      <dora-accordion id="dora-accordion" title="Default" defaultCurrent="{{ ['0'] }}">
        <dora-accordion-panel
          title="Accordion 1"
          content="微信小程序自定义组件"
        />
        <dora-accordion-panel
          id="dora-accordion-panel"
          title="Accordion 2"
          content="微信小程序自定义组件"
        />
      </dora-accordion>
    `)
    wrapper.attach(document.createElement('parent-wrapper'))
    const accordion = wrapper.querySelector('#dora-accordion')
    const accordionPanel = wrapper.querySelector('#dora-accordion-panel')
    expect(accordion.querySelectorAll('.dora-accordion').length).toBe(1)
    expect(accordionPanel.querySelectorAll('.dora-accordion-panel').length).toBe(1)
    expect(accordionPanel.querySelectorAll('.dora-accordion-panel--current').length).toBe(0)
    expect(accordionPanel.querySelectorAll('.dora-accordion-panel--disabled').length).toBe(0)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change props', async () => {
    const wrapper = simulate.render(testCompID)
    wrapper.attach(document.createElement('parent-wrapper'))
    const $comp = getComponentInstance(wrapper)
    const accordion = wrapper.querySelector('#dora-accordion')
    const accordionPanel = wrapper.querySelector('#dora-accordion-panel')
    const $accordionComp = getAccordionInstance(accordion)
    const $accordionPanelComp = getAccordionPanelInstance(accordionPanel)

    expect(accordion.querySelectorAll('.dora-accordion').length).toBe(1)
    expect(accordionPanel.querySelectorAll('.dora-accordion-panel').length).toBe(1)
    expect(accordionPanel.querySelectorAll('.dora-accordion-panel--disabled').length).toBe(0)
    expect(accordionPanel.querySelectorAll('.dora-accordion-panel .dora-accordion-panel__arrow').length).toBe(1)

    wrapper.setData({ accordion: true })
    await simulate.sleep(0)
    expect($comp.$data.accordion).toBe(true)

    expect(accordion.instance.$component.activeKey.length).toBe(1)
    expect(accordion.instance.$component.activeKey).toEqual(['key1'])
    const hd = accordionPanel.querySelector('.dora-accordion-panel .dora-accordion-panel__hd')
    hd.dispatchEvent('tap')
    await simulate.sleep(0)
    expect($comp.$data.haveBeenCalled).toBe(true)
    expect(accordion.instance.$component.activeKey.length).toBe(1)
    expect(accordion.instance.$component.activeKey).toEqual(['key2'])
  })
})
