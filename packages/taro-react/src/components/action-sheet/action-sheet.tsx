import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { ActionSheetProps, ActionSheetExpose } from './types'

export const ActionSheet = createHostComponent<ActionSheetProps, ActionSheetExpose>('dora-action-sheet')

ActionSheet.displayName = 'DoraActionSheet'

// Props registry for Taro WXML template generator
React.createElement('dora-action-sheet', {
  prefixCls: '',
  theme: 'ios',
  titleText: '',
  buttons: [],
  cancelText: '',
  destructiveText: '',
  visible: false,
  onClosed: undefined,
  onClose: undefined,
  onCancel: undefined,
  onAction: undefined,
  onDestructive: undefined,
})
