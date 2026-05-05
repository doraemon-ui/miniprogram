import { createHostComponent } from '../../hooks/hostComponent'
import type { VirtualListProps, VirtualListExpose } from './types'

export const VirtualList = createHostComponent<VirtualListProps, VirtualListExpose>('dora-virtual-list',
{
  prefixCls: 'dora-virtual-list',
  itemHeight: 50,
  itemBuffer: 0,
  scrollToIndex: 0,
  upperThreshold: 50,
  lowerThreshold: 50,
  scrollWithAnimation: false,
  enableBackToTop: false,
  disableScroll: false,
  enablePageScroll: false,
  height: 300,
  debounce: 0,
})

VirtualList.displayName = 'DoraVirtualList'
