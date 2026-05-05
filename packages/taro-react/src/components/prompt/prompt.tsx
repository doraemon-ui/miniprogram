import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { PromptProps, PromptExpose } from './types'

export const Prompt = createHostComponent<PromptProps, PromptExpose>('dora-prompt')

Prompt.displayName = 'DoraPrompt'

// Props registry for Taro WXML template generator
React.createElement('dora-prompt', {
  prefixCls: '',
  disabled: false,
  hoverClass: '',
  wrapStyle: {},
  onClick: undefined,
})
