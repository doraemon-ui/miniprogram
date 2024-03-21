import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import { findComponentNode } from '@doraemon-ui/miniprogram.shared'

const { classNames, getCurrentInstance } = Doraemon.util

/**
 * 弹出的位置
 *
 * @enum {number}
 */
enum EPosition {
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

  /**
   * 自定义 animation 类名前缀
   *
   * @type {string}
   * @memberof Popup
   */
  @Prop({
    type: String,
    default: 'dora-animate',
  })
  animationPrefixCls: string

  /**
   * 弹出层位置信息，可选值为 center、top、right、bottom、left
   *
   * @type {EPosition}
   * @memberof Popup
   */
  @Prop({
    type: String,
    default: EPosition.CENTER,
  })
  position: EPosition

  /**
   * 自定义 body 样式
   *
   * @type {object}
   * @memberof Popup
   */
  @Prop({
    type: Object,
    default: null,
  })
  bodyStyle: object

  /**
   * 是否显示蒙层
   *
   * @type {boolean}
   * @memberof Popup
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  mask: boolean

  /**
   * 点击蒙层是否允许关闭
   *
   * @type {boolean}
   * @memberof Popup
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  maskClosable: boolean

  /**
   * 蒙层是否透明
   *
   * @type {boolean}
   * @memberof Popup
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  maskTransparent: boolean
  
  /**
   * 自定义蒙层样式
   *
   * @type {object}
   * @memberof Popup
   */
  @Prop({
    type: Object,
    default: null,
  })
  maskStyle: object

  /**
   * 是否可见
   *
   * @type {boolean}
   * @memberof Popup
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  visible: boolean

  /**
   * 设置蒙层的 z-index
   *
   * @type {number}
   * @memberof Popup
   */
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
  onPositionChange(position: EPosition) {
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

  /**
   * 点击关闭按钮事件
   */
  close() {
    this.$emit('close')
  }

  /**
   * 点击蒙层事件
   */
  onMaskClick() {
    if (this.maskClosable) {
      this.close()
    }
  }

  /**
   * 开始展示前触发
   */
  onEnter() {
    this.$emit('show')
  }

  /**
   * 完全展示后触发
   */
  onEntered() {
    this.$emit('showed')
  }

  /**
   * 完全关闭后触发
   */
  onExited() {
    this.$emit('closed')
  }

  /**
   * 获取过渡的类名
   */
  getTransitionName(value: EPosition) {
    const { animationPrefixCls } = this
    let transitionName = ''
    switch (value) {
        case EPosition.TOP:
          transitionName = `${animationPrefixCls}--slideInDown`
          break
        case EPosition.RIGHT:
          transitionName = `${animationPrefixCls}--slideInRight`
          break
        case EPosition.BOTTOM:
          transitionName = `${animationPrefixCls}--slideInUp`
          break
        case EPosition.LEFT:
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
      const instance = getCurrentInstance(this)
      this._wuxBackdrop = findComponentNode('#dora-backdrop', instance)
    }
  }

  mounted() {
    this.setPopupVisible(this.visible)
    this.getTransitionName(this.position)
  }
}

export default defineComponentHOC()(Popup)
