import { createHostComponent } from '../../hooks/hostComponent'
import type { RefresherProps, RefresherExpose } from './types'

export const Refresher = createHostComponent<RefresherProps, RefresherExpose>('dora-refresher',
{
  prefixCls: 'dora-refresher',
  pullingIcon: '',
  pullingText: '下拉刷新',
  refreshingIcon: '',
  refreshingText: '正在刷新',
  disablePullingRotation: false,
  distance: 30,
  prefixLCls: 'dora-loader',
  isShowLoadingText: false,
  loadingText: '正在加载',
  loadNoDataText: '没有更多数据',
  scrollTop: 0,
})

Refresher.displayName = 'DoraRefresher'
