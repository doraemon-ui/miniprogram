import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import { Row } from './layout'
import type { RowProps, RowExpose } from './types'
import Col from '../col'

export type { RowProps, RowExpose }

type CompoundedComponent = ForwardRefExoticComponent<RowProps & RefAttributes<RowExpose>> & {
  Col: typeof Col
}

const InnerRow = Row as CompoundedComponent

InnerRow.Col = Col

export default InnerRow
