import { createHostComponent } from '@/hooks/hostComponent'
import type { DialogProps, DialogExpose } from './types'

export const Dialog = createHostComponent<DialogProps, DialogExpose>('dora-dialog')

Dialog.displayName = 'DoraDialog'
