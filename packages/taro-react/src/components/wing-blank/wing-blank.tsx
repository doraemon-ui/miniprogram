import { createHostComponent } from '@/hooks/hostComponent'
import type { WingBlankProps, WingBlankExpose } from './types'

export const WingBlank = createHostComponent<WingBlankProps, WingBlankExpose>('dora-wing-blank')

WingBlank.displayName = 'DoraWingBlank'
