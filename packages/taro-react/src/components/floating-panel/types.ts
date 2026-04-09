import type {
  FloatingPanelProps as NativeFloatingPanelProps,
  FloatingPanelExpose as NativeFloatingPanelExpose,
} from '@doraemon-ui/miniprogram.floating-panel'
import type { BasicComponent } from '@/types'

export interface FloatingPanelProps extends NativeFloatingPanelProps, BasicComponent {}

export interface FloatingPanelExpose extends NativeFloatingPanelExpose {}
