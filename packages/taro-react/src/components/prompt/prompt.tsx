import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { PromptProps, PromptExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Prompt = createHostComponent<PromptProps, PromptExpose>('dora-prompt',
{
  prefixCls: 'dora-prompt',
  disabled: false,
  hoverClass: 'default',
  wrapStyle: null,
})

Prompt.displayName = 'DoraPrompt'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-prompt', {
  prefixCls: '',
  disabled: '',
  hoverClass: '',
  wrapStyle: '',
  onClick: '',
})
