import { createHostComponent } from '../../hooks/hostComponent'
import type { TabsProps, TabsExpose } from './types'

export const Tabs = createHostComponent<TabsProps, TabsExpose>('dora-tabs',
{
  prefixCls: 'dora-tabs',
  defaultCurrent: '',
  current: '',
  scroll: false,
  controlled: false,
  theme: 'balanced',
  direction: 'horizontal',
  justify: 'space-around',
  activeLineMode: 'auto',
})

Tabs.displayName = 'DoraTabs'
