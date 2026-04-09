import { createHostComponent } from '@/hooks/hostComponent'
import type { ProgressProps, ProgressExpose } from './types'

export const Progress = createHostComponent<ProgressProps, ProgressExpose>('dora-progress')

Progress.displayName = 'DoraProgress'
