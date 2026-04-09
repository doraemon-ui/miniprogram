import type { TagProps as NativeTagProps, TagExpose as NativeTagExpose } from '@doraemon-ui/miniprogram.tag'
import type { BasicComponent } from '@/types'

export interface TagProps extends NativeTagProps, BasicComponent {}

export interface TagExpose extends NativeTagExpose {}
