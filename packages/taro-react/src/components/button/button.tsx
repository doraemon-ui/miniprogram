import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { ButtonProps, ButtonExpose } from './types'

export const Button = createHostComponent<ButtonProps, ButtonExpose>('dora-button')

Button.displayName = 'DoraButton'

// Props registry for Taro WXML template generator
React.createElement('dora-button', {
  prefixCls: '',
  color: '',
  fill: 'solid',
  expand: 'block',
  shape: 'rounded',
  size: 'small',
  strong: false,
  disabled: false,
  loading: false,
  formType: 'submit',
  openType: '',
  hoverClass: '',
  hoverStopPropagation: false,
  hoverStartTime: 0,
  hoverStayTime: 0,
  lang: 'en',
  sessionFrom: '',
  sendMessageTitle: '',
  sendMessagePath: '',
  sendMessageImg: '',
  showMessageCard: false,
  phoneNumberNoQuotaToast: false,
  appParameter: '',
  onClick: undefined,
})
