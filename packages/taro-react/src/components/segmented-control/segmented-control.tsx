import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { SegmentedControlProps, SegmentedControlExpose } from './types'

export const SegmentedControl = createHostComponent<SegmentedControlProps, SegmentedControlExpose>('dora-segmented-control')

SegmentedControl.displayName = 'DoraSegmentedControl'

// Props registry for Taro WXML template generator
React.createElement('dora-segmented-control', {
  prefixCls: '',
  theme: '',
  defaultCurrent: 0,
  current: 0,
  values: [],
  disabled: false,
  controlled: false,
  onChange: undefined,
})
