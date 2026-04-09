import type {
  WhiteSpaceProps as NativeWhiteSpaceProps,
  WhiteSpaceExpose as NativeWhiteSpaceExpose,
} from '@doraemon-ui/miniprogram.white-space'
import type { BasicComponent } from '@/types'

export interface WhiteSpaceProps extends NativeWhiteSpaceProps, BasicComponent {}

export interface WhiteSpaceExpose extends NativeWhiteSpaceExpose {}
