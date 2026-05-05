import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { BadgeProps, BadgeExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Badge = createHostComponent<BadgeProps, BadgeExpose>('dora-badge',
{
  prefixCls: 'dora-badge',
  count: 0,
  overflowCount: 99,
  dot: false,
  showZero: false,
  status: '',
  text: '',
  position: 'topRight',
  backgroundColor: '#ed3f14',
  hideShadow: false,
  title: '',
})

Badge.displayName = 'DoraBadge'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-badge', {
  prefixCls: '',
  count: '',
  overflowCount: '',
  dot: '',
  showZero: '',
  status: '',
  text: '',
  position: '',
  backgroundColor: '',
  hideShadow: '',
  title: '',
})
