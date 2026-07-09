import type { AccordionExpose as NativeAccordionExpose, AccordionProps as NativeAccordionProps } from '@doraemon-ui/miniprogram.accordion'

import type { BasicComponent } from '../../types'

export interface AccordionProps extends NativeAccordionProps, BasicComponent {}

export interface AccordionExpose extends NativeAccordionExpose {}
