import { createHostComponent } from '@/hooks/hostComponent'
import type { SelectableProps, SelectableExpose } from './types'

export const Selectable = createHostComponent<SelectableProps, SelectableExpose>('dora-selectable')

Selectable.displayName = 'DoraSelectable'
