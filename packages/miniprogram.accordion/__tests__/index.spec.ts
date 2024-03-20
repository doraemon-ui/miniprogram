import path from 'path'
import simulate from 'miniprogram-simulate'

let accordionID: string
let accordionPanelID: string

describe('Accordion', () => {
  beforeAll(() => {
    accordionID = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-accordion')
    accordionPanelID = simulate.load(path.resolve(__dirname, '../src/panel'), 'dora-accordion-panel')
  })

  test('mount correctly', () => {
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-accordion': accordionID,
          'dora-accordion-panel': accordionPanelID,
        },
        template: `
          <dora-accordion id="dora-accordion" title="Default" default-current="{{ ['0'] }}">
            <dora-accordion-panel
              id="dora-accordion-panel"
              title="Accordion 1"
              content="微信小程序自定义组件"
            />
          </dora-accordion>
        `,
      })
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    const accordion = wrapper.querySelector('#dora-accordion')
    const accordionPanel = wrapper.querySelector('#dora-accordion-panel')
    expect(accordion.querySelectorAll('.dora-accordion').length).toBe(1)
    expect(accordionPanel.querySelectorAll('.dora-accordion-panel').length).toBe(1)
    expect(accordionPanel.querySelectorAll('.dora-accordion-panel--current').length).toBe(0)
    expect(accordionPanel.querySelectorAll('.dora-accordion-panel--disabled').length).toBe(0)
  })

  test('should support to change props', () => {
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-accordion': accordionID,
          'dora-accordion-panel': accordionPanelID,
        },
        template: `
          <dora-accordion id="dora-accordion" title="Default" label="Accordion model" default-current="{{ ['0'] }}">
            <dora-accordion-panel
              id="dora-accordion-panel"
              key="key1"
              title="Accordion 1"
              content="微信小程序自定义组件"
              disabled
              show-arrow="{{ false }}"
            />
          </dora-accordion>
        `,
      })
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    const accordion = wrapper.querySelector('#dora-accordion')
    const accordionPanel = wrapper.querySelector('#dora-accordion-panel')
    expect(accordion.querySelectorAll('.dora-accordion').length).toBe(1)
    expect(accordionPanel.querySelectorAll('.dora-accordion-panel').length).toBe(1)
    expect(accordionPanel.querySelectorAll('.dora-accordion-panel--disabled').length).toBe(1)
    expect(accordionPanel.querySelectorAll('.dora-accordion-panel--arrow').length).toBe(0)
  })
})
