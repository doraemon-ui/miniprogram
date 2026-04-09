import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { CardAction, CardThumbStyle } from './types'
const { classNames, styleToCssString } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-card',
    },
  },
})
class Card extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Card
   */
  prefixCls!: string

  /**
   * 点击态类名
   *
   * @type {string}
   * @memberof Card
   */
  @Prop({
    type: String,
    default: 'none',
  })
  hoverClass: string

  /**
   * 是否显示边框
   *
   * @type {boolean}
   * @memberof Card
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  bordered: boolean

  /**
   * 是否全宽
   *
   * @type {boolean}
   * @memberof Card
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  full: boolean

  /**
   * 标题
   *
   * @type {string}
   * @memberof Card
   */
  @Prop({
    type: String,
    default: '',
  })
  title: string

  /**
   * 缩略图地址
   *
   * @type {string}
   * @memberof Card
   */
  @Prop({
    type: String,
    default: '',
  })
  thumb: string

  /**
   * 缩略图样式
   *
   * @type {CardThumbStyle}
   * @memberof Card
   */
  @Prop({
    type: null,
    default: '',
  })
  thumbStyle: CardThumbStyle

  /**
   * 右上角额外内容
   *
   * @type {string}
   * @memberof Card
   */
  @Prop({
    type: String,
    default: '',
  })
  extra: string

  /**
   * 底部动作列表
   *
   * @type {CardAction[]}
   * @memberof Card
   */
  @Prop({
    type: Array,
    default: () => [],
  })
  actions: CardAction[]

  disabled: boolean = false
  extStyle: string = ''

  get classes() {
    const { prefixCls, hoverClass, bordered, full, actions } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--bordered`]: bordered,
      [`${prefixCls}--full`]: full,
      [`${prefixCls}--has-actions`]: actions.length > 0,
    })
    const hd = `${prefixCls}__hd`
    const content = `${prefixCls}__content`
    const thumb = `${prefixCls}__thumb`
    const extra = `${prefixCls}__extra`
    const bd = `${prefixCls}__bd`
    const ft = `${prefixCls}__ft`
    const actionsCls = `${prefixCls}__actions`
    const action = actions.map((a) => {
      const type = a.type || 'default'
      const wrap = classNames(`${prefixCls}__action`, {
        [`${prefixCls}__action--${type}`]: true,
        [`${prefixCls}__action--bold`]: !!a.bold,
        [`${prefixCls}__action--disabled`]: !!a.disabled,
        [`${a.className}`]: !!a.className,
      })
      const hover = a.hoverClass && a.hoverClass !== 'default' ? a.hoverClass : `${prefixCls}__action--hover`
      return { wrap, hover }
    })
    const hover = hoverClass && hoverClass !== 'default' ? hoverClass : `${prefixCls}--hover`

    return {
      wrap,
      hover,
      hd,
      content,
      thumb,
      extra,
      bd,
      ft,
      actions: actionsCls,
      action,
    }
  }

  updateThumbStyle(newVal: CardThumbStyle) {
    this.extStyle = styleToCssString(newVal as any)
  }

  @Watch('thumbStyle')
  onThumbStyleChange(newVal: CardThumbStyle) {
    this.updateThumbStyle(newVal)
  }

  onAction(e: WechatMiniprogram.TouchEvent) {
    const dataset = (e.currentTarget as any).dataset as any
    const index = dataset.index
    const actions = this.actions || []
    const action = actions[index]
    if (action && !action.disabled) {
      this.$emit('action', { index, action, actions })
    }
  }

  mounted() {
    this.updateThumbStyle(this.thumbStyle)
  }
}

export { Card }

export default defineComponentHOC()(Card)
