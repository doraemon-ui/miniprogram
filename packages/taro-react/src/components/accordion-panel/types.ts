import type {
  AccordionPanelProps as NativeAccordionPanelProps,
  AccordionPanelExpose as NativeAccordionPanelExpose,
} from '@doraemon-ui/miniprogram.accordion'
import type { BasicComponent } from '@/types'

export interface AccordionPanelProps extends NativeAccordionPanelProps, BasicComponent {}

export interface AccordionPanelExpose extends NativeAccordionPanelExpose {}
