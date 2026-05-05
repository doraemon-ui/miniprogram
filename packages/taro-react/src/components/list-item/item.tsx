import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { ListItemProps, ListItemExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const ListItem = createHostComponent<ListItemProps, ListItemExpose>('dora-list-item',
{
  prefixCls: 'dora-list-item',
  thumb: '',
  title: '',
  label: '',
  extra: '',
  hasLine: true,
  isLink: false,
  align: 'center',
  wrapStyle: null,
  url: '',
  urlParams: null,
  delta: 1,
  disabled: false,
  openType: '',
  hoverClass: 'default',
  hoverStopPropagation: false,
  hoverStartTime: 20,
  hoverStayTime: 70,
  lang: 'en',
  sessionFrom: '',
  sendMessageTitle: '',
  sendMessagePath: '',
  sendMessageImg: '',
  showMessageCard: false,
  phoneNumberNoQuotaToast: true,
  appParameter: '',
})

ListItem.displayName = 'DoraListItem'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-list-item', {
  prefixCls: '',
  thumb: '',
  title: '',
  label: '',
  extra: '',
  hasLine: '',
  isLink: '',
  align: '',
  wrapStyle: '',
  url: '',
  urlParams: '',
  delta: '',
  disabled: '',
  openType: '',
  hoverClass: '',
  hoverStopPropagation: '',
  hoverStartTime: '',
  hoverStayTime: '',
  lang: '',
  sessionFrom: '',
  sendMessageTitle: '',
  sendMessagePath: '',
  sendMessageImg: '',
  showMessageCard: '',
  phoneNumberNoQuotaToast: '',
  appParameter: '',
  onClick: '',
})
