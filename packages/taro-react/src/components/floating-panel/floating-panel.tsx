import { createHostComponent } from '@/hooks/hostComponent'
import type { FloatingPanelProps, FloatingPanelExpose } from './types'

export const FloatingPanel = createHostComponent<FloatingPanelProps, FloatingPanelExpose>('dora-floating-panel')

FloatingPanel.displayName = 'DoraFloatingPanel'
