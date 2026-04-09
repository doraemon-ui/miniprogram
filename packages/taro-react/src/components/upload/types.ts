import type { UploadProps as NativeUploadProps, UploadExpose as NativeUploadExpose } from '@doraemon-ui/miniprogram.upload'
import type { BasicComponent } from '@/types'

export interface UploadProps extends NativeUploadProps, BasicComponent {}

export interface UploadExpose extends NativeUploadExpose {}
