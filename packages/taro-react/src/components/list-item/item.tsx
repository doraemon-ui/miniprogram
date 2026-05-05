import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { ListItemProps, ListItemExpose } from './types'

export const ListItem = createHostComponent<ListItemProps, ListItemExpose>('dora-list-item')

ListItem.displayName = 'DoraListItem'

// Props registry for Taro WXML template generator
React.createElement('dora-list-item', {
  prefixCls: '',
  thumb: '',
  title: '',
  label: '',
  extra: '',
  hasLine: false,
  isLink: false,
  align: 'flex-start',
  wrapStyle: {},
  url: '',
  urlParams: {},
  delta: 0,
  disabled: false,
  openType: '',
  hoverClass: '',
  hoverStopPropagation: false,
  hoverStartTime: 0,
  hoverStayTime: 0,
  lang: 'en',
  sessionFrom: '',
  sendMessageTitle: '',
  sendMessagePath: '',
  sendMessageImg: '',
  showMessageCard: false,
  phoneNumberNoQuotaToast: false,
  appParameter: '',
  onClick: undefined,
})
