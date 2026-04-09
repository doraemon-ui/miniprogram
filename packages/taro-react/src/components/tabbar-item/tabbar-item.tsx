import { createHostComponent } from '@/hooks/hostComponent'
import type { TabbarItemProps, TabbarItemExpose } from './types'

export const TabbarItem = createHostComponent<TabbarItemProps, TabbarItemExpose>('dora-tabbar-item')

TabbarItem.displayName = 'DoraTabbarItem'
