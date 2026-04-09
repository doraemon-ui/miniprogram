import { createHostComponent } from '@/hooks/hostComponent'
import type { ESignProps, ESignExpose } from './types'

export const ESign = createHostComponent<ESignProps, ESignExpose>('dora-e-sign')

ESign.displayName = 'DoraESign'
