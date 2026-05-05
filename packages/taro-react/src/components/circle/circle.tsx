import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { CircleProps, CircleExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Circle = createHostComponent<CircleProps, CircleExpose>('dora-circle',
{
  prefixCls: 'dora-circle',
  percent: 0,
  strokeWidth: 10,
  size: 120,
  lineCap: 'round',
  backgroundColor: '#f3f3f3',
  color: '#33cd5f',
  sAngle: 0,
  counterclockwise: false,
  speed: 2000,
  animate: true,
  background: true,
})

Circle.displayName = 'DoraCircle'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-circle', {
  prefixCls: '',
  percent: '',
  strokeWidth: '',
  size: '',
  lineCap: '',
  backgroundColor: '',
  color: '',
  sAngle: '',
  counterclockwise: '',
  speed: '',
  animate: '',
  background: '',
  onChange: '',
})
