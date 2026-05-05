import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { ToastProps, ToastExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Toast = createHostComponent<ToastProps, ToastExpose>('dora-toast',
{
  prefixCls: 'dora-toast',
  image: '',
  icon: '',
  iconColor: '',
  text: '',
  position: 'center',
  mask: true,
  maskClosable: true,
  visible: false,
  zIndex: null,
})

Toast.displayName = 'DoraToast'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-toast', {
  prefixCls: '',
  image: '',
  icon: '',
  iconColor: '',
  text: '',
  position: '',
  mask: '',
  maskClosable: '',
  visible: '',
  zIndex: '',
  onClose: '',
  onClosed: '',
})
