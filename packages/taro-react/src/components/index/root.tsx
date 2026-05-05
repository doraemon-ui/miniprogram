import { createHostComponent } from '../../hooks/hostComponent'
import type { IndexProps, IndexExpose } from './types'

export const Index = createHostComponent<IndexProps, IndexExpose>('dora-index',
{
  prefixCls: 'dora-index',
  height: 300,
  showIndicator: true,
  indicatorPosition: 'center',
  parentOffsetTop: 0,
})

Index.displayName = 'DoraIndex'
