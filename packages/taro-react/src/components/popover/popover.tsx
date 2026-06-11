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
  classNames: 'dora-animate--fadeIn',
  color: 'light',
  title: '',
  content: '',
  placement: 'top',
  trigger: 'click',
  bodyStyle: null,
  defaultVisible: false,
  visible: false,
  controlled: false,
  mask: false,
  maskClosable: true,
  useSlot: true,
  slotRect: null,
  relativeRect: null,
})

Popover.displayName = 'DoraPopover'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-popover', {
  prefixCls: '',
  classNames: '',
  color: '',
  title: '',
  content: '',
  placement: '',
  trigger: '',
  bodyStyle: '',
  defaultVisible: '',
  visible: '',
  controlled: '',
  mask: '',
  maskClosable: '',
  useSlot: '',
  slotRect: '',
  relativeRect: '',
  onChange: '',
})
