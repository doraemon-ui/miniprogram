import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import { useRect } from '@doraemon-ui/miniprogram.shared'
const { classNames, styleToCssString } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-avatar',
    },
  },
})
class Avatar extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Avatar
   */
  prefixCls!: string

  /**
   * 头像形状
   *
   * @type {('circle' | 'square')}
   * @default 'circle'
   * @memberof Avatar
   */
  @Prop({
    type: String,
    default: 'circle',
  })
  shape: 'circle' | 'square'

  /**
   * 头像尺寸
   *
   * @type {('small' | 'default' | 'large')}
   * @default 'default'
   * @memberof Avatar
   */
  @Prop({
    type: String,
    default: 'default',
  })
  size: 'small' | 'default' | 'large'

  /**
   * 图片地址
   *
   * @type {string}
   * @default ''
   * @memberof Avatar
   */
  @Prop({
    type: String,
    default: '',
  })
  src: string

  /**
   * 自定义样式
   *
   * @type {(string | Partial<CSSStyleDeclaration>)}
   * @default ''
   * @memberof Avatar
   */
  @Prop({
    type: null,
    default: '',
  })
  bodyStyle: string | Partial<CSSStyleDeclaration>

  /**
   * 是否自动缩放文字以适应头像尺寸
   *
   * @type {boolean}
   * @default false
   * @memberof Avatar
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  scale: boolean

  /**
   * 转换后的内联样式
   *
   * @type {string}
   * @memberof Avatar
   */
  extStyle: string = ''

  /**
   * 文字缩放样式
   *
   * @type {string}
   * @memberof Avatar
   */
  childrenStyle: string = ''

  /**
   * 计算头像的 CSS 类名
   *
   * @description 根据组件属性动态生成头像的包裹类名和文字容器类名
   * @readonly
   * @memberof Avatar
   */
  get classes () {
    const { prefixCls, shape, size, src } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--${shape}`]: shape,
      [`${prefixCls}--${size}`]: size,
      [`${prefixCls}--thumb`]: src,
    })
    const string = `${prefixCls}__string`

    return {
      wrap,
      string,
    }
  }

  /**
   * 自动缩放文字以适应头像尺寸
   *
   * @description 测量头像容器和文字元素的宽度，当文字超出容器时自动缩放
   * @memberof Avatar
   */
  setScale () {
    const { prefixCls } = this
    useRect([`.${prefixCls}`, `.${prefixCls}__string`], this._renderProxy)
      .then(([parent, child]) => {
        if (!parent || !child) { return }
        const offset = parent.width - 8 < child.width
        const childrenScale = offset ? (parent.width - 8) / child.width : 1
        const childrenStyle = childrenScale !== 1
          ? styleToCssString({
            position: 'absolute',
            display: 'inline-block',
            transform: `scale(${childrenScale})`,
            left: `calc(50% - ${Math.round(child.width / 2)}px)`,
          })
          : ''
        this.childrenStyle = childrenStyle
      })
  }

  /**
   * 监听 bodyStyle 属性变化，转换为 CSS 字符串
   *
   * @param {(string | Partial<CSSStyleDeclaration>)} newVal 新的样式值
   * @memberof Avatar
   */
  @Watch('bodyStyle')
  onBodyStyleChanged (newVal: string | Partial<CSSStyleDeclaration>) {
    this.extStyle = styleToCssString(newVal)
  }

  /**
   * 组件挂载完成生命周期
   *
   * @description 当无图片且开启了缩放时，自动计算文字缩放比例
   * @memberof Avatar
   */
  mounted () {
    if (!this.src && this.scale) {
      this.setScale()
    }
  }
}

export type AvatarInstance = Avatar
export default defineComponentHOC()(Avatar)
