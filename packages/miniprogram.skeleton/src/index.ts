import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js'
const { classNames } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-skeleton',
    },
  },
})
class Skeleton extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Skeleton
   */
  prefixCls!: string

  /**
   * 是否展示动画
   *
   * @type {boolean}
   * @memberof Skeleton
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  active: boolean

  get classes() {
    const { prefixCls, active } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--active`]: active,
    })
    return { wrap }
  }
}

export { Skeleton }

export default defineComponentHOC()(Skeleton)
