import type { LandscapeProps as NativeLandscapeProps, LandscapeExpose as NativeLandscapeExpose } from '@doraemon-ui/miniprogram.landscape'
import type { BasicComponent } from '../../types'

export interface LandscapeProps extends NativeLandscapeProps, BasicComponent {
  onClose?: (event: any) => void
}

export interface LandscapeExpose extends NativeLandscapeExpose {}
