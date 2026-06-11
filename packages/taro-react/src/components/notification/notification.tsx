import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { NotificationProps, NotificationExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Notification = createHostComponent<NotificationProps, NotificationExpose>('dora-notification',
{
  prefixCls: 'dora-notification',
  visible: false,
  classNames: 'dora-animate--slideInDown',
  image: '',
  title: '',
  titleRightText: '',
  closable: false,
  swipeToClose: true,
  subtitle: '',
  text: '',
  duration: 3000,
  data: null,
})

Notification.displayName = 'DoraNotification'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-notification', {
  prefixCls: '',
  visible: '',
  classNames: '',
  image: '',
  title: '',
  titleRightText: '',
  closable: '',
  swipeToClose: '',
  subtitle: '',
  text: '',
  duration: '',
  data: '',
  onClick: '',
  onClose: '',
  onClosed: '',
})
