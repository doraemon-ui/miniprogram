import { createHostComponent } from '../../hooks/hostComponent'
import type { NoticeBarProps, NoticeBarExpose } from './types'

export const NoticeBar = createHostComponent<NoticeBarProps, NoticeBarExpose>('dora-notice-bar',
{
  prefixCls: 'dora-notice-bar',
  icon: 'data:image/gif;base64,R0lGODlhAQABAAAAACw=',
  content: '',
  mode: '',
  action: 'data:image/gif;base64,R0lGODlhAQABAAAAACw=',
  loop: false,
  leading: 500,
  trailing: 800,
  speed: 25,
})

NoticeBar.displayName = 'DoraNoticeBar'
