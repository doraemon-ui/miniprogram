import { createHostComponent } from '@/hooks/hostComponent'
import type { BackdropProps, BackdropExpose } from './types'

export const Backdrop = createHostComponent<BackdropProps, BackdropExpose>('dora-backdrop')

Backdrop.displayName = 'DoraBackdrop'
