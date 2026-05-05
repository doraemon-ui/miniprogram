import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { SpinProps, SpinExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Spin = createHostComponent<SpinProps, SpinExpose>('dora-spin',
{
  prefixCls: 'dora-spin',
  classNames: 'dora-animate--fadeIn',
  tip: '',
  size: 'default',
  spinning: true,
  nested: false,
  spinColor: 'default',
})

Spin.displayName = 'DoraSpin'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-spin', {
  prefixCls: '',
  classNames: '',
  tip: '',
  size: '',
  spinning: '',
  nested: '',
  spinColor: '',
})
