import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import { VirtualList } from './virtual-list'
import type { VirtualListProps, VirtualListExpose } from './types'
import VirtualListItem from '../virtual-list-item'

export type { VirtualListProps, VirtualListExpose }

type CompoundedComponent = ForwardRefExoticComponent<VirtualListProps & RefAttributes<VirtualListExpose>> & {
  Item: typeof VirtualListItem
}

const InnerVirtualList = VirtualList as CompoundedComponent

InnerVirtualList.Item = VirtualListItem

export default InnerVirtualList
