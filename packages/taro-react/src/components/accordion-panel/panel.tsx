import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { AccordionPanelProps, AccordionPanelExpose } from './types'

export const AccordionPanel = createHostComponent<AccordionPanelProps, AccordionPanelExpose>('dora-accordion-panel')

AccordionPanel.displayName = 'DoraAccordionPanel'

// Props registry for Taro WXML template generator
React.createElement('dora-accordion-panel', {
  prefixCls: '',
  key: '',
  thumb: '',
  title: '',
  content: '',
  disabled: false,
  showArrow: false,
})
