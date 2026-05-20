import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { FloatingPanel } from './index'

export interface FloatingPanelBounds {
  top: number
  bottom: number
}

export interface FloatingPanelProps {
  prefixCls?: string
  defaultAnchors?: number[]
}

export interface FloatingPanelExpose {
  setHeight(height: number, options?: { immediate?: boolean }): void
}

export type FloatingPanelInstance = ComponentPublicInstance<FloatingPanel, FloatingPanelProps, FloatingPanelExpose>
