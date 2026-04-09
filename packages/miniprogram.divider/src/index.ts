import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js'
import type { DividerDirection, DividerPosition } from './types'
const { classNames } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-divider',
    },
    position: {
      type: String,
      default: 'center',
    },
    dashed: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: '',
    },
    showText: {
      type: Boolean,
      default: true,
    },
    direction: {
      type: String,
      default: 'horizontal',
    },
  },
})
class Divider extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Divider
   */
  prefixCls!: string

  /**
   * 文本位置
   *
   * @type {DividerPosition}
   * @memberof Divider
   */
  @Prop({
    type: String,
    default: 'center',
  })
  position: DividerPosition

  /**
   * 是否虚线
   *
   * @type {boolean}
   * @memberof Divider
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  dashed: boolean

  /**
   * 分割线文本
   *
   * @type {string}
   * @memberof Divider
   */
  @Prop({
    type: String,
    default: '',
  })
  text: string

  /**
   * 是否显示文本
   *
   * @type {boolean}
   * @memberof Divider
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  showText: boolean

  /**
   * 分割线方向
   *
   * @type {DividerDirection}
   * @memberof Divider
   */
  @Prop({
    type: String,
    default: 'horizontal',
  })
  direction: DividerDirection

  get classes() {
    const { prefixCls, dashed, showText, position, direction } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--dashed`]: dashed,
      [`${prefixCls}--text`]: showText,
      [`${prefixCls}--text-${position}`]: showText && position,
      [`${prefixCls}--${direction}`]: direction,
    })
    const text = `${prefixCls}__text`

    return {
      wrap,
      text,
    }
  }
}

export { Divider }

export default defineComponentHOC()(Divider)
