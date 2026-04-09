import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import { Index } from './root'
import type { IndexProps, IndexExpose } from './types'
import IndexItem from '../index-item'

export type { IndexProps, IndexExpose }

type CompoundedComponent = ForwardRefExoticComponent<IndexProps & RefAttributes<IndexExpose>> & {
  Item: typeof IndexItem
}

const InnerIndex = Index as CompoundedComponent

InnerIndex.Item = IndexItem

export default InnerIndex
