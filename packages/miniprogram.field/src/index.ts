import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import { useRect } from '@doraemon-ui/miniprogram.shared'
import type { FieldContext } from './types'

const { classNames } = Doraemon.util

const defaultContext: FieldContext = {
  layout: 'horizontal',
  requiredMarkStyle: 'asterisk',
  asteriskText: '*',
  requiredText: '必填',
  optionalText: '选填',
  disabled: false,
  readOnly: false,
}

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-field',
    },
  },
})
class Field extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Field
   */
  prefixCls!: string

  /**
   * 标签文本
   *
   * @type {string}
   * @memberof Field
   */
  @Prop({
    type: String,
    default: '',
  })
  label: string

  /**
   * 标签是否换行
   *
   * @type {boolean}
   * @memberof Field
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  labelWrap: boolean

  /**
   * 右侧额外内容
   *
   * @type {string}
   * @memberof Field
   */
  @Prop({
    type: String,
    default: '',
  })
  extra: string

  /**
   * 帮助文案
   *
   * @type {string}
   * @memberof Field
   */
  @Prop({
    type: String,
    default: '',
  })
  help: string

  /**
   * 子元素位置
   *
   * @type {string}
   * @memberof Field
   */
  @Prop({
    type: String,
    default: 'none',
  })
  childElementPosition: string

  /**
   * 是否展示链接箭头
   *
   * @type {boolean}
   * @memberof Field
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  isLink: boolean

  /**
   * 纵向对齐方式
   *
   * @type {string}
   * @memberof Field
   */
  @Prop({
    type: String,
    default: 'flex-start',
  })
  align: string

  /**
   * 是否禁用
   *
   * @type {boolean}
   * @memberof Field
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  disabled: boolean

  /**
   * 是否只读
   *
   * @type {boolean}
   * @memberof Field
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  readOnly: boolean

  /**
   * 是否隐藏
   *
   * @type {boolean}
   * @memberof Field
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  hidden: boolean

  /**
   * 是否必填
   *
   * @type {boolean}
   * @memberof Field
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  required: boolean

  /**
   * 校验反馈文案
   *
   * @type {string[]}
   * @memberof Field
   */
  @Prop({
    type: Array,
    default: [],
  })
  feedbackMessage: string[]

  /**
   * 是否显示反馈状态
   *
   * @type {boolean}
   * @memberof Field
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  hasFeedback: boolean

  /**
   * 当前索引
   *
   * @type {number}
   * @memberof Field
   */
  @Prop({
    type: Number,
    default: 0,
  })
  index: number

  /**
   * 是否最后一项
   *
   * @type {boolean}
   * @memberof Field
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  isLast: boolean

  context: FieldContext = defaultContext
  popoverVisible: boolean = false
  slotRect: WechatMiniprogram.BoundingClientRectCallbackResult | null = null
  relativeRect: WechatMiniprogram.BoundingClientRectCallbackResult | null = null

  get mergedRequired() {
    return this.required
  }

  get validateClasses() {
    return this.hasFeedback && this.feedbackMessage?.length ? 'invalid' : ''
  }

  get classes() {
    const { prefixCls, childElementPosition, labelWrap } = this
    return {
      wrap: classNames(prefixCls),
      child: classNames(`${prefixCls}__child`, {
        [`${prefixCls}__child--position-${childElementPosition}`]: childElementPosition,
      }),
      label: classNames(`${prefixCls}__label`, {
        [`${prefixCls}__label--wrap`]: labelWrap,
      }),
      extra: `${prefixCls}__extra`,
      arrow: `${prefixCls}__arrow`,
      asterisk: `${prefixCls}__required-asterisk`,
      text: `${prefixCls}__required-text`,
      feedback: `${prefixCls}__feedback-message`,
      labelHelp: `${prefixCls}__label-help`,
    }
  }

  @Watch('help')
  onHelpChange() {
    if (!this.help && this.popoverVisible) {
      this.popoverVisible = false
    }
  }

  setPopoverVisible() {
    const popoverVisible = !this.popoverVisible
    const promise = popoverVisible ? this.getPopoverRects() : Promise.resolve([null, null])
    promise.then(([slotRect, relativeRect]) => {
      this.slotRect = slotRect
      this.relativeRect = relativeRect
      this.popoverVisible = popoverVisible
    })
  }

  getPopoverRects(): Promise<
    [WechatMiniprogram.BoundingClientRectCallbackResult | null, WechatMiniprogram.BoundingClientRectCallbackResult | null]
  > {
    const getSlotRect = () => useRect(`.${this.prefixCls}__label-help`, this._renderProxy).then((rect) => rect || null)
    const getRelativeRect = () => useRect('#dora-field-wrap', this._renderProxy).then((rect) => rect || null)
    return Promise.all([getSlotRect(), getRelativeRect()])
  }

  onPopoverChange(e: WechatMiniprogram.CustomEvent<{ visible: boolean }>) {
    if (this.popoverVisible !== e.detail.visible) {
      this.popoverVisible = e.detail.visible
    }
  }
}

export { Field }

export default defineComponentHOC()(Field)
