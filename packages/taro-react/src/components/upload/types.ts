import type { UploadProps as NativeUploadProps, UploadExpose as NativeUploadExpose } from '@doraemon-ui/miniprogram.upload'
import type { BasicComponent } from '../../types'

export interface UploadProps extends NativeUploadProps, BasicComponent {
  onBefore?: (event: any) => void
  onChange?: (event: any) => void
  onSuccess?: (event: any) => void
  onFail?: (event: any) => void
  onProgress?: (event: any) => void
  onComplete?: (event: any) => void
  onPreview?: (event: any) => void
  onRemove?: (event: any) => void
}

export interface UploadExpose extends NativeUploadExpose {}
