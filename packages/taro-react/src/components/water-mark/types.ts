import type { WaterMarkProps as NativeWaterMarkProps, WaterMarkExpose as NativeWaterMarkExpose } from '@doraemon-ui/miniprogram.water-mark'
import type { BasicComponent } from '@/types'

export interface WaterMarkProps extends NativeWaterMarkProps, BasicComponent {}

export interface WaterMarkExpose extends NativeWaterMarkExpose {}
