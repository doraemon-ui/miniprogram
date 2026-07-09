import type { FloatingPanelExpose as NativeFloatingPanelExpose, FloatingPanelProps as NativeFloatingPanelProps } from '@doraemon-ui/miniprogram.floating-panel'

import type { BasicComponent } from '../../types'

export interface FloatingPanelProps extends NativeFloatingPanelProps, BasicComponent {
  onHeightChange?: (event: any) => void
}

export interface FloatingPanelExpose extends NativeFloatingPanelExpose {}
