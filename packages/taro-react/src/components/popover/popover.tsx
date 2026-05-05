import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { PopoverProps, PopoverExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Popover = createHostComponent<PopoverProps, PopoverExpose>('dora-popover',
{
  prefixCls: 'dora-popover',
  disabled: false,
  hoverClass: 'default',
  wrapStyle: null,
})

Popover.displayName = 'DoraPopover'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-popover', {
  prefixCls: '',
  disabled: '',
  hoverClass: '',
  wrapStyle: '',
  onClick: '',
})
