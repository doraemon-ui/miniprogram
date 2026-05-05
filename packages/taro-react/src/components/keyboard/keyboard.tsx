import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { KeyboardProps, KeyboardExpose } from './types'

export const Keyboard = createHostComponent<KeyboardProps, KeyboardExpose>('dora-keyboard')

Keyboard.displayName = 'DoraKeyboard'

// Props registry for Taro WXML template generator
React.createElement('dora-keyboard', {
  prefixCls: '',
})
