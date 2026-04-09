import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import { useRef, getSystemInfoSync } from '@doraemon-ui/miniprogram.shared'
import type { MiniprogramNodeRef, MiniprogramPublicInstance } from '@doraemon-ui/miniprogram.shared'
import type { Canvas2DContext, CircleChangeDetail, CircleLineCap } from './types'

const { classNames } = Doraemon.util

const toAngle = (a: number) => (a / 180) * Math.PI
const toPercentAngle = (a: number) => toAngle((a / 100) * 360)

const easeInOutCubic = (a: number, b: number, c: number, d: number) => {
  let t = a / (d / 2)
  if (t < 1) return (c / 2) * t * t * t + b
  t -= 2
  return (c / 2) * (t * t * t + 2) + b
}

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-circle',
    },
    percent: {
      type: Number,
      default: 0,
    },
    strokeWidth: {
      type: Number,
      default: 10,
    },
    size: {
      type: Number,
      default: 120,
    },
    lineCap: {
      type: String,
      default: 'round',
    },
    backgroundColor: {
      type: String,
      default: '#f3f3f3',
    },
    color: {
      type: String,
      default: '#33cd5f',
    },
    sAngle: {
      type: Number,
      default: 0,
    },
    counterclockwise: {
      type: Boolean,
      default: false,
    },
    speed: {
      type: Number,
      default: 2000,
    },
    animate: {
      type: Boolean,
      default: true,
    },
    background: {
      type: Boolean,
      default: true,
    },
  },
})
class Circle extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Circle
   */
  prefixCls!: string

  /**
   * 进度百分比
   *
   * @type {number}
   * @memberof Circle
   */
  @Prop({
    type: Number,
    default: 0,
  })
  percent: number

  /**
   * 线条宽度
   *
   * @type {number}
   * @memberof Circle
   */
  @Prop({
    type: Number,
    default: 10,
  })
  strokeWidth: number

  /**
   * 圆环尺寸（px）
   *
   * @type {number}
   * @memberof Circle
   */
  @Prop({
    type: Number,
    default: 120,
  })
  size: number

  /**
   * 线条端点样式
   *
   * @type {CircleLineCap}
   * @memberof Circle
   */
  @Prop({
    type: String,
    default: 'round',
  })
  lineCap: CircleLineCap

  /**
   * 背景颜色
   *
   * @type {string}
   * @memberof Circle
   */
  @Prop({
    type: String,
    default: '#f3f3f3',
  })
  backgroundColor: string

  /**
   * 进度颜色
   *
   * @type {string}
   * @memberof Circle
   */
  @Prop({
    type: String,
    default: '#33cd5f',
  })
  color: string

  /**
   * 起始角度（角度制）
   *
   * @type {number}
   * @memberof Circle
   */
  @Prop({
    type: Number,
    default: 0,
  })
  sAngle: number

  /**
   * 是否逆时针
   *
   * @type {boolean}
   * @memberof Circle
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  counterclockwise: boolean

  /**
   * 动画时长（ms）
   *
   * @type {number}
   * @memberof Circle
   */
  @Prop({
    type: Number,
    default: 2000,
  })
  speed: number

  /**
   * 是否开启动画
   *
   * @type {boolean}
   * @memberof Circle
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  animate: boolean

  /**
   * 是否绘制背景环
   *
   * @type {boolean}
   * @memberof Circle
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  background: boolean

  beginAngle: number = 0
  startAngle: number = 0
  endAngle: number = 0
  currentAngle: number = 0
  style: string = ''
  timer: ReturnType<typeof setTimeout> | null = null

  get classes() {
    const { prefixCls } = this
    const wrap = classNames(prefixCls)
    const inner = `${prefixCls}__inner`

    return {
      wrap,
      inner,
    }
  }

  @Watch('size')
  onSizeChange(newVal: number) {
    this.updateStyle(newVal)
  }

  @Watch('percent')
  onPercentChange(newVal: number) {
    this.redraw(newVal)
  }

  @Watch('sAngle')
  onSAngleChange(newVal: number) {
    this.beginAngle = toAngle(newVal)
  }

  async getCanvasNode(canvasId: string): Promise<WechatMiniprogram.Canvas> {
    const ref = (await useRef(`#${canvasId}`, this._renderProxy as unknown as MiniprogramPublicInstance)) as unknown as MiniprogramNodeRef
    return ref.node as unknown as WechatMiniprogram.Canvas
  }

  /**
   * 更新样式
   */
  updateStyle(size: number = this.size) {
    this.style = `width: ${size}px; height: ${size}px;`
  }

  /**
   * 着帧绘制 canvas
   */
  redraw(value: number = this.percent) {
    const endAngle = toPercentAngle(value)
    const now = Date.now()
    const decrease = this.currentAngle > endAngle
    const startAngle = !decrease ? this.currentAngle : this.endAngle

    this.clearTimer()
    this.startAngle = startAngle
    this.endAngle = endAngle
    this.animateFrame(now, now, decrease)
  }

  /**
   * 绘制 canvas
   */
  async draw(hasLine: boolean = true) {
    const { lineCap, backgroundColor, color, size, strokeWidth, counterclockwise, background } = this
    const position = size / 2
    const radius = position - strokeWidth / 2
    const p = 2 * Math.PI
    const startAngle = counterclockwise ? p - this.beginAngle : this.beginAngle
    const endAngle = counterclockwise ? p - (this.beginAngle + this.currentAngle) : this.beginAngle + this.currentAngle

    const canvasId = this.classes.wrap
    const canvas = await this.getCanvasNode(canvasId)
    const ctx = canvas.getContext('2d') as unknown as Canvas2DContext
    const ratio = (getSystemInfoSync(['window']).pixelRatio as number) || 1

    canvas.width = size * ratio
    canvas.height = size * ratio

    ctx.scale(ratio, ratio)
    ctx.fillRect(0, 0, size, size)
    ctx.clearRect(0, 0, size, size)

    if (background) {
      ctx.beginPath()
      ctx.arc(position, position, radius, 0, 2 * Math.PI)
      ctx.lineWidth = strokeWidth
      ctx.strokeStyle = backgroundColor
      ctx.stroke()
    }

    if (hasLine) {
      ctx.beginPath()
      ctx.arc(position, position, radius, startAngle, endAngle)
      ctx.lineWidth = strokeWidth
      ctx.strokeStyle = color
      ctx.lineCap = lineCap
      ctx.stroke()
    }

    this.$emit('change', { value: this.currentAngle } as CircleChangeDetail)
  }

  /**
   * 开始动画
   */
  animateFrame(c: number, d: number, decrease: boolean) {
    const now = Date.now()
    const f = now - c < 1 ? 1 : now - c
    const { animate, speed, startAngle, endAngle } = this
    const isEnd =
      (!decrease && 1000 * this.currentAngle <= Math.floor(1000 * endAngle)) ||
      (decrease && 1000 * this.currentAngle >= Math.floor(1000 * endAngle))

    if (animate && c - d < 1.05 * speed && isEnd) {
      const value = easeInOutCubic((c - d) / f, startAngle, endAngle - startAngle, speed / f)
      const currentAngle = value < 0 ? 0 : value

      c = Date.now()
      this.currentAngle = currentAngle
      void this.draw(currentAngle !== 0)
      this.timer = setTimeout(() => this.animateFrame(c, d, decrease), 1000 / 60)
      return
    }

    this.currentAngle = endAngle
    void this.draw(endAngle !== 0)
  }

  /**
   * 清除定时器
   */
  clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }

  mounted() {
    this.updateStyle(this.size)
    this.beginAngle = toAngle(this.sAngle)
    this.redraw(this.percent)
  }

  detached() {
    this.clearTimer()
  }
}

export { Circle }

export default defineComponentHOC()(Circle)
