import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { AlertProps, AlertExpose } from './types'

export const Alert = createHostComponent<AlertProps, AlertExpose>('dora-alert')

Alert.displayName = 'DoraAlert'

// Props registry for Taro WXML template generator
React.createElement('dora-alert', {
  prefixCls: '',
  classNames: '',
  theme: '',
  thumb: '',
  title: '',
  label: '',
  closable: false,
  onClick: undefined,
})
