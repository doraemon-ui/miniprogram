import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import { useRef, getSystemInfoSync } from '@doraemon-ui/miniprogram.shared'
import type { MiniprogramNodeRef, MiniprogramPublicInstance } from '@doraemon-ui/miniprogram.shared'
import type { DataUrlOptions, QrcodeStatus } from './types'

const { classNames, styleToCssString } = Doraemon.util

async function toDataURL({ width, height, type = 'png', quality = 1 }: DataUrlOptions, canvas: WechatMiniprogram.Canvas): Promise<string> {
  const fileType = type === 'jpg' || type === 'jpeg' ? 'jpeg' : type
  if (typeof (canvas as any).toDataURL === 'function') {
    return (canvas as any).toDataURL(`image/${fileType}`, quality)
  }
  if (typeof wx !== 'undefined' && typeof wx.canvasToTempFilePath === 'function') {
    const ratio = (getSystemInfoSync(['window']).pixelRatio as number) || 1
    const tempFileType = type === 'jpg' || type === 'jpeg' ? 'jpg' : 'png'
    return await new Promise((resolve) => {
      wx.canvasToTempFilePath({
        destWidth: width * ratio,
        destHeight: height * ratio,
        canvas,
        fileType: tempFileType,
        quality,
        success: (res) => resolve(res.tempFilePath || ''),
        fail: () => resolve(''),
      })
    })
  }
  return ''
}

const hashString = (str: string) => {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24)
  }
  return h >>> 0
}

@Component({
  expose: ['getCanvasNode', 'getBase64Url'],
  props: {
    prefixCls: { type: String, default: 'dora-qrcode' },
  },
})
class Qrcode extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Qrcode
   */
  prefixCls!: string

  /**
   * 二维码版本号
   *
   * @type {number}
   * @memberof Qrcode
   */
  @Prop({
    type: Number,
    default: -1,
  })
  typeNumber: number

  /**
   * 纠错等级
   *
   * @type {number}
   * @memberof Qrcode
   */
  @Prop({
    type: Number,
    default: 2,
  })
  errorCorrectLevel: number

  /**
   * 宽度
   *
   * @type {number}
   * @memberof Qrcode
   */
  @Prop({
    type: Number,
    default: 200,
  })
  width: number

  /**
   * 高度
   *
   * @type {number}
   * @memberof Qrcode
   */
  @Prop({
    type: Number,
    default: 200,
  })
  height: number

  /**
   * 留白
   *
   * @type {number}
   * @memberof Qrcode
   */
  @Prop({
    type: Number,
    default: 0,
  })
  whiteSpace: number

  /**
   * 前景色
   *
   * @type {string}
   * @memberof Qrcode
   */
  @Prop({
    type: String,
    default: 'black',
  })
  fgColor: string

  /**
   * 背景色
   *
   * @type {string}
   * @memberof Qrcode
   */
  @Prop({
    type: String,
    default: 'white',
  })
  bgColor: string

  /**
   * 二维码内容
   *
   * @type {string}
   * @memberof Qrcode
   */
  @Prop({
    type: String,
    default: '',
  })
  data: string

  /**
   * 是否开启长按识别
   *
   * @type {boolean}
   * @memberof Qrcode
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  showMenuByLongpress: boolean

  /**
   * 二维码状态
   *
   * @type {QrcodeStatus}
   * @memberof Qrcode
   */
  @Prop({
    type: String,
    default: 'activated',
  })
  qrcodeStatus: QrcodeStatus

  /**
   * 过期文案
   *
   * @type {string}
   * @memberof Qrcode
   */
  @Prop({
    type: String,
    default: '二维码过期',
  })
  qrcodeExpiredText: string

  /**
   * 刷新文案
   *
   * @type {string}
   * @memberof Qrcode
   */
  @Prop({
    type: String,
    default: '点击刷新',
  })
  qrcodeRefreshText: string

  wrapStyle: string = ''
  base64Url: string = ''
  private canvas?: WechatMiniprogram.Canvas

  get classes() {
    const p = this.prefixCls
    return {
      wrap: classNames(p),
      canvas: `${p}__canvas`,
      image: `${p}__image`,
      mask: `${p}__mask`,
      expired: `${p}__expired`,
      refresh: `${p}__refresh`,
      icon: `${p}__icon`,
    }
  }

  @Watch('height')
  @Watch('width')
  onSizeChange() {
    this.updateStyle(this.height, this.width)
  }

  @Watch('typeNumber')
  @Watch('errorCorrectLevel')
  @Watch('width')
  @Watch('height')
  @Watch('whiteSpace')
  @Watch('fgColor')
  @Watch('bgColor')
  @Watch('data')
  onDrawDepsChange() {
    void this.createCanvasContext()
  }

  updateStyle(height: number, width: number) {
    this.wrapStyle = styleToCssString({
      height: `${height}px`,
      width: `${width}px`,
    })
  }

  async getCanvasNode() {
    return this.canvas
  }

  getBase64Url() {
    return this.base64Url
  }

  private shouldPaintCell(r: number, c: number, size: number, seed: number) {
    const inFinderTL = r < 7 && c < 7
    const inFinderTR = r < 7 && c >= size - 7
    const inFinderBL = r >= size - 7 && c < 7
    if (inFinderTL || inFinderTR || inFinderBL) {
      const rr = inFinderTR ? r : inFinderBL ? r - (size - 7) : r
      const cc = inFinderTR ? c - (size - 7) : c
      const border = rr === 0 || rr === 6 || cc === 0 || cc === 6
      const center = rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4
      return border || center
    }
    const v = ((r * 33 + c * 97 + seed) ^ (r * c + seed)) & 1
    return v === 1
  }

  async createCanvasContext() {
    try {
      const canvasId = `${this.prefixCls}__canvas`
      const ref = (await useRef(`#${canvasId}`, this._renderProxy as unknown as MiniprogramPublicInstance)) as unknown as MiniprogramNodeRef
      const canvas = ref.node as unknown as WechatMiniprogram.Canvas
      this.canvas = canvas

      const ctx = canvas.getContext('2d')
      const ratio = (getSystemInfoSync(['window']).pixelRatio as number) || 1
      canvas.width = this.width * ratio
      canvas.height = this.height * ratio
      ctx.scale(ratio, ratio)
      ctx.fillStyle = this.bgColor
      ctx.fillRect(0, 0, this.width, this.height)

      const size = 29
      const seed = hashString(this.data || '')
      const tileW = (this.width - this.whiteSpace * 2) / size
      const tileH = (this.height - this.whiteSpace * 2) / size
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          ctx.fillStyle = this.shouldPaintCell(r, c, size, seed) ? this.fgColor : this.bgColor
          const x = Math.round(c * tileW) + this.whiteSpace
          const y = Math.round(r * tileH) + this.whiteSpace
          const w = Math.ceil((c + 1) * tileW) - Math.floor(c * tileW)
          const h = Math.ceil((r + 1) * tileH) - Math.floor(r * tileH)
          ctx.fillRect(x, y, w, h)
        }
      }

      const base64Url = await toDataURL({ width: this.width, height: this.height }, canvas)
      this.base64Url = base64Url
      this.$emit('load', { base64Url })
    } catch (err) {
      this.$emit('error', err)
    }
  }

  onTap() {
    this.$emit('click')
  }

  onMaskClick() {
    if (this.qrcodeStatus === 'expired') {
      this.$emit('refresh')
    }
  }

  mounted() {
    this.updateStyle(this.height, this.width)
    void this.createCanvasContext()
  }
}

export { Qrcode }

export default defineComponentHOC()(Qrcode)
