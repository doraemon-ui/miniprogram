import path from 'path'
import simulate from 'miniprogram-simulate'

let accordionID: string
let accordionPanelID: string
let testCompID: string

describe('Accordion', () => {
  beforeAll(() => {
    accordionID = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-accordion', { less: true })
    accordionPanelID = simulate.load(path.resolve(__dirname, '../src/panel'), 'dora-accordion-panel', { less: true })
    testCompID = simulate.load(path.resolve(__dirname, './test-comp'), 'test-comp', { less: true })
  })

  test('mount correctly', () => {
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-accordion': accordionID,
          'dora-accordion-panel': accordionPanelID,
        },
        template: `
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
        `,
      }),
    )
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
    const $comp = wrapper.instance.$component as any
    const accordion = wrapper.querySelector('#dora-accordion')
    const accordionPanel = wrapper.querySelector('#dora-accordion-panel')

    expect(accordion.querySelectorAll('.dora-accordion').length).toBe(1)
    expect(accordionPanel.querySelectorAll('.dora-accordion-panel').length).toBe(1)
    expect(accordionPanel.querySelectorAll('.dora-accordion-panel--disabled').length).toBe(0)
    expect(accordionPanel.querySelectorAll('.dora-accordion-panel .dora-accordion-panel__arrow').length).toBe(1)

    const hd = accordionPanel.querySelector('.dora-accordion-panel .dora-accordion-panel__hd')
    hd.dispatchEvent('tap')
    await simulate.sleep(0)
    expect($comp.haveBeenCalled).toBe(true)
    expect(accordion.instance.$component.activeKey.length).toBe(2)
  })
})
