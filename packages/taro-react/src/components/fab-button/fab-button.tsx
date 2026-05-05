import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { FabButtonProps, FabButtonExpose } from './types'

export const FabButton = createHostComponent<FabButtonProps, FabButtonExpose>('dora-fab-button')

FabButton.displayName = 'DoraFabButton'

// Props registry for Taro WXML template generator
React.createElement('dora-fab-button', {
  prefixCls: '',
  hoverClass: '',
  theme: '',
  position: '',
  action: '',
  actionRotate: false,
  hideShadow: false,
  backdrop: false,
  buttons: [],
  direction: '',
  spaceBetween: 0,
  duration: 0,
  scale: 0,
  reverse: false,
  sAngle: 0,
  eAngle: 0,
  defaultVisible: false,
  visible: false,
  controlled: false,
  onChange: undefined,
  onClick: undefined,
})
