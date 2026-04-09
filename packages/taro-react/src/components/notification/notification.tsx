import { createHostComponent } from '@/hooks/hostComponent'
import type { NotificationProps, NotificationExpose } from './types'

export const Notification = createHostComponent<NotificationProps, NotificationExpose>('dora-notification')

Notification.displayName = 'DoraNotification'
