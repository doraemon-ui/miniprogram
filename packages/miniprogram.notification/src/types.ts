import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'
import type { MiniprogramPublicInstance } from '@doraemon-ui/miniprogram.shared'

import type { Notification } from './index'

export interface NotificationProps {
  prefixCls?: string
  visible?: boolean
  classNames?: string
  image?: string
  title?: string
  titleRightText?: string
  closable?: boolean
  swipeToClose?: boolean
  subtitle?: string
  text?: string
  duration?: number
  data?: Record<string, unknown> | null
}

export interface NotificationExpose {
  onClick?: (data?: Record<string, unknown> | null) => void
  onClose?: (data?: Record<string, unknown> | null) => void
  onClosed?: () => void
}

export interface NotificationShowOptions {
  selector?: string
  instance?: MiniprogramPublicInstance
}

export interface NotificationDestroyHandle {
  (): void
  then: (onfulfilled?: () => void, onrejected?: (reason: unknown) => void) => Promise<void>
  promise: Promise<void>
}

export type NotificationShowProps = Omit<NotificationProps, 'visible'> & NotificationExpose

export type NotificationInstance = ComponentPublicInstance<Notification, NotificationProps, NotificationExpose>
