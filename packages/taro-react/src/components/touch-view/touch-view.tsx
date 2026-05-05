import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { TouchViewProps, TouchViewExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const TouchView = createHostComponent<TouchViewProps, TouchViewExpose>('dora-touch-view',
{
  prefixCls: 'dora-touch-view',
  hoverClass: 'none',
  hoverStopPropagation: false,
  hoverStartTime: 20,
  hoverStayTime: 70,
  wrapStyle: null,
})

TouchView.displayName = 'DoraTouchView'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-touch-view', {
  prefixCls: '',
  hoverClass: '',
  hoverStopPropagation: '',
  hoverStartTime: '',
  hoverStayTime: '',
  wrapStyle: '',
  onClick: '',
})
