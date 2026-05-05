import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { FormProps, FormExpose } from './types'

export const Form = createHostComponent<FormProps, FormExpose>('dora-form')

Form.displayName = 'DoraForm'

// Props registry for Taro WXML template generator
React.createElement('dora-form', {
  prefixCls: '',
  disabled: false,
  hoverClass: '',
  wrapStyle: {},
  onClick: undefined,
})
