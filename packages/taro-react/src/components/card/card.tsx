import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { CardProps, CardExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Card = createHostComponent<CardProps, CardExpose>('dora-card',
{
  prefixCls: 'dora-card',
  hoverClass: 'none',
  bordered: true,
  full: false,
  title: '',
  thumb: '',
  thumbStyle: null,
  extra: '',
  actions: [],
})

Card.displayName = 'DoraCard'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-card', {
  prefixCls: '',
  hoverClass: '',
  bordered: '',
  full: '',
  title: '',
  thumb: '',
  thumbStyle: '',
  extra: '',
  actions: '',
  onAction: '',
})
