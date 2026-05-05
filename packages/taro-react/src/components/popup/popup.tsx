import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { PopupProps, PopupExpose } from './types'

export const Popup = createHostComponent<PopupProps, PopupExpose>('dora-popup')

Popup.displayName = 'DoraPopup'

// Props registry for Taro WXML template generator
React.createElement('dora-popup', {
  prefixCls: '',
  animationPrefixCls: '',
  position: '',
  wrapStyle: {},
  bodyStyle: {},
  mask: false,
  maskClosable: false,
  maskTransparent: false,
  maskStyle: {},
  visible: false,
  closeOnSwipe: false,
  zIndex: 0,
  mountOnEnter: false,
  unmountOnExit: false,
  closable: false,
  safeArea: '',
  onShow: undefined,
  onShowed: undefined,
  onClose: undefined,
  onClosed: undefined,
})
