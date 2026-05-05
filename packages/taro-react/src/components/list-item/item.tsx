import { createHostComponent } from '../../hooks/hostComponent'
import type { ListItemProps, ListItemExpose } from './types'

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
