import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { InputProps, InputExpose } from './types'

export const Input = createHostComponent<InputProps, InputExpose>('dora-input')

Input.displayName = 'DoraInput'

// Props registry for Taro WXML template generator
React.createElement('dora-input', {
  prefixCls: '',
  type: '',
  password: false,
  placeholder: '',
  placeholderStyle: '',
  placeholderClass: '',
  maxlength: 0,
  cursorSpacing: 0,
  focus: false,
  confirmType: '',
  alwaysEmbed: false,
  confirmHold: false,
  cursor: 0,
  selectionStart: 0,
  selectionEnd: 0,
  adjustPosition: false,
  holdKeyboard: false,
  safePasswordCertPath: '',
  safePasswordLength: 0,
  safePasswordTimeStamp: 0,
  safePasswordNonce: '',
  safePasswordSalt: '',
  safePasswordCustomHash: '',
  label: '',
  extra: '',
  defaultValue: '',
  value: '',
  controlled: false,
  disabled: false,
  readOnly: false,
  clear: false,
  error: false,
  labelWrap: false,
  requiredMark: false,
  onlyShowClearWhenFocus: false,
  min: 0,
  max: 0,
  visibilityToggle: false,
  onChange: undefined,
  onFocus: undefined,
  onBlur: undefined,
  onConfirm: undefined,
  onKeyboardheightchange: undefined,
  onNicknamereview: undefined,
  onClear: undefined,
  onError: undefined,
})
