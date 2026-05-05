import type { ActionSheetProps as NativeActionSheetProps, ActionSheetExpose as NativeActionSheetExpose } from '@doraemon-ui/miniprogram.action-sheet'
import type { BasicComponent } from '../../types'

export interface ActionSheetProps extends NativeActionSheetProps, BasicComponent {
  onClosed?: (event: any) => void
  onClose?: (event: any) => void
  onCancel?: (event: any) => void
  onAction?: (event: any) => void
  onDestructive?: (event: any) => void
}

export interface ActionSheetExpose extends NativeActionSheetExpose {}
