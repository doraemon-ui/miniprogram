import { createHostComponent } from '@/hooks/hostComponent'
import type { UploadProps, UploadExpose } from './types'

export const Upload = createHostComponent<UploadProps, UploadExpose>('dora-upload')

Upload.displayName = 'DoraUpload'
