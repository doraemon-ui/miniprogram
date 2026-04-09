import { createHostComponent } from '@/hooks/hostComponent'
import type { TabProps, TabExpose } from './types'

export const Tab = createHostComponent<TabProps, TabExpose>('dora-tab')

Tab.displayName = 'DoraTab'
