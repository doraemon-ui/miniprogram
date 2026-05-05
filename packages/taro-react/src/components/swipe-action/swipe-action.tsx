import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { SwipeActionProps, SwipeActionExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const SwipeAction = createHostComponent<SwipeActionProps, SwipeActionExpose>('dora-swipe-action',
{
  prefixCls: 'dora-swipe',
  autoClose: false,
  disabled: false,
  left: [],
  right: [],
  useSlots: false,
  data: null,
})

SwipeAction.displayName = 'DoraSwipeAction'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-swipe-action', {
  prefixCls: '',
  autoClose: '',
  disabled: '',
  left: '',
  right: '',
  useSlots: '',
  data: '',
  onClick: '',
  onOpen: '',
  onClose: '',
})
