import { createHostComponent } from '@/hooks/hostComponent'
import type { AccordionProps, AccordionExpose } from './types'

export const Accordion = createHostComponent<AccordionProps, AccordionExpose>('dora-accordion')

Accordion.displayName = 'DoraAccordion'
