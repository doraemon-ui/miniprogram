import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import { Accordion } from './accordion'
import type { AccordionProps, AccordionExpose } from './types'
import AccordionPanel from '../accordion-panel'

export type { AccordionProps, AccordionExpose }

type CompoundedComponent = ForwardRefExoticComponent<AccordionProps & RefAttributes<AccordionExpose>> & {
  Panel: typeof AccordionPanel
}

const InnerAccordion = Accordion as CompoundedComponent

InnerAccordion.Panel = AccordionPanel

export default InnerAccordion
