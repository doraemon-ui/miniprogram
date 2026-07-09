import type { LandscapeExpose as NativeLandscapeExpose, LandscapeProps as NativeLandscapeProps } from '@doraemon-ui/miniprogram.landscape'

import type { BasicComponent } from '../../types'

export interface LandscapeProps extends NativeLandscapeProps, BasicComponent {
  onClose?: (event: any) => void
}

export interface LandscapeExpose extends NativeLandscapeExpose {}
