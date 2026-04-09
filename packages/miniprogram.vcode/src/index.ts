import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js'
import { useRef, getSystemInfoSync } from '@doraemon-ui/miniprogram.shared'
import type { MiniprogramNodeRef, MiniprogramPublicInstance } from '@doraemon-ui/miniprogram.shared'

const randomNum = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min)
const randomColor = (min: number, max: number) => `rgb(${randomNum(min, max)}, ${randomNum(min, max)}, ${randomNum(min, max)})`

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

function render(ctx: any, props: Vcode) {
  const ratio = (getSystemInfoSync(['window']).pixelRatio as number) || 1
  let vcode = ''
  ctx.textBaseline = 'bottom'
  ctx.fillStyle = props.bgColor || randomColor(180, 240)
  ctx.scale(ratio, ratio)
  ctx.fillRect(0, 0, props.width, props.height)

  for (let i = 0; i < props.num; i++) {
    const x = ((props.width - 10) / props.num) * i + 10
    const y = randomNum(props.height / 2, props.height)
    const deg = randomNum(-45, 45)
    const txt = props.str[randomNum(0, props.str.length)]
    const fontSize = randomNum(16, 40)
    const halfHeight = parseInt(String(props.height / 2), 10)
    vcode += txt
    ctx.fillStyle = props.fontColor || randomColor(10, 100)
    ctx.font = `normal normal normal ${fontSize > halfHeight ? halfHeight : fontSize}px sans-serif`
    ctx.translate(x, y)
    ctx.rotate((deg * Math.PI) / 180)
    ctx.fillText(txt, 0, 0)
    ctx.rotate((-deg * Math.PI) / 180)
    ctx.translate(-x, -y)
  }
  if (props.hasLine) {
    for (let i = 0; i < props.num; i++) {
      ctx.strokeStyle = randomColor(90, 180)
      ctx.beginPath()
      ctx.moveTo(randomNum(0, props.width), randomNum(0, props.height))
      ctx.lineTo(randomNum(0, props.width), randomNum(0, props.height))
      ctx.stroke()
    }
  }
  if (props.hasPoint) {
    for (let i = 0; i < props.num * 10; i++) {
      ctx.fillStyle = randomColor(0, 255)
      ctx.beginPath()
      ctx.arc(randomNum(0, props.width), randomNum(0, props.height), 1, 0, 2 * Math.PI)
      ctx.fill()
    }
  }
  return vcode
}

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-vcode',
    },
  },
})
class Vcode extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Vcode
   */
  prefixCls!: string

  /**
   * 验证码字符源
   *
   * @type {string}
   * @memberof Vcode
   */
  @Prop({
    type: String,
    default: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  })
  str: string

  /**
   * 验证码长度
   *
   * @type {number}
   * @memberof Vcode
   */
  @Prop({
    type: Number,
    default: 6,
  })
  num: number

  /**
   * 画布宽度
   *
   * @type {number}
   * @memberof Vcode
   */
  @Prop({
    type: Number,
    default: 120,
  })
  width: number

  /**
   * 画布高度
   *
   * @type {number}
   * @memberof Vcode
   */
  @Prop({
    type: Number,
    default: 40,
  })
  height: number

  /**
   * 背景颜色
   *
   * @type {string}
   * @memberof Vcode
   */
  @Prop({
    type: String,
    default: '',
  })
  bgColor: string

  /**
   * 字体颜色
   *
   * @type {string}
   * @memberof Vcode
   */
  @Prop({
    type: String,
    default: '',
  })
  fontColor: string

  /**
   * 是否绘制噪点
   *
   * @type {boolean}
   * @memberof Vcode
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  hasPoint: boolean

  /**
   * 是否绘制干扰线
   *
   * @type {boolean}
   * @memberof Vcode
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  hasLine: boolean

  /**
   * canvas 节点 id
   *
   * @type {string}
   * @memberof Vcode
   */
  @Prop({
    type: String,
    default: 'dora-vcode',
  })
  canvasId: string

  async createCanvasContext() {
    try {
      const ref = (await useRef(
        `#${this.canvasId}`,
        this._renderProxy as unknown as MiniprogramPublicInstance,
      )) as unknown as MiniprogramNodeRef
      const canvas = ref.node as unknown as WechatMiniprogram.Canvas
      const ctx = canvas.getContext('2d')
      const ratio = (getSystemInfoSync(['window']).pixelRatio as number) || 1
      canvas.width = this.width * ratio
      canvas.height = this.height * ratio
      const value = render(ctx, this)
      const base64Url = await toDataURL(this.width, this.height, canvas)
      if ((ctx as any).restore) (ctx as any).restore()
      this.$emit('change', { value, base64Url })
    } catch (err) {
      this.$emit('error', err)
    }
  }

  draw() {
    void this.createCanvasContext()
  }

  mounted() {
    void this.createCanvasContext()
  }
}

export { Vcode }

export default defineComponentHOC()(Vcode)
