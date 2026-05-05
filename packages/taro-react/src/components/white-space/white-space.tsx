import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { WhiteSpaceProps, WhiteSpaceExpose } from './types'

export const WhiteSpace = createHostComponent<WhiteSpaceProps, WhiteSpaceExpose>('dora-white-space')

WhiteSpace.displayName = 'DoraWhiteSpace'

// Props registry for Taro WXML template generator
React.createElement('dora-white-space', {
  prefixCls: '',
  size: '',
  bodyStyle: null,
  onClick: undefined,
})
