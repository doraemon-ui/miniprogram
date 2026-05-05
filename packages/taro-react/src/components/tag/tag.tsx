import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { TagProps, TagExpose } from './types'

export const Tag = createHostComponent<TagProps, TagExpose>('dora-tag')

Tag.displayName = 'DoraTag'

// Props registry for Taro WXML template generator
React.createElement('dora-tag', {
  prefixCls: '',
  hoverClass: '',
  color: '',
  closable: false,
  defaultVisible: false,
  visible: false,
  controlled: false,
  onChange: undefined,
  onClick: undefined,
  onClose: undefined,
})
