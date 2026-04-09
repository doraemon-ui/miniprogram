import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Upload } from './index'

/**
 * UploadFile接口定义
 */
export interface UploadFile {
  /**
   * uid
   * @type {string}
   */
  uid?: string

  /**
   * url
   * @type {string}
   */
  url: string

  /**
   * status
   * @type {'uploading' | 'done' | 'error' | 'remove'}
   */
  status?: 'uploading' | 'done' | 'error' | 'remove'

  /**
   * progress
   * @type {number}
   */
  progress?: number

  /**
   * res
   * @type {unknown}
   */
  res?: unknown
}

/**
 * UploadTaskLike接口定义
 */
export interface UploadTaskLike {
  /**
   * 取消上传
   *
   * @return {void}
   */
  abort(): void
  onProgressUpdate?(cb: (res: { progress: number }) => void): void
}

/**
 * UploadProps接口定义
 */
export interface UploadProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * max
   * @type {number}
   */
  max?: number

  /**
   * count
   * @type {number}
   */
  count?: number

  /**
   * defaultFileType
   * @type {string}
   */
  defaultFileType?: string

  /**
   * compressed
   * @type {boolean}
   */
  compressed?: boolean

  /**
   * maxDuration
   * @type {number}
   */
  maxDuration?: number

  /**
   * camera
   * @type {string}
   */
  camera?: string

  /**
   * sizeType
   * @type {string[]}
   */
  sizeType?: string[]

  /**
   * sourceType
   * @type {string[]}
   */
  sourceType?: string[]

  /**
   * url
   * @type {string}
   */
  url?: string

  /**
   * name
   * @type {string}
   */
  name?: string

  /**
   * header
   * @type {Record<string, unknown>}
   */
  header?: Record<string, unknown>

  /**
   * formData
   * @type {Record<string, unknown>}
   */
  formData?: Record<string, unknown>

  /**
   * uploaded
   * @type {boolean}
   */
  uploaded?: boolean

  /**
   * disabled
   * @type {boolean}
   */
  disabled?: boolean

  /**
   * progress
   * @type {boolean}
   */
  progress?: boolean

  /**
   * listType
   * @type {string}
   */
  listType?: string

  /**
   * defaultFileList
   * @type {UploadFile[]}
   */
  defaultFileList?: UploadFile[]

  /**
   * fileList
   * @type {UploadFile[]}
   */
  fileList?: UploadFile[]

  /**
   * controlled
   * @type {boolean}
   */
  controlled?: boolean

  /**
   * showUploadList
   * @type {boolean}
   */
  showUploadList?: boolean

  /**
   * showRemoveIcon
   * @type {boolean}
   */
  showRemoveIcon?: boolean
}

/**
 * UploadExpose接口定义
 */
export interface UploadExpose {}

/**
 * UploadInstance类型定义
 */
export type UploadInstance = ComponentPublicInstance<Upload, UploadProps, UploadExpose>
