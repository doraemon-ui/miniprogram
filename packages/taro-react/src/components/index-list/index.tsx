import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import { IndexList } from './index-list'
import type { IndexListProps, IndexListExpose } from './types'
import IndexListItem from '../index-list-item'

export type { IndexListProps, IndexListExpose }

type CompoundedComponent = ForwardRefExoticComponent<IndexListProps & RefAttributes<IndexListExpose>> & {
  Item: typeof IndexListItem
}

const InnerIndexList = IndexList as CompoundedComponent

InnerIndexList.Item = IndexListItem

export default InnerIndexList
