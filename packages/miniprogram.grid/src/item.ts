import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js'
const { classNames } = Doraemon.util

@Component({
  components: {
    Grid: () => ({
      module: './index',
      type: 'parent',
    }),
  },
  props: {
    prefixCls: {
      type: String,
      default: 'dora-grid-item',
    },
    hoverClass: {
      type: String,
      default: 'default',
    },
  },
  expose: ['changeCurrent'],
})
class GridItem extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof GridItem
   */
  prefixCls!: string

  /**
   * 自定义点击态类名
   *
   * @type {string}
   * @memberof GridItem
   */
  hoverClass!: string

  /**
   * 缩略图
   *
   * @type {string}
   * @memberof GridItem
   */
  @Prop({
    type: String,
    default: '',
  })
  thumb: string

  /**
   * 描述信息
   *
   * @type {string}
   * @memberof GridItem
   */
  @Prop({
    type: String,
    default: '',
  })
  label: string

  width: string = '100%'
  bordered: boolean = true
  square: boolean = false
  index: number = 0

  get classes() {
    const { prefixCls, hoverClass, bordered, square } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--bordered`]: bordered,
      [`${prefixCls}--square`]: square,
    })
    const content = `${prefixCls}__content`
    const inner = `${prefixCls}__inner`
    const hd = `${prefixCls}__hd`
    const thumb = `${prefixCls}__thumb`
    const bd = `${prefixCls}__bd`
    const label = `${prefixCls}__label`
    const hover = hoverClass && hoverClass !== 'default' ? hoverClass : `${prefixCls}--hover`

    return {
      wrap,
      content,
      inner,
      hd,
      thumb,
      bd,
      label,
      hover,
    }
  }

  changeCurrent(width: string, bordered: boolean, square: boolean, index: number) {
    this.width = width
    this.bordered = bordered
    this.square = square
    this.index = index
  }

  onClick() {
    this.$emit('click', { index: this.index })
  }
}

export { GridItem }

export default defineComponentHOC()(GridItem)
