import { createHostComponent } from '../../hooks/hostComponent'
import type { TabProps, TabExpose } from './types'

export const Tab = createHostComponent<TabProps, TabExpose>('dora-tab',
{
  prefixCls: 'dora-tabs__tab',
  key: '',
  title: '',
  disabled: false,
})

Tab.displayName = 'DoraTab'
