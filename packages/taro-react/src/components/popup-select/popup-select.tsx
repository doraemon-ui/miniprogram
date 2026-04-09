import { createHostComponent } from '@/hooks/hostComponent'
import type { PopupSelectProps, PopupSelectExpose } from './types'

export const PopupSelect = createHostComponent<PopupSelectProps, PopupSelectExpose>('dora-popup-select')

PopupSelect.displayName = 'DoraPopupSelect'
