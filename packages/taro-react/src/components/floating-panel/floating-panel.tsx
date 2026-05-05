import { createHostComponent } from '../../hooks/hostComponent'
import type { FloatingPanelProps, FloatingPanelExpose } from './types'

export const FloatingPanel = createHostComponent<FloatingPanelProps, FloatingPanelExpose>('dora-floating-panel',
{
  prefixCls: 'dora-floating-panel',
  disabled: false,
  hoverClass: 'default',
  wrapStyle: null,
})

FloatingPanel.displayName = 'DoraFloatingPanel'
