import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { AccordionProps, AccordionExpose } from './types'

export const Accordion = createHostComponent<AccordionProps, AccordionExpose>('dora-accordion')

Accordion.displayName = 'DoraAccordion'

// Props registry for Taro WXML template generator
React.createElement('dora-accordion', {
  prefixCls: '',
  defaultCurrent: [],
  current: [],
  controlled: false,
  accordion: false,
  title: '',
  label: '',
})
