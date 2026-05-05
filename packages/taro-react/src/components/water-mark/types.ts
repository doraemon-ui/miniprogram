import type { WaterMarkProps as NativeWaterMarkProps, WaterMarkExpose as NativeWaterMarkExpose } from '@doraemon-ui/miniprogram.water-mark'
import type { BasicComponent } from '../../types'

export interface WaterMarkProps extends NativeWaterMarkProps, BasicComponent {
  onLoad?: (event: any) => void
  onError?: (event: any) => void
}

export interface WaterMarkExpose extends NativeWaterMarkExpose {}
