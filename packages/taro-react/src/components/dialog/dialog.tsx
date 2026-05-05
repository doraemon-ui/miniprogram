import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { DialogProps, DialogExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Dialog = createHostComponent<DialogProps, DialogExpose>('dora-dialog',
{
  prefixCls: 'dora-dialog',
  bodyStyle: null,
  mask: true,
  maskClosable: true,
  visible: false,
  zIndex: null,
  closable: false,
  buttonClosable: false,
  verticalButtons: false,
  image: '',
  title: '',
  content: '',
  buttons: [],
})

Dialog.displayName = 'DoraDialog'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-dialog', {
  prefixCls: '',
  bodyStyle: '',
  mask: '',
  maskClosable: '',
  visible: '',
  zIndex: '',
  closable: '',
  buttonClosable: '',
  verticalButtons: '',
  image: '',
  title: '',
  content: '',
  buttons: '',
  onClose: '',
  onClosed: '',
  onAction: '',
})
