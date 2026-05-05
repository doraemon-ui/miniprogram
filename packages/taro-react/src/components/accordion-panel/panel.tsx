import { createHostComponent } from '../../hooks/hostComponent'
import type { AccordionPanelProps, AccordionPanelExpose } from './types'

export const AccordionPanel = createHostComponent<AccordionPanelProps, AccordionPanelExpose>('dora-accordion-panel',
{
  prefixCls: 'dora-accordion-panel',
  key: '',
  thumb: '',
  title: '',
  content: '',
  disabled: false,
  showArrow: true,
})

AccordionPanel.displayName = 'DoraAccordionPanel'
