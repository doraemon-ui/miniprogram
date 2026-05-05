import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { CascaderViewProps, CascaderViewExpose } from './types'

export const CascaderView = createHostComponent<CascaderViewProps, CascaderViewExpose>('dora-cascader-view')

CascaderView.displayName = 'DoraCascaderView'

// Props registry for Taro WXML template generator
React.createElement('dora-cascader-view', {
  prefixCls: '',
  defaultValue: '',
  value: '',
  controlled: false,
  options: [],
  full: false,
  placeholder: '',
  height: '',
  skipAnimation: false,
  defaultFieldNames: {},
  onTabsChange: undefined,
  onChange: undefined,
  onLoad: undefined,
})
