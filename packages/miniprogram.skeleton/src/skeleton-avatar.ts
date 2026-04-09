import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js'
const { classNames } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-skeleton-avatar',
    },
  },
})
class SkeletonAvatar extends Doraemon {
  prefixCls!: string

  @Prop({
    type: String,
    default: 'default',
  })
  size: string

  @Prop({
    type: String,
    default: 'circle',
  })
  shape: string

  @Prop({
    type: Boolean,
    default: false,
  })
  active: boolean

  get classes() {
    const { prefixCls, active, size, shape } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--active`]: active,
      [`${prefixCls}--${size}`]: !!size,
      [`${prefixCls}--${shape}`]: !!shape,
    })
    return { wrap }
  }
}

export { SkeletonAvatar }
export default defineComponentHOC()(SkeletonAvatar)
