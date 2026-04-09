import type { StickyProps as NativeStickyProps, StickyExpose as NativeStickyExpose } from '@doraemon-ui/miniprogram.sticky'
import type { BasicComponent } from '@/types'

export interface StickyProps extends NativeStickyProps, BasicComponent {}

export interface StickyExpose extends NativeStickyExpose {}
