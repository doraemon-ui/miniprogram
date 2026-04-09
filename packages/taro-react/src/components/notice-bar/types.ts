import type { NoticeBarProps as NativeNoticeBarProps, NoticeBarExpose as NativeNoticeBarExpose } from '@doraemon-ui/miniprogram.notice-bar'
import type { BasicComponent } from '@/types'

export interface NoticeBarProps extends NativeNoticeBarProps, BasicComponent {}

export interface NoticeBarExpose extends NativeNoticeBarExpose {}
