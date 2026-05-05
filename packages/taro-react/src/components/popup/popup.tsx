import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { PopupProps, PopupExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Popup = createHostComponent<PopupProps, PopupExpose>('dora-popup',
{
  prefixCls: 'dora-popup',
  animationPrefixCls: 'dora-animate',
  position: 'center',
  wrapStyle: null,
  bodyStyle: null,
  mask: true,
  maskClosable: true,
  maskTransparent: false,
  maskStyle: null,
  visible: false,
  closeOnSwipe: false,
  zIndex: null,
  mountOnEnter: true,
  unmountOnExit: true,
  closable: false,
  safeArea: false,
})

Popup.displayName = 'DoraPopup'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-popup', {
  prefixCls: '',
  animationPrefixCls: '',
  position: '',
  wrapStyle: '',
  bodyStyle: '',
  mask: '',
  maskClosable: '',
  maskTransparent: '',
  maskStyle: '',
  visible: '',
  closeOnSwipe: '',
  zIndex: '',
  mountOnEnter: '',
  unmountOnExit: '',
  closable: '',
  safeArea: '',
  onShow: '',
  onShowed: '',
  onClose: '',
  onClosed: '',
})
