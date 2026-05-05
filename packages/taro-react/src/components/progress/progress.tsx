import { createHostComponent } from '../../hooks/hostComponent'
import type { ProgressProps, ProgressExpose } from './types'

export const Progress = createHostComponent<ProgressProps, ProgressExpose>('dora-progress',
{
  prefixCls: 'dora-progress',
  percent: 0,
  strokeWidth: 10,
  activeColor: '',
  backgroundColor: '#f3f3f3',
  status: 'normal',
  shape: 'round',
  barStyle: null,
  showInfo: false,
})

Progress.displayName = 'DoraProgress'
