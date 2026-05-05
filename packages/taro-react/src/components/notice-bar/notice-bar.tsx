import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { NoticeBarProps, NoticeBarExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
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

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-notice-bar', {
  prefixCls: '',
  icon: '',
  content: '',
  mode: '',
  action: '',
  loop: '',
  leading: '',
  trailing: '',
  speed: '',
  onClick: '',
})
