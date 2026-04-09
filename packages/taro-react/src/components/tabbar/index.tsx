import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import { Tabbar } from './tabbar'
import type { TabbarProps, TabbarExpose } from './types'
import TabbarItem from '../tabbar-item'

export type { TabbarProps, TabbarExpose }

type CompoundedComponent = ForwardRefExoticComponent<TabbarProps & RefAttributes<TabbarExpose>> & {
  Item: typeof TabbarItem
}

const InnerTabbar = Tabbar as CompoundedComponent

InnerTabbar.Item = TabbarItem

export default InnerTabbar
