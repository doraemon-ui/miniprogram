import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import { useRef, getSystemInfoSync } from '@doraemon-ui/miniprogram.shared'
import type { MiniprogramNodeRef, MiniprogramPublicInstance } from '@doraemon-ui/miniprogram.shared'
import EAN13 from './barcode'
import type { BarcodeEvent, BarcodeOptions, DataUrlOptions } from './types'

const defaultOptions: Required<BarcodeOptions> = {
  number: true,
  prefix: true,
  color: 'black',
  debug: false,
  onValid: () => {},
  onInvalid: () => {},
  onSuccess: () => {},
  onError: () => {},
}

async function toDataURL({ width, height, type = 'png', quality = 1 }: DataUrlOptions, canvas: WechatMiniprogram.Canvas): Promise<string> {
  const fileType = type === 'jpg' || type === 'jpeg' ? 'jpeg' : type
  if (typeof (canvas as unknown as { toDataURL?: (mimeType: string, quality: number) => string }).toDataURL === 'function') {
    const fn = (canvas as unknown as { toDataURL: (mimeType: string, quality: number) => string }).toDataURL
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

  async getCanvasNode(canvasId: string): Promise<WechatMiniprogram.Canvas> {
    const ref = (await useRef(`#${canvasId}`, this._renderProxy as unknown as MiniprogramPublicInstance)) as unknown as MiniprogramNodeRef
    return ref.node as unknown as WechatMiniprogram.Canvas
  }

  async draw(opts: Partial<{ canvasId: string; number: string; width: number; height: number; options: BarcodeOptions }> = {}) {
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
    const canvas = await this.getCanvasNode(canvasId)

    const emit = (event: BarcodeEvent, detail?: unknown) => {
      if (detail !== undefined) {
        this.$emit(event, detail)
      } else {
        this.$emit(event)
      }
    }

    const buildHook = (hookName: keyof Required<BarcodeOptions>) => {
      const userCb = mergedOptions[hookName]
      return async () => {
        if (typeof userCb === 'function') {
          userCb()
        }
        if (hookName === 'onSuccess') {
          const base64Url = await toDataURL({ width, height }, canvas)
          try {
            const ctx = canvas.getContext('2d') as unknown as { restore?: () => void }
            ctx.restore?.()
          } catch (e) {
            /**
             * Ignore
             */
          }
          emit('load', { base64Url })
        }
        emit(hookName.replace(/^on/, '').toLowerCase() as BarcodeEvent)
      }
    }

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
            void buildHook('onValid')()
          },
          onInvalid: () => {
            void buildHook('onInvalid')()
          },
          onSuccess: () => {
            void buildHook('onSuccess')()
          },
          onError: () => {
            void buildHook('onError')()
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
