import { createHostComponent } from '../../hooks/hostComponent'
import type { AccordionProps, AccordionExpose } from './types'

export const Accordion = createHostComponent<AccordionProps, AccordionExpose>('dora-accordion',
{
  prefixCls: 'dora-accordion',
  defaultCurrent: [],
  current: [],
  controlled: false,
  accordion: false,
  title: '',
  label: '',
})

Accordion.displayName = 'DoraAccordion'
