import { createHostComponent } from '@/hooks/hostComponent'
import type { AccordionPanelProps, AccordionPanelExpose } from './types'

export const AccordionPanel = createHostComponent<AccordionPanelProps, AccordionPanelExpose>('dora-accordion-panel')

AccordionPanel.displayName = 'DoraAccordionPanel'
