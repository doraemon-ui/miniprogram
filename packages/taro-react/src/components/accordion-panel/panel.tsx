import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { AccordionPanelProps, AccordionPanelExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
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

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-accordion-panel', {
  prefixCls: '',
  key: '',
  thumb: '',
  title: '',
  content: '',
  disabled: '',
  showArrow: '',
})
