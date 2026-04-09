import { createHostComponent } from '@/hooks/hostComponent'
import type { TabsProps, TabsExpose } from './types'

export const Tabs = createHostComponent<TabsProps, TabsExpose>('dora-tabs')

Tabs.displayName = 'DoraTabs'
