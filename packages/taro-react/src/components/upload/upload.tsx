import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { UploadProps, UploadExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
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

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-upload', {
  prefixCls: '',
  max: '',
  count: '',
  defaultFileType: '',
  compressed: '',
  maxDuration: '',
  camera: '',
  sizeType: '',
  sourceType: '',
  url: '',
  name: '',
  header: '',
  formData: '',
  uploaded: '',
  disabled: '',
  progress: '',
  listType: '',
  defaultFileList: '',
  fileList: '',
  controlled: '',
  showUploadList: '',
  showRemoveIcon: '',
  onBefore: '',
  onChange: '',
  onSuccess: '',
  onFail: '',
  onProgress: '',
  onComplete: '',
  onPreview: '',
  onRemove: '',
})
