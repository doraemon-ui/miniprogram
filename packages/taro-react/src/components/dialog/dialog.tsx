import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { DialogProps, DialogExpose } from './types'

export const Dialog = createHostComponent<DialogProps, DialogExpose>('dora-dialog')

Dialog.displayName = 'DoraDialog'

// Props registry for Taro WXML template generator
React.createElement('dora-dialog', {
  prefixCls: '',
  bodyStyle: {},
  mask: false,
  maskClosable: false,
  visible: false,
  zIndex: 0,
  closable: false,
  buttonClosable: false,
  verticalButtons: false,
  image: '',
  title: '',
  content: '',
  buttons: [],
  onClose: undefined,
  onClosed: undefined,
  onAction: undefined,
})
