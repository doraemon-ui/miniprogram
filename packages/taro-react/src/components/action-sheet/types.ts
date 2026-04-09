import type {
  ActionSheetProps as NativeActionSheetProps,
  ActionSheetExpose as NativeActionSheetExpose,
} from '@doraemon-ui/miniprogram.action-sheet'
import type { BasicComponent } from '@/types'

export interface ActionSheetProps extends NativeActionSheetProps, BasicComponent {}

export interface ActionSheetExpose extends NativeActionSheetExpose {}
