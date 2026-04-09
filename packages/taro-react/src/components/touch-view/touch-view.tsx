import { createHostComponent } from '@/hooks/hostComponent'
import type { TouchViewProps, TouchViewExpose } from './types'

export const TouchView = createHostComponent<TouchViewProps, TouchViewExpose>('dora-touch-view')

TouchView.displayName = 'DoraTouchView'
