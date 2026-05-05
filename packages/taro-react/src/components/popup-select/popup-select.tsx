import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { PopupSelectProps, PopupSelectExpose } from './types'

export const PopupSelect = createHostComponent<PopupSelectProps, PopupSelectExpose>('dora-popup-select')

PopupSelect.displayName = 'DoraPopupSelect'

// Props registry for Taro WXML template generator
React.createElement('dora-popup-select', {
  prefixCls: '',
  classNames: '',
  virtualized: false,
  notFoundContent: '',
  value: [],
  options: [],
  iconPosition: '',
  multiple: false,
  max: 0,
  toolbar: '',
  visible: false,
  defaultVisible: false,
  controlled: false,
  onChange: undefined,
  onClosed: undefined,
  onCancel: undefined,
  onValueChange: undefined,
  onConfirm: undefined,
})
