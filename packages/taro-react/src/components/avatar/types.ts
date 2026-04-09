import type { AvatarProps as NativeAvatarProps, AvatarExpose as NativeAvatarExpose } from '@doraemon-ui/miniprogram.avatar'
import type { BasicComponent } from '@/types'

export interface AvatarProps extends NativeAvatarProps, BasicComponent {}

export interface AvatarExpose extends NativeAvatarExpose {}
