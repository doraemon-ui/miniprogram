import { createHostComponent } from '../../hooks/hostComponent'
import type { TabbarItemProps, TabbarItemExpose } from './types'

export const TabbarItem = createHostComponent<TabbarItemProps, TabbarItemExpose>('dora-tabbar-item',
{
  prefixCls: 'dora-tabbar-item',
  tabKey: '',
  title: '',
  disabled: false,
})

TabbarItem.displayName = 'DoraTabbarItem'
