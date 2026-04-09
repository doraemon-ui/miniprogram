import type { CascaderProps as NativeCascaderProps, CascaderExpose as NativeCascaderExpose } from '@doraemon-ui/miniprogram.cascader'
import type { BasicComponent } from '@/types'

export interface CascaderProps extends NativeCascaderProps, BasicComponent {}

export interface CascaderExpose extends NativeCascaderExpose {}
