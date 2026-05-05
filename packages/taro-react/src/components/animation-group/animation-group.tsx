import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { AnimationGroupProps, AnimationGroupExpose } from './types'

export const AnimationGroup = createHostComponent<AnimationGroupProps, AnimationGroupExpose>('dora-animation-group')

AnimationGroup.displayName = 'DoraAnimationGroup'

// Props registry for Taro WXML template generator
React.createElement('dora-animation-group', {
  in: false,
  classNames: '',
  duration: '',
  type: '',
  appear: false,
  enter: false,
  exit: false,
  mountOnEnter: false,
  unmountOnExit: false,
  wrapCls: '',
  wrapStyle: {},
  disableScroll: false,
  onChange: undefined,
  onClick: undefined,
})
