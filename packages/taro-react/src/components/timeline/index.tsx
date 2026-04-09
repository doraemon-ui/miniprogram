import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import { Timeline } from './timeline'
import type { TimelineProps, TimelineExpose } from './types'
import TimelineItem from '../timeline-item'

export type { TimelineProps, TimelineExpose }

type CompoundedComponent = ForwardRefExoticComponent<TimelineProps & RefAttributes<TimelineExpose>> & {
  Item: typeof TimelineItem
}

const InnerTimeline = Timeline as CompoundedComponent

InnerTimeline.Item = TimelineItem

export default InnerTimeline
