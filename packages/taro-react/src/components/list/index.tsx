import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import { List } from './list'
import type { ListProps, ListExpose } from './types'
import ListItem from '../list-item'

export type { ListProps, ListExpose }

type CompoundedComponent = ForwardRefExoticComponent<ListProps & RefAttributes<ListExpose>> & {
  Item: typeof ListItem
}

const InnerList = List as CompoundedComponent

InnerList.Item = ListItem

export default InnerList
