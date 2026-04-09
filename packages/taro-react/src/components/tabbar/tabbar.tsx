import { createHostComponent } from '@/hooks/hostComponent'
import type { TabbarProps, TabbarExpose } from './types'

export const Tabbar = createHostComponent<TabbarProps, TabbarExpose>('dora-tabbar')

Tabbar.displayName = 'DoraTabbar'
