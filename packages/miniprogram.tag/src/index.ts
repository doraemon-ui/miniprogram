import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { CSSStylePropertiesWithVars } from '@doraemon-ui/miniprogram.core-js'
import {
  FastColor,
  isPresetColor,
  useColorCls,
  useControlledState,
  useCSSVarCls,
  useSemanticClassNames,
  useSemanticStylesString,
} from '@doraemon-ui/miniprogram.shared'
import type { PresetColor } from '@doraemon-ui/miniprogram.shared'
import type { SemanticName } from './types'

const { classNames, styleToCssString } = Doraemon.util
const { ControlledState, setControlledState } = useControlledState('visible')

// const isPresetColor = (color: string) =>
//   /^(pink|red|yellow|orange|cyan|green|blue|purple|geekblue|magenta|volcano|gold|lime)(-inverse)?$/.test(color)

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-tag',
    },
    classNames: {
      type: Object,
      default: () => ({}),
    },
    styles: {
      type: Object,
      default: () => ({}),
    },
  },
})
class Tag extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Tag
   */
  prefixCls!: string
  classNames!: Partial<Record<SemanticName, string>>
  styles!: Partial<Record<SemanticName, CSSStylePropertiesWithVars>>

  /**
   * 点击态类名
   *
   * @type {string}
   * @memberof Tag
   */
  @Prop({
    type: String,
    default: 'default',
  })
  hoverClass: string

  /**
   * 标签颜色
   *
   * @type {string}
   * @memberof Tag
   */
  @Prop({
    type: String,
    default: '',
  })
  color: PresetColor | string

  /**
   * 填充类型
   *
   * @type {('fill' | 'solid' | 'outline')}
   * @memberof Tag
   */
  @Prop({
    type: String,
    default: 'fill',
  })
  fill: 'fill' | 'solid' | 'outline'

  /**
   * 是否可关闭
   *
   * @type {boolean}
   * @memberof Tag
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  closable: boolean

  /**
   * 默认是否可见
   *
   * @type {boolean}
   * @memberof Tag
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  defaultVisible: boolean

  /**
   * 是否可见
   *
   * @type {boolean}
   * @memberof Tag
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  visible: boolean

  /**
   * 是否受控
   *
   * @type {boolean}
   * @memberof Tag
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  controlled: boolean

  // className: string = ''
  // tagStyle: string = ''

  @ControlledState()
  tagVisible: boolean = true

  get classes() {
    const { prefixCls, hoverClass, color, fill } = this
    const hover = hoverClass && hoverClass !== 'default' ? hoverClass : `${prefixCls}--hover`
    const isPreset = isPresetColor(color)
    const internalClassNames = {
      root: classNames(prefixCls, useCSSVarCls(prefixCls), useColorCls(color), {
        [`${prefixCls}--${fill}`]: fill,
        [`${prefixCls}--${color}`]: isPreset,
      }),
      icon: `${prefixCls}__icon`,
      hover,
    }
    return useSemanticClassNames(undefined, internalClassNames, this.classNames)
  }

  get mergedStyles() {
    const { color, fill } = this
    const isPreset = isPresetColor(color)
    const rootStyle: CSSStylePropertiesWithVars = {}
    if (!isPreset && color) {
      if (fill === 'solid') {
        rootStyle.backgroundColor = color
      } else {
        const hsl = new FastColor(color).toHsl()
        hsl.l = 0.95
        rootStyle.backgroundColor = new FastColor(hsl).toHexString()
        rootStyle.color = color

        if (fill === 'outline') {
          rootStyle.borderColor = color
        }
      }
    }
    return useSemanticStylesString(
      {
        root: rootStyle,
      },
      this.styles,
    )
  }

  // get rootStyle() {
  //   const { styles } = this
  //   return styles?.root ? styleToCssString(styles.root) : ''
  // }

  // @Watch('color')
  // onColorChange(c: string) {
  //   this.updateStyle(c)
  // }

  // updateStyle(color: string) {
  //   const isPreset = isPresetColor(color)
  //   this.className = isPreset ? `${this.prefixCls}--${color}` : ''
  //   this.tagStyle = !isPreset && color ? styleToCssString({ backgroundColor: color, color: '#fff' }) : ''
  // }

  onChange(tagVisible: boolean) {
    setControlledState(this, tagVisible, !this.controlled)
    this.$emit('change', { value: tagVisible })
  }

  onClick() {
    this.$emit('click')
  }

  onClose() {
    if (this.closable) {
      this.$emit('close')
      this.onChange(false)
    }
  }

  // mounted() {
  //   this.updateStyle(this.color)
  // }
}

export { Tag }

export default defineComponentHOC()(Tag)
