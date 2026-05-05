import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { ToptipsProps, ToptipsExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Toptips = createHostComponent<ToptipsProps, ToptipsExpose>('dora-toptips',
{
  prefixCls: 'dora-toptips',
  classNames: 'dora-animate--slideInDown',
  icon: 'cancel',
  hidden: false,
  text: '',
  duration: 3000,
})

Toptips.displayName = 'DoraToptips'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-toptips', {
  prefixCls: '',
  classNames: '',
  icon: '',
  hidden: '',
  text: '',
  duration: '',
})
