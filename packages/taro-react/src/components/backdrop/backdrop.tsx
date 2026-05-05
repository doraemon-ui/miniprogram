import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { BackdropProps, BackdropExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Backdrop = createHostComponent<BackdropProps, BackdropExpose>('dora-backdrop',
{
  prefixCls: 'dora-backdrop',
  transparent: false,
  zIndex: null,
  mountOnEnter: true,
  unmountOnExit: true,
  disableScroll: true,
  visible: false,
  classNames: 'dora-animate--fadeIn',
  wrapStyle: null,
})

Backdrop.displayName = 'DoraBackdrop'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-backdrop', {
  prefixCls: '',
  transparent: '',
  zIndex: '',
  mountOnEnter: '',
  unmountOnExit: '',
  disableScroll: '',
  visible: '',
  classNames: '',
  wrapStyle: '',
  onShow: '',
  onShowed: '',
  onClose: '',
  onClosed: '',
  onClick: '',
})
