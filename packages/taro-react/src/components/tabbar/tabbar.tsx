import { createHostComponent } from '../../hooks/hostComponent'
import type { TabbarProps, TabbarExpose } from './types'

export const Tabbar = createHostComponent<TabbarProps, TabbarExpose>('dora-tabbar',
{
  prefixCls: 'dora-tabbar',
  defaultCurrent: '',
  current: '',
  controlled: false,
  theme: 'balanced',
  backgroundColor: '#fff',
  position: '',
  safeArea: false,
})

Tabbar.displayName = 'DoraTabbar'
