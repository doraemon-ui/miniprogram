import type { PromptExpose as NativePromptExpose, PromptProps as NativePromptProps } from '@doraemon-ui/miniprogram.prompt'

import type { BasicComponent } from '../../types'

export interface PromptProps extends NativePromptProps, BasicComponent {
  onClick?: (event: any) => void
}

export interface PromptExpose extends NativePromptExpose {}
