import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { StepsProps, StepsExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Steps = createHostComponent<StepsProps, StepsExpose>('dora-steps',
{
  prefixCls: 'dora-steps',
  current: 0,
  direction: 'horizontal',
})

Steps.displayName = 'DoraSteps'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-steps', {
  prefixCls: '',
  current: '',
  direction: '',
})
