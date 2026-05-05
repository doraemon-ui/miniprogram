import type { RaterProps as NativeRaterProps, RaterExpose as NativeRaterExpose } from '@doraemon-ui/miniprogram.rater'
import type { BasicComponent } from '../../types'

export interface RaterProps extends NativeRaterProps, BasicComponent {
  onChange?: (event: any) => void
}

export interface RaterExpose extends NativeRaterExpose {}
