import { createHostComponent } from '@/hooks/hostComponent'
import type { SelectorGroupProps, SelectorGroupExpose } from './types'

export const SelectorGroup = createHostComponent<SelectorGroupProps, SelectorGroupExpose>('dora-selector-group')

SelectorGroup.displayName = 'DoraSelectorGroup'
