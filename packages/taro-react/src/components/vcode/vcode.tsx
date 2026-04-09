import { createHostComponent } from '@/hooks/hostComponent'
import type { VcodeProps, VcodeExpose } from './types'

export const Vcode = createHostComponent<VcodeProps, VcodeExpose>('dora-vcode')

Vcode.displayName = 'DoraVcode'
