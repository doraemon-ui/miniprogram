import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { ActionSheetProps, ActionSheetExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const ActionSheet = createHostComponent<ActionSheetProps, ActionSheetExpose>('dora-action-sheet',
{
  prefixCls: 'dora-action-sheet',
  theme: 'ios',
  titleText: '',
  buttons: [],
  cancelText: '取消',
  destructiveText: '',
  visible: false,
})

ActionSheet.displayName = 'DoraActionSheet'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-action-sheet', {
  prefixCls: '',
  theme: '',
  titleText: '',
  buttons: '',
  cancelText: '',
  destructiveText: '',
  visible: '',
  onClosed: '',
  onClose: '',
  onCancel: '',
  onAction: '',
  onDestructive: '',
})
