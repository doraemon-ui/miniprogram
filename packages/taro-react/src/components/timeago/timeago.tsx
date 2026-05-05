import { createHostComponent } from '../../hooks/hostComponent'
import type { TimeagoProps, TimeagoExpose } from './types'

export const Timeago = createHostComponent<TimeagoProps, TimeagoExpose>('dora-timeago',
{
  prefixCls: 'dora-timeago',
  to: null,
  from: null,
  refreshable: false,
  lang: 'zh_CN',
})

Timeago.displayName = 'DoraTimeago'
