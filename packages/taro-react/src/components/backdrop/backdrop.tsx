import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { BackdropProps, BackdropExpose } from './types'

export const Backdrop = createHostComponent<BackdropProps, BackdropExpose>('dora-backdrop')

Backdrop.displayName = 'DoraBackdrop'

// Props registry for Taro WXML template generator
React.createElement('dora-backdrop', {
  prefixCls: '',
  transparent: false,
  zIndex: 0,
  mountOnEnter: false,
  unmountOnExit: false,
  disableScroll: false,
  visible: false,
  classNames: '',
  wrapStyle: {},
  onShow: undefined,
  onShowed: undefined,
  onClose: undefined,
  onClosed: undefined,
  onClick: undefined,
})
