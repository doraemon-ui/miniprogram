import type { BarcodeProps as NativeBarcodeProps, BarcodeExpose as NativeBarcodeExpose } from '@doraemon-ui/miniprogram.barcode'
import type { BasicComponent } from '@/types'

export interface BarcodeProps extends NativeBarcodeProps, BasicComponent {}

export interface BarcodeExpose extends NativeBarcodeExpose {}
