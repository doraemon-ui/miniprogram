import { createHostComponent } from '@/hooks/hostComponent'
import type { SegmentedControlProps, SegmentedControlExpose } from './types'

export const SegmentedControl = createHostComponent<SegmentedControlProps, SegmentedControlExpose>('dora-segmented-control')

SegmentedControl.displayName = 'DoraSegmentedControl'
