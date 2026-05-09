import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import { Grid } from './grid'
import type { GridProps, GridExpose } from './types'
import GridItem from '../grid-item'

export type { GridProps, GridExpose }

type CompoundedComponent = ForwardRefExoticComponent<GridProps & RefAttributes<GridExpose>> & {
  Item: typeof GridItem
}

const InnerGrid = Grid as CompoundedComponent

InnerGrid.Item = GridItem

export default InnerGrid
