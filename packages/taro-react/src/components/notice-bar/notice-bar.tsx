import { createHostComponent } from '@/hooks/hostComponent'
import type { NoticeBarProps, NoticeBarExpose } from './types'

export const NoticeBar = createHostComponent<NoticeBarProps, NoticeBarExpose>('dora-notice-bar')

NoticeBar.displayName = 'DoraNoticeBar'
