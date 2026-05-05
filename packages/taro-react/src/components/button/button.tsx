import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { ButtonProps, ButtonExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Button = createHostComponent<ButtonProps, ButtonExpose>('dora-button',
{
  prefixCls: 'dora-button',
  color: 'positive',
  fill: 'solid',
  expand: '',
  shape: '',
  size: 'default',
  strong: false,
  disabled: false,
  loading: false,
  formType: '',
  openType: '',
  hoverClass: 'default',
  hoverStopPropagation: false,
  hoverStartTime: 20,
  hoverStayTime: 70,
  lang: 'en',
  sessionFrom: '',
  sendMessageTitle: '',
  sendMessagePath: '',
  sendMessageImg: '',
  showMessageCard: false,
  phoneNumberNoQuotaToast: true,
  appParameter: '',
})

Button.displayName = 'DoraButton'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-button', {
  prefixCls: '',
  color: '',
  fill: '',
  expand: '',
  shape: '',
  size: '',
  strong: '',
  disabled: '',
  loading: '',
  formType: '',
  openType: '',
  hoverClass: '',
  hoverStopPropagation: '',
  hoverStartTime: '',
  hoverStayTime: '',
  lang: '',
  sessionFrom: '',
  sendMessageTitle: '',
  sendMessagePath: '',
  sendMessageImg: '',
  showMessageCard: '',
  phoneNumberNoQuotaToast: '',
  appParameter: '',
  onClick: '',
})
