import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { ResultProps, ResultExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Result = createHostComponent<ResultProps, ResultExpose>('dora-result',
{
  prefixCls: 'dora-result',
  icon: '',
  title: '',
  label: '',
  buttons: [],
  extra: '',
  fixed: false,
})

Result.displayName = 'DoraResult'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-result', {
  prefixCls: '',
  icon: '',
  title: '',
  label: '',
  buttons: '',
  extra: '',
  fixed: '',
  onClick: '',
})
