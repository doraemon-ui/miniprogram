import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import { Sticky } from './sticky'
import type { StickyProps, StickyExpose } from './types'
import StickyItem from '../sticky-item'

export type { StickyProps, StickyExpose }

type CompoundedComponent = ForwardRefExoticComponent<StickyProps & RefAttributes<StickyExpose>> & {
  Item: typeof StickyItem
}

const InnerSticky = Sticky as CompoundedComponent

InnerSticky.Item = StickyItem

export default InnerSticky
