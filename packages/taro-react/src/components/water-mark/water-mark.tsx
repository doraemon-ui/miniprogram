import { createHostComponent } from '@/hooks/hostComponent'
import type { WaterMarkProps, WaterMarkExpose } from './types'

export const WaterMark = createHostComponent<WaterMarkProps, WaterMarkExpose>('dora-water-mark')

WaterMark.displayName = 'DoraWaterMark'
