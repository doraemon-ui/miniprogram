import type { NoticeBarExpose as NativeNoticeBarExpose, NoticeBarProps as NativeNoticeBarProps } from '@doraemon-ui/miniprogram.notice-bar'

import type { BasicComponent } from '../../types'

export interface NoticeBarProps extends NativeNoticeBarProps, BasicComponent {
  onClick?: (event: any) => void
}

export interface NoticeBarExpose extends NativeNoticeBarExpose {}
