import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { FieldProps, FieldExpose } from './types'

export const Field = createHostComponent<FieldProps, FieldExpose>('dora-field')

Field.displayName = 'DoraField'

// Props registry for Taro WXML template generator
React.createElement('dora-field', {
  prefixCls: '',
  label: '',
  labelWrap: false,
  extra: '',
  help: '',
  childElementPosition: '',
  isLink: false,
  align: '',
  disabled: false,
  readOnly: false,
  hidden: false,
  required: false,
  feedbackMessage: [],
  hasFeedback: false,
  index: 0,
  isLast: false,
})
