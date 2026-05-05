import { createHostComponent } from '../../hooks/hostComponent'
import type { UploadProps, UploadExpose } from './types'

export const Upload = createHostComponent<UploadProps, UploadExpose>('dora-upload',
{
  prefixCls: 'dora-upload',
  max: -1,
  count: 9,
  defaultFileType: 'image',
  compressed: true,
  maxDuration: 60,
  camera: 'back',
  sizeType: ['original', 'compressed'],
  sourceType: ['album', 'camera'],
  url: '',
  name: 'file',
  header: {},
  formData: {},
  uploaded: true,
  disabled: false,
  progress: false,
  listType: 'text',
  defaultFileList: [],
  fileList: [],
  controlled: false,
  showUploadList: true,
  showRemoveIcon: true,
})

Upload.displayName = 'DoraUpload'
