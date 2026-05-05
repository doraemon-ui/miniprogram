import { createHostComponent } from '../../hooks/hostComponent'
import type { NotificationProps, NotificationExpose } from './types'

export const Notification = createHostComponent<NotificationProps, NotificationExpose>('dora-notification',
{
  prefixCls: 'dora-notification',
  disabled: false,
  hoverClass: 'default',
  wrapStyle: null,
})

Notification.displayName = 'DoraNotification'
