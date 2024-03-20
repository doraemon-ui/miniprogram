import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
const { classNames } = Doraemon.util

/**
 * 弹出的位置
 *
 * @enum {number}
 */
enum PositionEnum {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
}

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-popup',
    },
  },
})
class Popup extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Popup
   */
  prefixCls!: string

  @Prop({
    type: String,
    default: 'dora-animate',
  })
  animationPrefixCls: string

  @Prop({
    type: String,
    default: PositionEnum.CENTER,
  })
  position: PositionEnum

  @Prop({
    type: Object,
    default: null,
  })
  bodyStyle: object

  @Prop({
    type: Boolean,
    default: true,
  })
  mask: boolean

  @Prop({
    type: Boolean,
    default: true,
  })
  maskClosable: boolean

  @Prop({
    type: Boolean,
    default: false,
  })
  maskTransparent: boolean
  
  @Prop({
    type: Object,
    default: null,
  })
  maskStyle: object

  @Prop({
    type: Boolean,
    default: false,
  })
  visible: boolean

  @Prop({
    type: Number,
    default: 1000,
  })
  zIndex: number

  /**
   * 首次进场动画时是否懒挂载组件
   *
   * @type {boolean}
   * @memberof Popup
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  mountOnEnter: boolean

  /**
   * 离场动画完成时是否卸载组件
   *
   * @type {boolean}
   * @memberof Popup
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  unmountOnExit: boolean

  get classes () {
    const { prefixCls, position } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--position-${position}`]: position,
    })
    const body = `${prefixCls}-body`

    return {
      wrap,
      body,
    }
  }

  /**
   * 组件样式
   *
   * @readonly
   * @memberof Popup
   */
  get extStyle () {
    return this.bodyStyle ? { ...this.bodyStyle, zIndex: this.zIndex } : { zIndex: this.zIndex }
  }

  @Watch('visible')
  onVisibleChange(visible: boolean) {
    this.setPopupVisible(visible)
  }

  @Watch('position')
  onPositionChange(position: PositionEnum) {
    this.getTransitionName(position)
  }

  setPopupVisible(popupVisible: boolean) {
    if (this.popupVisible !== popupVisible) {
      this.popupVisible = popupVisible
      this.setBackdropVisible(popupVisible)
    }
  }

  setBackdropVisible(visible: boolean) {
    if (this.mask && this._wuxBackdrop) {
      if (visible) {
        this._wuxBackdrop.retain()
      } else {
        this._wuxBackdrop.release()
      }
    }
  }

  transitionName: string = ''
  popupVisible: boolean = false
  _wuxBackdrop: any

  close() {
    this.$emit('close')
  }

  onMaskClick() {
    if (this.maskClosable) {
      this.close()
    }
  }

  onExited() {
    this.$emit('closed')
  }

  getTransitionName(value: PositionEnum) {
    const { animationPrefixCls } = this
    let transitionName = ''
    switch (value) {
        case PositionEnum.TOP:
          transitionName = `${animationPrefixCls}--slideInDown`
          break
        case PositionEnum.RIGHT:
          transitionName = `${animationPrefixCls}--slideInRight`
          break
        case PositionEnum.BOTTOM:
          transitionName = `${animationPrefixCls}--slideInUp`
          break
        case PositionEnum.LEFT:
          transitionName = `${animationPrefixCls}--slideInLeft`
          break
        default:
          transitionName = `${animationPrefixCls}--fadeIn`
          break
    }
    this.transitionName = transitionName
  }

  created() {
    if (this.mask) {
      this._wuxBackdrop = this._renderProxy.selectComponent('#dora-backdrop')
    }
  }

  mounted() {
    this.setPopupVisible(this.visible)
    this.getTransitionName(this.position)
  }
}

export default defineComponentHOC()(Popup)
