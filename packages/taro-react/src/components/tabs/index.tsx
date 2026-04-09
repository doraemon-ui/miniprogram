import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import { Tabs } from './tabs'
import type { TabsProps, TabsExpose } from './types'
import Tab from '../tab'

export type { TabsProps, TabsExpose }

type CompoundedComponent = ForwardRefExoticComponent<TabsProps & RefAttributes<TabsExpose>> & {
  Tab: typeof Tab
}

const InnerTabs = Tabs as CompoundedComponent

InnerTabs.Tab = Tab

export default InnerTabs
