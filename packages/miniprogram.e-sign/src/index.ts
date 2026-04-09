import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { TouchEvent } from '@doraemon-ui/miniprogram.core-js'
import type { CanvasContext2D, CanvasNode, DataUrlOptions, ESignCanvasRef, ESignFileType, TouchLikeEvent } from './types'
import { useRef, getSystemInfoSync, getTouchPoints } from '@doraemon-ui/miniprogram.shared'
import type { MiniprogramNodeRef, MiniprogramPublicInstance } from '@doraemon-ui/miniprogram.shared'

const { classNames, styleToCssString } = Doraemon.util

async function toDataURL({ width, height, type = 'png', quality = 1 }: DataUrlOptions, canvas: CanvasNode): Promise<string> {
  const fileType = type === 'jpg' || type === 'jpeg' ? 'jpeg' : type
  if (typeof (canvas as unknown as { toDataURL?: (mimeType: string, ratio: number) => string }).toDataURL === 'function') {
    const fn = (canvas as unknown as { toDataURL: (mimeType: string, ratio: number) => string }).toDataURL
    return fn.call(canvas, `image/${fileType}`, quality)
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

@Component({
  expose: ['resize'],
  props: {
    prefixCls: {
      type: String,
      default: 'dora-e-sign',
    },
    type: {
      type: String,
      default: 'png',
    },
    width: {
      type: null,
      default: 'auto',
    },
    height: {
      type: Number,
      default: 200,
    },
    bgColor: {
      type: String,
      default: '#ffffff',
    },
    lineWidth: {
      type: Number,
      default: 3,
    },
    lineColor: {
      type: String,
      default: '#000000',
    },
    hasFooter: {
      type: Boolean,
      default: true,
    },
    cancelText: {
      type: String,
      default: '重置',
    },
    confirmText: {
      type: String,
      default: '确定',
    },
  },
})
class ESign extends Doraemon {
  /**
   * 自定义类名前缀
   */
  prefixCls!: string

  /**
   * 导出图片类型
   */
  @Prop({
    type: String,
    default: 'png',
  })
  type: ESignFileType

  /**
   * 画布宽度（px 或 auto）
   */
  @Prop({
    type: null,
    default: 'auto',
  })
  width: string | number

  /**
   * 画布高度（px）
   */
  @Prop({
    type: Number,
    default: 200,
  })
  height: number

  /**
   * 画布背景色
   */
  @Prop({
    type: String,
    default: '#ffffff',
  })
  bgColor: string

  /**
   * 画线宽度
   */
  @Prop({
    type: Number,
    default: 3,
  })
  lineWidth: number

  /**
   * 画线颜色
   */
  @Prop({
    type: String,
    default: '#000000',
  })
  lineColor: string

  /**
   * 是否显示底部操作栏
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  hasFooter: boolean

  /**
   * 重置按钮文本
   */
  @Prop({
    type: String,
    default: '重置',
  })
  cancelText: string

  /**
   * 确定按钮文本
   */
  @Prop({
    type: String,
    default: '确定',
  })
  confirmText: string

  isCanvasEmpty: boolean = true
  bodyStyle: string = ''
  canvasRef: Promise<ESignCanvasRef> | ESignCanvasRef | null = null

  get classes() {
    const { prefixCls } = this
    return {
      wrap: classNames(prefixCls),
      bd: `${prefixCls}__bd`,
      ft: `${prefixCls}__ft`,
      button: `${prefixCls}__button`,
    }
  }

  @Watch('width')
  @Watch('height')
  @Watch('bgColor')
  onCanvasPropsChange() {
    this.setBodyStyle({
      width: this.width,
      height: this.height,
    })
    this.resize()
  }

  async getCanvasNode(canvasId: string): Promise<CanvasNode> {
    const ref = (await useRef(`#${canvasId}`, this._renderProxy as unknown as MiniprogramPublicInstance)) as unknown as MiniprogramNodeRef
    return ref.node as unknown as CanvasNode
  }

  resolveCanvasRef(): Promise<ESignCanvasRef> | null {
    const ref = this.canvasRef
    if (!ref) return null
    return typeof (ref as Promise<ESignCanvasRef>).then === 'function'
      ? (ref as Promise<ESignCanvasRef>)
      : Promise.resolve(ref as ESignCanvasRef)
  }

  /**
   * 手指触摸动作开始
   */
  onTouchStart() {
    const ref = this.resolveCanvasRef()
    if (!ref) return false
    const props = this
    void ref.then(({ value: ctx }) => {
      if (!ctx) return
      ctx.beginPath()
      ctx.lineWidth = props.lineWidth || 3
      ctx.strokeStyle = props.lineColor || '#000000'
      this.$emit('start')
    })
    return true
  }

  /**
   * 手指触摸后移动
   */
  onTouchMove(e: TouchLikeEvent) {
    const ref = this.resolveCanvasRef()
    if (!ref) return false
    if (this.isCanvasEmpty) {
      this.isCanvasEmpty = false
    }

    const touch = getTouchPoints(e)
    const mouseX = touch.x - (e.currentTarget?.offsetLeft || 0)
    const mouseY = touch.y - (e.currentTarget?.offsetTop || 0)
    void ref.then(({ value: ctx }) => {
      if (!ctx) return
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.lineTo(mouseX, mouseY)
      ctx.stroke()
      this.$emit('signing', { mouseX, mouseY })
    })
    return true
  }

  /**
   * 手指触摸动作结束
   */
  onTouchEnd() {
    if (this.isCanvasEmpty) {
      this.isCanvasEmpty = false
    }
    this.$emit('end')
  }

  setBodyStyle(props: { width: string | number; height: number }) {
    const bodyStyle = styleToCssString({
      width: props.width === 'auto' ? 'auto' : `${props.width}px`,
      height: `${props.height}px`,
    })
    if (this.bodyStyle !== bodyStyle) {
      this.bodyStyle = bodyStyle
    }
  }

  async createCanvasContext(props: {
    prefixCls: string
    width: string | number
    height: number
    bgColor: string
    type: ESignFileType
  }): Promise<ESignCanvasRef> {
    const getWrapRef = async () => {
      if (props.width === 'auto') {
        const wrap = (await useRef(
          `.${props.prefixCls}__bd`,
          this._renderProxy as unknown as MiniprogramPublicInstance,
        )) as unknown as MiniprogramNodeRef
        return { width: wrap.clientWidth, height: wrap.clientHeight }
      }
      return { width: Number(props.width), height: props.height }
    }

    const { width, height } = await getWrapRef()
    const canvas = await this.getCanvasNode(props.prefixCls)
    const ctx = canvas.getContext('2d') as unknown as CanvasContext2D
    const ratio = (getSystemInfoSync(['window']).pixelRatio as number) || 1
    const canvasWidth = width * ratio
    const canvasHeight = height * ratio
    const setCanvasBgColor = () => {
      if (props.bgColor) {
        ctx.fillStyle = props.bgColor
        ctx.fillRect(0, 0, width, height)
      }
    }

    canvas.width = canvasWidth
    canvas.height = canvasHeight
    ctx.scale(ratio, ratio)
    setCanvasBgColor()

    const clear = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.closePath()
      setCanvasBgColor()
    }

    const draw = () => {
      return toDataURL({ width, height, type: props.type }, canvas)
    }

    const resize = (create: () => Promise<ESignCanvasRef>) => {
      const data = ctx.getImageData(0, 0, canvasWidth, canvasHeight)
      void create().then(({ value: newCtx }) => {
        newCtx.putImageData(data, 0, 0)
      })
    }

    return { value: ctx, clear, draw, resize }
  }

  clear() {
    const ref = this.resolveCanvasRef()
    if (!ref) return
    void ref.then(({ clear }) => {
      if (typeof clear === 'function') {
        clear()
      }
      this.isCanvasEmpty = true
      this.$emit('clear')
    })
  }

  submit() {
    if (this.isCanvasEmpty) {
      this.$emit('submit', { base64Url: '' })
      return
    }
    const ref = this.resolveCanvasRef()
    if (!ref) return
    void ref.then(({ draw }) => {
      if (typeof draw === 'function') {
        void draw().then((base64Url) => {
          this.$emit('submit', { base64Url })
        })
        return
      }
      this.$emit('submit', { base64Url: '' })
    })
  }

  resize() {
    const ref = this.resolveCanvasRef()
    if (!ref) return
    void ref.then(({ resize }) => {
      resize(() => {
        const nextRef = this.createCanvasContext(this)
        this.canvasRef = nextRef
        return nextRef
      })
    })
  }

  mounted() {
    this.setBodyStyle(this)
    this.canvasRef = this.createCanvasContext(this)
  }
}

export { ESign }

export default defineComponentHOC()(ESign)
