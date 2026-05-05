import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { AvatarProps, AvatarExpose } from './types'

export const Avatar = createHostComponent<AvatarProps, AvatarExpose>('dora-avatar')

Avatar.displayName = 'DoraAvatar'

// Props registry for Taro WXML template generator
React.createElement('dora-avatar', {
  prefixCls: '',
  shape: 'circle',
  size: 'small',
  src: '',
  bodyStyle: null,
  scale: false,
})
