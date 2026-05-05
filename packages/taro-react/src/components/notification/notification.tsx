import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { NotificationProps, NotificationExpose } from './types'

export const Notification = createHostComponent<NotificationProps, NotificationExpose>('dora-notification')

Notification.displayName = 'DoraNotification'

// Props registry for Taro WXML template generator
React.createElement('dora-notification', {
  prefixCls: '',
  disabled: false,
  hoverClass: '',
  wrapStyle: {},
  onClick: undefined,
})
