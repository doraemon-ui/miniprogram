import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js'
const { classNames, styleToCssString } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-demo-block',
    },
  },
})
class DemoBlock extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof DemoBlock
   */
  prefixCls!: string

  @Prop({
    type: String,
    default: '',
  })
  title: string

  @Prop({
    type: Boolean,
    default: false,
  })
  bordered: boolean

  @Prop({
    type: String,
    default: '',
  })
  padding: string

  @Prop({
    type: String,
    default: '',
  })
  background: string

  @Prop({
    type: String,
    default: '',
  })
  direction: string

  @Prop({
    type: String,
    default: '',
  })
  align: string

  get classes() {
    const { prefixCls, bordered } = this
    const wrap = prefixCls
    const hd = `${prefixCls}__hd`
    const bd = classNames(`${prefixCls}__bd`, {
      [`${prefixCls}__bd--bordered`]: bordered,
    })

    return {
      wrap,
      hd,
      bd,
    }
  }

  get bodyStyle() {
    const { padding, background, direction, align } = this
    const bodyStyle: { [key: string]: string } = {}
    if (padding) {
      bodyStyle.padding = padding
    }
    if (background) {
      bodyStyle.background = background
    }
    if (direction) {
      bodyStyle.flexDirection = direction
    }
    if (align) {
      bodyStyle.alignItems = align
    }
    return styleToCssString(bodyStyle)
  }
}

export default defineComponentHOC()(DemoBlock)
