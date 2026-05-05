import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { CascaderProps, CascaderExpose } from './types'

export const Cascader = createHostComponent<CascaderProps, CascaderExpose>('dora-cascader')

Cascader.displayName = 'DoraCascader'

// Props registry for Taro WXML template generator
React.createElement('dora-cascader', {
  prefixCls: '',
  defaultValue: '',
  value: '',
  controlled: false,
  title: '',
  cancelText: '',
  confirmText: '',
  options: [],
  full: false,
  height: '',
  chooseTitle: '',
  visible: false,
  skipAnimation: false,
  defaultFieldNames: {},
  onTabsChange: undefined,
  onLoad: undefined,
  onChange: undefined,
  onClose: undefined,
  onConfirm: undefined,
  onCancel: undefined,
})
