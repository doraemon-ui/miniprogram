import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
const { classNames, styleToCssString } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-media',
    },
  },
})
class Media extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Media
   */
  prefixCls!: string

  /**
   * 缩略图地址
   *
   * @type {string}
   * @memberof Media
   */
  @Prop({
    type: String,
    default: '',
  })
  thumb: string

  /**
   * 缩略图样式
   *
   * @type {string | Partial<CSSStyleDeclaration>}
   * @memberof Media
   */
  @Prop({
    type: [String, Object],
    default: '',
  })
  thumbStyle: string | Partial<CSSStyleDeclaration>

  /**
   * 标题
   *
   * @type {string}
   * @memberof Media
   */
  @Prop({
    type: String,
    default: '',
  })
  title: string

  /**
   * 描述
   *
   * @type {string}
   * @memberof Media
   */
  @Prop({
    type: String,
    default: '',
  })
  label: string

  /**
   * 垂直对齐方式
   *
   * @type {string}
   * @memberof Media
   */
  @Prop({
    type: String,
    default: 'center',
  })
  align: string

  extStyle: string = ''

  get classes() {
    const { prefixCls, align } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--align-${align}`]: align,
    })

    return {
      wrap,
      hd: `${prefixCls}__hd`,
      thumb: `${prefixCls}__thumb`,
      bd: `${prefixCls}__bd`,
      title: `${prefixCls}__title`,
      desc: `${prefixCls}__desc`,
    }
  }

  @Watch('thumbStyle')
  onThumbStyleChange(value: string | Partial<CSSStyleDeclaration>) {
    this.extStyle = styleToCssString(value || '')
  }

  mounted() {
    this.onThumbStyleChange(this.thumbStyle)
  }
}

export { Media }

export default defineComponentHOC()(Media)
