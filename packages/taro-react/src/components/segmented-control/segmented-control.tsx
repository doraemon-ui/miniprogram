import { createHostComponent } from '../../hooks/hostComponent'
import type { SegmentedControlProps, SegmentedControlExpose } from './types'

export const SegmentedControl = createHostComponent<SegmentedControlProps, SegmentedControlExpose>('dora-segmented-control',
{
  prefixCls: 'dora-segmented-control',
  theme: 'balanced',
  defaultCurrent: 0,
  current: 0,
  values: [],
  disabled: false,
  controlled: false,
})

SegmentedControl.displayName = 'DoraSegmentedControl'
