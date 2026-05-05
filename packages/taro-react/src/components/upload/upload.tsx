import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { UploadProps, UploadExpose } from './types'

export const Upload = createHostComponent<UploadProps, UploadExpose>('dora-upload')

Upload.displayName = 'DoraUpload'

// Props registry for Taro WXML template generator
React.createElement('dora-upload', {
  prefixCls: '',
  max: 0,
  count: 0,
  defaultFileType: '',
  compressed: false,
  maxDuration: 0,
  camera: '',
  sizeType: [],
  sourceType: [],
  url: '',
  name: '',
  header: {},
  formData: {},
  uploaded: false,
  disabled: false,
  progress: false,
  listType: '',
  defaultFileList: [],
  fileList: [],
  controlled: false,
  showUploadList: false,
  showRemoveIcon: false,
  onBefore: undefined,
  onChange: undefined,
  onSuccess: undefined,
  onFail: undefined,
  onProgress: undefined,
  onComplete: undefined,
  onPreview: undefined,
  onRemove: undefined,
})
