import type { PromptProps as NativePromptProps, PromptExpose as NativePromptExpose } from '@doraemon-ui/miniprogram.prompt'
import type { BasicComponent } from '../../types'

export interface PromptProps extends NativePromptProps, BasicComponent {
  onClick?: (event: any) => void
}

export interface PromptExpose extends NativePromptExpose {}
