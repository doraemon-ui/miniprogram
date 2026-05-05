import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { AccordionProps, AccordionExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
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

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-accordion', {
  prefixCls: '',
  defaultCurrent: '',
  current: '',
  controlled: '',
  accordion: '',
  title: '',
  label: '',
})
