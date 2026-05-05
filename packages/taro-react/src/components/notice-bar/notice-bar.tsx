import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { NoticeBarProps, NoticeBarExpose } from './types'

export const NoticeBar = createHostComponent<NoticeBarProps, NoticeBarExpose>('dora-notice-bar')

NoticeBar.displayName = 'DoraNoticeBar'

// Props registry for Taro WXML template generator
React.createElement('dora-notice-bar', {
  prefixCls: '',
  icon: '',
  content: '',
  mode: '',
  action: '',
  loop: false,
  leading: 0,
  trailing: 0,
  speed: 0,
  onClick: undefined,
})
