import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js'
const { classNames } = Doraemon.util

const DEFAULT_COL_STYLE = 'padding-left: var(--dora-row-gutter-half, 0px); padding-right: var(--dora-row-gutter-half, 0px);'

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-col',
    },
  },
})
class Col extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Col
   */
  prefixCls!: string

  /**
   * 栅格占位格数
   *
   * @type {number}
   * @memberof Col
   */
  @Prop({
    type: Number,
    default: 0,
  })
  span: number

  /**
   * 栅格左侧偏移格数
   *
   * @type {number}
   * @memberof Col
   */
  @Prop({
    type: Number,
    default: 0,
  })
  offset: number

  /**
   * 栅格向右移动格数（pull）
   *
   * @type {number}
   * @memberof Col
   */
  @Prop({
    type: Number,
    default: 0,
  })
  pull: number

  /**
   * 栅格向左移动格数（push）
   *
   * @type {number}
   * @memberof Col
   */
  @Prop({
    type: Number,
    default: 0,
  })
  push: number

  colStyle: string = DEFAULT_COL_STYLE

  get classes() {
    const { prefixCls, span, offset, pull, push } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--span-${span}`]: span,
      [`${prefixCls}--offset-${offset}`]: offset,
      [`${prefixCls}--pull-${pull}`]: pull,
      [`${prefixCls}--push-${push}`]: push,
    })

    return {
      wrap,
    }
  }
}

export { Col }

export default defineComponentHOC()(Col)
