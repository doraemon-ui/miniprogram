import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { AlertProps, AlertExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Alert = createHostComponent<AlertProps, AlertExpose>('dora-alert',
{
  prefixCls: 'dora-alert',
  classNames: 'dora-animate--fadeIn',
  theme: 'balanced',
  thumb: '',
  title: '',
  label: '',
  closable: false,
})

Alert.displayName = 'DoraAlert'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-alert', {
  prefixCls: '',
  classNames: '',
  theme: '',
  thumb: '',
  title: '',
  label: '',
  closable: '',
  onClick: '',
})
