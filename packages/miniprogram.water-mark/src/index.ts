import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import { useRef, getSystemInfoSync } from '@doraemon-ui/miniprogram.shared'
import type { MiniprogramNodeRef, MiniprogramPublicInstance } from '@doraemon-ui/miniprogram.shared'

const { classNames, styleToCssString } = Doraemon.util

async function toDataURL(width: number, height: number, canvas: WechatMiniprogram.Canvas) {
  if (typeof (canvas as any).toDataURL === 'function') return (canvas as any).toDataURL('image/png', 1)
  if (typeof wx !== 'undefined' && typeof wx.canvasToTempFilePath === 'function') {
    const ratio = (getSystemInfoSync(['window']).pixelRatio as number) || 1
    return await new Promise<string>((resolve) => {
      wx.canvasToTempFilePath({
        destWidth: width * ratio,
        destHeight: height * ratio,
        canvas,
        fileType: 'png',
        quality: 1,
        success: (res) => resolve(res.tempFilePath || ''),
        fail: () => resolve(''),
      })
    })
  }
  return ''
}

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-water-mark',
    },
  },
})
class WaterMark extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof WaterMark
   */
  prefixCls!: string

  /**
   * 水印内容
   *
   * @type {(string | string[])}
   * @memberof WaterMark
   */
  @Prop({
    type: null,
    default: '',
  })
  content: string | string[]

  /**
   * 字体颜色
   *
   * @type {string}
   * @memberof WaterMark
   */
  @Prop({
    type: String,
    default: 'rgba(0, 0, 0, .15)',
  })
  fontColor: string

  /**
   * 字体样式
   *
   * @type {string}
   * @memberof WaterMark
   */
  @Prop({
    type: String,
    default: 'normal',
  })
  fontStyle: string

  /**
   * 字体族
   *
   * @type {string}
   * @memberof WaterMark
   */
  @Prop({
    type: String,
    default: 'sans-serif',
  })
  fontFamily: string

  /**
   * 字体粗细
   *
   * @type {string}
   * @memberof WaterMark
   */
  @Prop({
    type: String,
    default: 'normal',
  })
  fontWeight: string

  /**
   * 字体大小
   *
   * @type {number}
   * @memberof WaterMark
   */
  @Prop({
    type: Number,
    default: 14,
  })
  fontSize: number

  /**
   * 是否全页显示
   *
   * @type {boolean}
   * @memberof WaterMark
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  fullPage: boolean

  /**
   * 水平间距
   *
   * @type {number}
   * @memberof WaterMark
   */
  @Prop({
    type: Number,
    default: 24,
  })
  gapX: number

  /**
   * 垂直间距
   *
   * @type {number}
   * @memberof WaterMark
   */
  @Prop({
    type: Number,
    default: 48,
  })
  gapY: number

  /**
   * 单个水印宽度
   *
   * @type {number}
   * @memberof WaterMark
   */
  @Prop({
    type: Number,
    default: 120,
  })
  width: number

  /**
   * 单个水印高度
   *
   * @type {number}
   * @memberof WaterMark
   */
  @Prop({
    type: Number,
    default: 64,
  })
  height: number

  /**
   * 水印图片地址
   *
   * @type {string}
   * @memberof WaterMark
   */
  @Prop({
    type: String,
    default: '',
  })
  image: string

  /**
   * 图片高度
   *
   * @type {number}
   * @memberof WaterMark
   */
  @Prop({
    type: Number,
    default: 64,
  })
  imageHeight: number

  /**
   * 图片宽度
   *
   * @type {number}
   * @memberof WaterMark
   */
  @Prop({
    type: Number,
    default: 128,
  })
  imageWidth: number

  /**
   * 旋转角度
   *
   * @type {number}
   * @memberof WaterMark
   */
  @Prop({
    type: Number,
    default: -22,
  })
  rotate: number

  /**
   * 层级
   *
   * @type {number}
   * @memberof WaterMark
   */
  @Prop({
    type: Number,
    default: 2000,
  })
  zIndex: number

  wrapStyle: string = ''
  base64Url: string = ''

  get classes() {
    const p = this.prefixCls
    return {
      wrap: classNames(p, { [`${p}--full-page`]: this.fullPage }),
      canvas: `${p}__canvas`,
    }
  }

  @Watch('zIndex')
  @Watch('gapX')
  @Watch('width')
  onStyleDepsChange() {
    this.updateStyle(this.zIndex, this.gapX, this.width, this.base64Url)
  }

  @Watch('content')
  @Watch('image')
  @Watch('fontColor')
  @Watch('fontStyle')
  @Watch('fontFamily')
  @Watch('fontWeight')
  @Watch('fontSize')
  @Watch('fullPage')
  @Watch('gapX')
  @Watch('gapY')
  @Watch('width')
  @Watch('height')
  @Watch('imageHeight')
  @Watch('imageWidth')
  @Watch('rotate')
  onPaintDepsChange() {
    void this.createCanvasContext()
  }

  async createCanvasContext() {
    try {
      const canvasId = this.classes.canvas
      const ref = (await useRef(`#${canvasId}`, this._renderProxy as unknown as MiniprogramPublicInstance)) as unknown as MiniprogramNodeRef
      const canvas = ref.node as unknown as WechatMiniprogram.Canvas
      const ctx = canvas.getContext('2d')
      const ratio = (getSystemInfoSync(['window']).pixelRatio as number) || 1
      const canvasWidth = (this.gapX + this.width) * ratio
      const canvasHeight = (this.gapY + this.height) * ratio
      const markWidth = this.width * ratio
      const markHeight = this.height * ratio
      canvas.width = canvasWidth
      canvas.height = canvasHeight

      ctx.translate(markWidth / 2, markHeight / 2)
      ctx.rotate((Math.PI / 180) * Number(this.rotate))

      if (this.image) {
        const image = (canvas as any).createImage ? (canvas as any).createImage() : null
        if (image) {
          await new Promise<void>((resolve) => {
            image.onload = () => {
              ctx.drawImage(image, -(this.imageWidth / 2), -(this.imageHeight / 2), this.imageWidth, this.imageHeight)
              resolve()
            }
            image.onerror = () => resolve()
            image.src = this.image
          })
        }
      } else if (this.content) {
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        const markSize = Number(this.fontSize) * ratio
        ctx.font = `${this.fontStyle} normal ${this.fontWeight} ${markSize}px/${markHeight}px ${this.fontFamily}`
        ctx.fillStyle = this.fontColor
        if (Array.isArray(this.content)) {
          this.content.forEach((item, index) => ctx.fillText(item, 0, index * markSize))
        } else {
          ctx.fillText(this.content, 0, 0)
        }
      }

      const base64Url = await toDataURL(this.width, this.height, canvas)
      if ((ctx as any).restore) (ctx as any).restore()
      if (this.base64Url !== base64Url) {
        this.base64Url = base64Url
        this.$emit('load', { base64Url })
      }
    } catch (err) {
      this.$emit('error', err)
    }
  }

  updateStyle(zIndex: number, gapX: number, width: number, base64Url: string) {
    this.wrapStyle = styleToCssString({
      zIndex,
      backgroundSize: `${gapX + width}px`,
      backgroundImage: base64Url ? `url('${base64Url}')` : 'unset',
    })
  }

  mounted() {
    this.updateStyle(this.zIndex, this.gapX, this.width, this.base64Url)
    void this.createCanvasContext()
  }
}

export { WaterMark }

export default defineComponentHOC()(WaterMark)
