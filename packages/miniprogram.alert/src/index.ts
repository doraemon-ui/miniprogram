import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js'
import type { PresetColor } from '@doraemon-ui/miniprogram.shared'
const { classNames } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-alert',
    },
  },
})
class Alert extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Alert
   */
  prefixCls!: string

  /**
   * 过渡的类名
   *
   * @type {string}
   * @memberof Alert
   */
  @Prop({
    type: null,
    default: 'dora-animate--fadeIn',
  })
  classNames: string

  /**
   * 主题色
   *
   * @type {PresetColor}
   * @memberof Alert
   */
  @Prop({
    type: String,
    default: 'balanced',
  })
  theme: PresetColor

  /**
   * 缩略图
   *
   * @type {string}
   * @memberof Alert
   */
  @Prop({
    type: String,
    default: '',
  })
  thumb: string

  /**
   * 标题
   *
   * @type {string}
   * @memberof Alert
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
   * @memberof Alert
   */
  @Prop({
    type: String,
    default: '',
  })
  label: string

  /**
   * 是否显示关闭按钮
   *
   * @type {boolean}
   * @memberof Alert
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  closable: boolean

  /**
   * 是否可见
   */
  visible: boolean = true

  get classes() {
    const { prefixCls, theme } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--${theme}`]: theme,
    })
    const hd = `${prefixCls}__hd`
    const thumb = `${prefixCls}__thumb`
    const bd = `${prefixCls}__bd`
    const text = `${prefixCls}__text`
    const desc = `${prefixCls}__desc`
    const ft = `${prefixCls}__ft`
    const closable = `${prefixCls}__closable`

    return {
      wrap,
      hd,
      thumb,
      bd,
      text,
      desc,
      ft,
      closable,
    }
  }

  /**
   * 关闭时触发的回调函数
   */
  onClose() {
    if (this.closable) {
      this.visible = false
    }
    this.$emit('click')
  }

  /**
   * 点击事件
   */
  onClick() {
    this.$emit('click')
  }
}

export { Alert }

export default defineComponentHOC()(Alert)
