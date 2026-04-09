import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js'
import type { AccordionInstance } from './types'
const { classNames } = Doraemon.util

@Component({
  components: {
    Accordion: () => ({
      module: './index',
      type: 'parent',
    }),
  },
  props: {
    prefixCls: {
      type: String,
      default: 'dora-accordion-panel',
    },
  },
})
class AccordionPanel extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof AccordionPanel
   */
  prefixCls!: string

  /**
   * 当前激活 tab 索引
   *
   * @type {string}
   * @memberof AccordionPanel
   */
  @Prop({
    type: String,
    default: '',
  })
  key: string

  /**
   * 左侧缩略图
   *
   * @type {string}
   * @memberof AccordionPanel
   */
  @Prop({
    type: String,
    default: '',
  })
  thumb: string

  /**
   * 左侧标题
   *
   * @type {string}
   * @memberof AccordionPanel
   */
  @Prop({
    type: String,
    default: '',
  })
  title: string

  /**
   * 面板内容
   *
   * @type {string}
   * @memberof AccordionPanel
   */
  @Prop({
    type: String,
    default: '',
  })
  content: string

  /**
   * 是否禁用
   *
   * @type {boolean}
   * @memberof AccordionPanel
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  disabled: boolean

  /**
   * 是否显示箭头图标
   *
   * @type {boolean}
   * @memberof AccordionPanel
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  showArrow: boolean

  get classes() {
    const { prefixCls, current, disabled } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--current`]: current,
      [`${prefixCls}--disabled`]: disabled,
    })
    const hd = `${prefixCls}__hd`
    const thumb = `${prefixCls}__thumb`
    const title = `${prefixCls}__title`
    const arrow = `${prefixCls}__arrow`
    const bd = `${prefixCls}__bd`
    const content = `${prefixCls}__content`

    return {
      wrap,
      hd,
      thumb,
      title,
      arrow,
      bd,
      content,
    }
  }

  /**
   * 是否激动当前面板
   *
   * @type {boolean}
   * @memberof AccordionPanel
   */
  current: boolean = false

  /**
   * 对应 Key 值。如果没有设置 key，默认取 index 索引值
   *
   * @type {string}
   * @memberof AccordionPanel
   */
  index: string = '0'

  updateCurrentAndIndex(current: boolean, index: string) {
    this.$nextTick(() => {
      this.current = current
      this.index = index
    })
  }

  onClick() {
    const { index, disabled } = this
    if (!disabled) {
      ;(this.$parent as AccordionInstance)?.onClickItem(index)
    }
  }
}

export { AccordionPanel }

export default defineComponentHOC()(AccordionPanel)
