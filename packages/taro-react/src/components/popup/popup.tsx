import { createHostComponent } from '@/hooks/hostComponent'
import type { PopupProps, PopupExpose } from './types'

export const Popup = createHostComponent<PopupProps, PopupExpose>('dora-popup')

Popup.displayName = 'DoraPopup'
