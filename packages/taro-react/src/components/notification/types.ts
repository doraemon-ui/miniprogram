import type {
  NotificationProps as NativeNotificationProps,
  NotificationExpose as NativeNotificationExpose,
} from '@doraemon-ui/miniprogram.notification'
import type { BasicComponent } from '@/types'

export interface NotificationProps extends NativeNotificationProps, BasicComponent {}

export interface NotificationExpose extends NativeNotificationExpose {}
