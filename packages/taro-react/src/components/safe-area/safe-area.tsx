import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { SafeAreaProps, SafeAreaExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const SafeArea = createHostComponent<SafeAreaProps, SafeAreaExpose>('dora-safe-area',
{
  prefixCls: 'dora-safe-area',
  safeArea: { top: false, bottom: false },
  safeAreaStyle: 'default',
  forceRender: false,
  supports: false,
  wrapStyle: null,
})

SafeArea.displayName = 'DoraSafeArea'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-safe-area', {
  prefixCls: '',
  safeArea: '',
  safeAreaStyle: '',
  forceRender: '',
  supports: '',
  wrapStyle: '',
})
