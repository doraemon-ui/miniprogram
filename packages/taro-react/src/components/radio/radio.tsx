import { createHostComponent } from '@/hooks/hostComponent'
import type { RadioProps, RadioExpose } from './types'

export const Radio = createHostComponent<RadioProps, RadioExpose>('dora-radio')

Radio.displayName = 'DoraRadio'
