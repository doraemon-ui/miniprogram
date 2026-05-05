import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { ToastProps, ToastExpose } from './types'

export const Toast = createHostComponent<ToastProps, ToastExpose>('dora-toast')

Toast.displayName = 'DoraToast'

// Props registry for Taro WXML template generator
React.createElement('dora-toast', {
  prefixCls: '',
  image: '',
  icon: '',
  iconColor: '',
  text: '',
  position: '',
  mask: false,
  maskClosable: false,
  visible: false,
  zIndex: 0,
  onClose: undefined,
  onClosed: undefined,
})
