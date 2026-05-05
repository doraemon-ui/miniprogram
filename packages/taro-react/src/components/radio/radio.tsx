import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { RadioProps, RadioExpose } from './types'

export const Radio = createHostComponent<RadioProps, RadioExpose>('dora-radio')

Radio.displayName = 'DoraRadio'

// Props registry for Taro WXML template generator
React.createElement('dora-radio', {
  prefixCls: '',
  cellPrefixCls: '',
  selectablePrefixCls: '',
  thumb: '',
  title: '',
  label: '',
  value: '',
  checked: false,
  disabled: false,
  readOnly: false,
  color: '',
  wrapStyle: null,
  hasLine: false,
})
