import { createHostComponent } from '@/hooks/hostComponent'
import type { PopoverProps, PopoverExpose } from './types'

export const Popover = createHostComponent<PopoverProps, PopoverExpose>('dora-popover')

Popover.displayName = 'DoraPopover'
