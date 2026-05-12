import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { TouchEvent } from '@doraemon-ui/miniprogram.core-js'
import type { ESignFileType, ESignCanvasRef } from './types'
import { useRef, getSystemInfoSync, getTouchPoints, toDataURL, getCanvasRef } from '@doraemon-ui/miniprogram.shared'
import type { MiniprogramNodeRef } from '@doraemon-ui/miniprogram.shared'

const { classNames, styleToCssString } = Doraemon.util

@Component({
  expose: ['resize'],
  props: {
    prefixCls: {
      type: String,
      default: 'dora-e-sign',
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
  canvasRef: Promise<ESignCanvasRef> | null = null
  wrapRef: Promise<MiniprogramNodeRef> | null = null

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

  /**
   * 获取并缓存 wrap ref
   */
  getWrapRef(forceUpdate: boolean = false) {
    if (!this.wrapRef || forceUpdate) {
      this.wrapRef = useRef(`.${this.prefixCls}__bd`, this._renderProxy)
    }

    return this.wrapRef
  }

  /**
   * 手指触摸动作开始
   */
  onTouchStart() {
    if (!this.canvasRef) return
    const props = this
    void this.canvasRef.then(({ ctx }) => {
      if (!ctx) return
      ctx.beginPath()
      ctx.lineWidth = props.lineWidth || 3
      ctx.strokeStyle = props.lineColor || '#000000'
      this.$emit('start')
    })
  }

  /**
   * 手指触摸后移动
   */
  onTouchMove(e: TouchEvent) {
    if (!this.canvasRef) return false
    if (this.isCanvasEmpty) {
      this.isCanvasEmpty = false
    }

    Promise.all([this.wrapRef, this.canvasRef]).then(([wrapRef, { ctx }]) => {
      if (!wrapRef || !ctx) return
      const touch = getTouchPoints(e)
      const offsetLeft = wrapRef.clientLeft + wrapRef.left
      const offsetTop = wrapRef.clientTop + wrapRef.top
      const mouseX = touch.x - offsetLeft
      const mouseY = touch.y - offsetTop

      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.lineTo(mouseX, mouseY)
      ctx.stroke()
      this.$emit('signing', { mouseX, mouseY })
    })
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

  async createCanvasContext(
    props: {
      prefixCls: string
      width: string | number
      height: number
      bgColor: string
      type: ESignFileType
    },
    forceUpdate: boolean = false,
  ): Promise<ESignCanvasRef> {
    const renderCanvas = () => {
      return this.getWrapRef(forceUpdate).then(({ clientWidth: width, clientHeight: height }) => {
        return getCanvasRef(props.prefixCls, this._renderProxy).then((canvas) => {
          const ctx = canvas.getContext('2d')
          const ratio = getSystemInfoSync(['window']).pixelRatio
          const canvasWidth = width * ratio
          const canvasHeight = height * ratio
          const setCanvasBgColor = (ctx) => {
            if (ctx && props.bgColor) {
              ctx.fillStyle = props.bgColor
              ctx.fillRect(0, 0, width, height)
            }
          }

          canvas.width = canvasWidth
          canvas.height = canvasHeight

          ctx.scale(ratio, ratio)
          setCanvasBgColor(ctx)

          const clear = () => {
            ctx.clearRect(0, 0, width, height)
            ctx.closePath()
            // reset canvas bgColor
            setCanvasBgColor(ctx)
          }

          const draw = () => {
            return toDataURL({ width, height, type: props.type }, canvas)
          }

          const resize = (updateCanvasContext: () => Promise<ESignCanvasRef>) => {
            const data = ctx.getImageData(0, 0, canvasWidth, canvasHeight)
            updateCanvasContext().then(({ ctx: newCtx }) => {
              newCtx.putImageData(data, 0, 0)
            })
          }

          return { ctx, clear, draw, resize }
        })
      })
    }

    return Promise.resolve().then(renderCanvas)
  }

  clear() {
    if (!this.canvasRef) return
    void this.canvasRef.then(({ clear }) => {
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
    if (!this.canvasRef) return
    void this.canvasRef.then(({ draw }) => {
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
    if (!this.canvasRef) return
    void this.canvasRef.then(({ resize }) => {
      resize(() => {
        const nextRef = this.createCanvasContext(this, true)
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
