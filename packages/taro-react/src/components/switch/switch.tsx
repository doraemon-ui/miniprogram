import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { SwitchProps, SwitchExpose } from './types'

export const Switch = createHostComponent<SwitchProps, SwitchExpose>('dora-switch')

Switch.displayName = 'DoraSwitch'

// Props registry for Taro WXML template generator
React.createElement('dora-switch', {
  prefixCls: '',
  value: false,
  disabled: false,
  loading: false,
  color: '',
  checkedText: '',
  uncheckedText: '',
  onChange: undefined,
})
