import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js'
const { classNames, styleToCssString } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'doraicons',
    },
  },
})
class Icon extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Icon
   */
  prefixCls!: string

  @Prop({
    type: Boolean,
    default: false,
  })
  hidden: boolean

  @Prop({
    type: String,
    default: '',
  })
  type: string

  @Prop({
    type: [String, Number],
    default: 32,
  })
  size: string

  @Prop({
    type: String,
    default: '',
  })
  color: string

  get classes () {
    const { prefixCls, type } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}-${type}`]: type,
    })
    return {
      wrap,
    }
  }

  get containerStyle () {
    const getFontSize = (size: string | number): string => {
      let fontSize = size
      if (typeof size === 'number') {
        fontSize = `${size}px`
      } else if (typeof size === 'string') {
        if (!isNaN(Number(size))) {
          fontSize = `${size}px`
        }
      }
      return fontSize as string
    }
    return styleToCssString({
      fontSize: getFontSize(this.size),
      color: this.color !== '' ? this.color : 'unset',
    })
  }

  onClick () {
    this.$emit('click')
  }
}

export default defineComponentHOC()(Icon)
