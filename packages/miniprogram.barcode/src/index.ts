import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import { getSystemInfoSync, getCanvasRef, toDataURL } from '@doraemon-ui/miniprogram.shared'
import EAN13 from './barcode'
import type { BarcodeOptions, BarcodeProps } from './types'

const defaultOptions: Required<BarcodeOptions> = {
  number: true,
  prefix: true,
  color: 'black',
  debug: false,
}

@Component({
  expose: ['draw'],
  props: {
    prefixCls: {
      type: String,
      default: 'dora-barcode',
    },
  },
})
class Barcode extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Barcode
   */
  prefixCls!: string

  /**
   * 条码宽度
   *
   * @type {number}
   * @memberof Barcode
   */
  @Prop({
    type: Number,
    default: 200,
  })
  width: number

  /**
   * 条码高度
   *
   * @type {number}
   * @memberof Barcode
   */
  @Prop({
    type: Number,
    default: 100,
  })
  height: number

  /**
   * 条码内容
   *
   * @type {string}
   * @memberof Barcode
   */
  @Prop({
    type: String,
    default: '',
  })
  number: string

  /**
   * 条码配置
   *
   * @type {BarcodeOptions}
   * @memberof Barcode
   */
  @Prop({
    type: Object,
    default: () => ({ ...defaultOptions }),
  })
  options: BarcodeOptions

  /**
   * 画布节点 id
   *
   * @type {string}
   * @memberof Barcode
   */
  @Prop({
    type: String,
    default: 'dora-barcode',
  })
  canvasId: string

  @Watch('canvasId')
  @Watch('number')
  @Watch('width')
  @Watch('height')
  @Watch('options')
  onPropsChange() {
    this.draw().catch(() => {
      /**
       * Ignore
       */
    })
  }

  async draw(opts: Partial<BarcodeProps> = {}) {
    const props = {
      canvasId: this.canvasId,
      number: this.number,
      width: this.width,
      height: this.height,
      options: this.options,
      ...opts,
    }

    const { canvasId, number: value, width, height, options: oldOptions } = props
    if (!value) {
      return
    }
    const mergedOptions = {
      ...defaultOptions,
      ...(oldOptions || {}),
    }

    const ratio = (getSystemInfoSync(['window']).pixelRatio as number) || 1
    const canvas = await getCanvasRef(canvasId, this._renderProxy)

    new EAN13(
      canvas,
      ratio,
      value,
      Object.assign(
        { width, height },
        {
          number: mergedOptions.number,
          prefix: mergedOptions.prefix,
          color: mergedOptions.color,
          debug: mergedOptions.debug,
          onValid: () => {
            this.$emit('valid')
          },
          onInvalid: () => {
            this.$emit('invalid')
          },
          onSuccess: async () => {
            const base64Url = await toDataURL({ width, height }, canvas)
            try {
              const ctx = canvas.getContext('2d')
              ctx.restore?.()
            } catch (e) {
              /**
               * Ignore
               */
            }
            this.$emit('load', { base64Url })
            this.$emit('success', { base64Url })
          },
          onError: () => {
            this.$emit('error')
          },
        },
      ),
    )
  }

  mounted() {
    this.onPropsChange()
  }
}

export { Barcode }

export default defineComponentHOC()(Barcode)
