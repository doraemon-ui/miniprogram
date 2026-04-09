import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { CustomEvent } from '@doraemon-ui/miniprogram.core-js'
import { chooseMedia, uploadFile } from '@doraemon-ui/miniprogram.shared'
import type { UploadFile, UploadTaskLike } from './types'

const { classNames } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-upload',
    },
  },
})
class Upload extends Doraemon {
  prefixCls!: string

  @Prop({
    type: Number,
    default: -1,
  })
  max: number
  @Prop({
    type: Number,
    default: 9,
  })
  count: number
  @Prop({
    type: String,
    default: 'image',
  })
  defaultFileType: string
  @Prop({
    type: Boolean,
    default: true,
  })
  compressed: boolean
  @Prop({
    type: Number,
    default: 60,
  })
  maxDuration: number
  @Prop({
    type: String,
    default: 'back',
  })
  camera: string
  @Prop({
    type: Array,
    default: ['original', 'compressed'],
  })
  sizeType: string[]
  @Prop({
    type: Array,
    default: ['album', 'camera'],
  })
  sourceType: string[]
  @Prop({
    type: String,
    default: '',
  })
  url: string
  @Prop({
    type: String,
    default: 'file',
  })
  name: string
  @Prop({
    type: Object,
    default: {},
  })
  header: Record<string, unknown>
  @Prop({
    type: Object,
    default: {},
  })
  formData: Record<string, unknown>
  @Prop({
    type: Boolean,
    default: true,
  })
  uploaded: boolean
  @Prop({
    type: Boolean,
    default: false,
  })
  disabled: boolean
  @Prop({
    type: Boolean,
    default: false,
  })
  progress: boolean
  @Prop({
    type: String,
    default: 'text',
  })
  listType: string
  @Prop({
    type: Array,
    default: [],
  })
  defaultFileList: UploadFile[]
  @Prop({
    type: Array,
    default: [],
  })
  fileList: UploadFile[]
  @Prop({
    type: Boolean,
    default: false,
  })
  controlled: boolean
  @Prop({
    type: Boolean,
    default: true,
  })
  showUploadList: boolean
  @Prop({
    type: Boolean,
    default: true,
  })
  showRemoveIcon: boolean

  uploadMax: number = -1
  uploadCount: number = 9
  uploadFileList: UploadFile[] = []
  isVideo: boolean = false

  private index = 0
  private createdAt = Date.now()
  private uploadTask: Record<string, UploadTaskLike> = {}
  private tempFilePaths: UploadFile[] = []

  get classes() {
    const p = this.prefixCls
    const wrap = classNames(p, {
      [`${p}--${this.listType}`]: !!this.listType,
      [`${p}--disabled`]: this.disabled,
    })

    return {
      wrap,
      files: `${p}__files`,
      file: `${p}__file`,
      thumb: `${p}__thumb`,
      remove: `${p}__remove`,
      select: `${p}__select`,
      button: `${p}__button`,
    }
  }

  @Watch('max')
  onMaxChange() {
    this.updated()
  }

  @Watch('count')
  onCountChange() {
    this.updated()
  }

  @Watch('fileList')
  onFileListChange(newVal: UploadFile[]) {
    if (this.controlled) this.uploadFileList = newVal || []
  }

  getUid() {
    this.index += 1
    return `dora-upload--${this.createdAt}-${this.index}`
  }

  calcValue(count: number, max: number) {
    const realCount = parseInt(String(count), 10) || 0
    const uploadMax = parseInt(String(max), 10) > -1 ? parseInt(String(max), 10) : -1
    let uploadCount = realCount
    if (uploadMax !== -1 && uploadMax <= 9 && realCount > uploadMax) uploadCount = uploadMax
    return { uploadMax, uploadCount }
  }

  updated() {
    const { uploadMax, uploadCount } = this.calcValue(this.count, this.max)
    if (this.uploadMax !== uploadMax) this.uploadMax = uploadMax
    if (this.uploadCount !== uploadCount) this.uploadCount = uploadCount
  }

  onSelect() {
    const leftMax = this.uploadMax > -1 ? this.uploadMax - this.uploadFileList.length : this.uploadCount
    const { uploadCount: count } = this.calcValue(this.uploadCount, leftMax)
    if (this.disabled) return

    const success = (res: { tempFiles: Array<{ tempFilePath: string }> }) => {
      this.tempFilePaths = (res.tempFiles || []).map((item) => ({ url: item.tempFilePath, uid: this.getUid() }))
      this.$emit('before', { ...res, fileList: this.uploadFileList })
      if (this.uploaded) this.uploadFile()
    }

    if (this.isVideo) {
      chooseMedia({
        mediaType: ['video'],
        sourceType: this.sourceType,
        compressed: this.compressed,
        maxDuration: this.maxDuration,
        camera: this.camera,
        success,
      })
      return
    }

    chooseMedia({
      mediaType: ['image'],
      count,
      sizeType: this.sizeType,
      sourceType: this.sourceType,
      success,
    })
  }

  onChange(info: { file?: UploadFile; fileList: UploadFile[] }) {
    if (!this.controlled) this.uploadFileList = info.fileList || []
    this.$emit('change', info)
  }

  onStart(file: UploadFile) {
    const targetItem = { ...file, status: 'uploading' as const }
    this.onChange({
      file: targetItem,
      fileList: [...this.uploadFileList, targetItem],
    })
  }

  onSuccess(file: UploadFile, res: unknown) {
    const fileList = [...this.uploadFileList]
    const index = fileList.map((item) => item.uid).indexOf(file.uid)
    if (index !== -1) {
      const targetItem = { ...file, status: 'done' as const, res }
      fileList.splice(index, 1, targetItem)
      const info = { file: targetItem, fileList }
      this.$emit('success', info)
      this.onChange(info)
    }
  }

  onFail(file: UploadFile, res: unknown) {
    const fileList = [...this.uploadFileList]
    const index = fileList.map((item) => item.uid).indexOf(file.uid)
    if (index !== -1) {
      const targetItem = { ...file, status: 'error' as const, res }
      fileList.splice(index, 1, targetItem)
      const info = { file: targetItem, fileList }
      this.$emit('fail', info)
      this.onChange(info)
    }
  }

  onProgress(file: UploadFile, res: { progress: number }) {
    const fileList = [...this.uploadFileList]
    const index = fileList.map((item) => item.uid).indexOf(file.uid)
    if (index !== -1) {
      const targetItem = { ...file, progress: res.progress, res }
      fileList.splice(index, 1, targetItem)
      const info = { file: targetItem, fileList }
      this.$emit('progress', info)
      this.onChange(info)
    }
  }

  uploadFile() {
    if (!this.tempFilePaths.length) return
    const file = this.tempFilePaths.shift()
    if (!file) return
    const uid = String(file.uid)
    const filePath = file.url
    if (!this.url || !filePath || this.disabled) return

    this.onStart(file)
    this.uploadTask[uid] = uploadFile({
      url: this.url,
      filePath,
      name: this.name,
      header: this.header,
      formData: this.formData,
      success: (res: unknown) => this.onSuccess(file, res),
      fail: (res: unknown) => this.onFail(file, res),
      complete: (res: unknown) => {
        delete this.uploadTask[uid]
        this.$emit('complete', res)
        this.uploadFile()
      },
    }) as UploadTaskLike

    if (this.progress && this.uploadTask[uid]?.onProgressUpdate) {
      this.uploadTask[uid].onProgressUpdate!((res) => this.onProgress(file, res))
    }
  }

  onPreview(e: CustomEvent) {
    const dataset = (e.currentTarget as any)?.dataset || {}
    this.$emit('preview', { ...dataset, fileList: this.uploadFileList })
  }

  onRemove(e: CustomEvent) {
    const dataset = (e.currentTarget as any)?.dataset || {}
    const file = dataset.file as UploadFile
    const fileList = [...this.uploadFileList]
    const index = fileList.map((item) => item.uid).indexOf(file.uid)
    if (index !== -1) {
      const targetItem = { ...file, status: 'remove' as const }
      fileList.splice(index, 1)
      const info = { file: targetItem, fileList }
      this.$emit('remove', { ...dataset, ...info })
      this.onChange(info)
    }
  }

  abort(uid?: string) {
    if (uid) {
      if (this.uploadTask[uid]) {
        this.uploadTask[uid].abort()
        delete this.uploadTask[uid]
      }
      return
    }
    Object.keys(this.uploadTask).forEach((taskUid) => {
      this.uploadTask[taskUid]?.abort()
      delete this.uploadTask[taskUid]
    })
  }

  mounted() {
    this.uploadFileList = this.controlled ? this.fileList : this.defaultFileList
    this.isVideo = this.defaultFileType === 'video'
    this.updated()
  }

  detached() {
    this.abort()
  }
}

export { Upload }

export default defineComponentHOC()(Upload)
