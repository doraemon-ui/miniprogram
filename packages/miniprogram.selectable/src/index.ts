import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { SelectableType } from './types'
const { classNames, styleToCssString } = Doraemon.util

const presetColors: Record<string, string> = {
  light: '#ddd',
  stable: '#b2b2b2',
  positive: '#387ef5',
  calm: '#11c1f3',
  balanced: '#33cd5f',
  energized: '#ffc900',
  assertive: '#ef473a',
  royal: '#886aea',
  dark: '#444',
}

const isPresetColor = (color: string) => {
  if (!color) return ''
  return presetColors[color] ? presetColors[color] : color
}

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-selectable',
    },
    type: {
      type: String,
      default: 'checkbox',
    },
    value: {
      type: String,
      default: '',
    },
    defaultChecked: {
      type: Boolean,
      default: false,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'balanced',
    },
    controlled: {
      type: Boolean,
      default: false,
    },
    wrapStyle: {
      type: null,
      default: '',
    },
    iconSize: {
      type: String,
      default: '',
    },
    iconOn: {
      type: String,
      default: '',
    },
    iconOff: {
      type: String,
      default: '',
    },
  },
})
class Selectable extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Selectable
   */
  prefixCls!: string

  @Prop({
    type: String,
    default: 'checkbox',
  })
  type: SelectableType
  @Prop({
    type: String,
    default: '',
  })
  value: string
  @Prop({
    type: Boolean,
    default: false,
  })
  defaultChecked: boolean
  @Prop({
    type: Boolean,
    default: false,
  })
  checked: boolean
  @Prop({
    type: Boolean,
    default: false,
  })
  disabled: boolean
  @Prop({
    type: Boolean,
    default: false,
  })
  readOnly: boolean
  @Prop({
    type: String,
    default: 'balanced',
  })
  color: string
  @Prop({
    type: Boolean,
    default: false,
  })
  controlled: boolean
  @Prop({
    type: null,
    default: '',
  })
  wrapStyle: string | Partial<CSSStyleDeclaration>
  @Prop({
    type: String,
    default: '',
  })
  iconSize: string
  @Prop({
    type: String,
    default: '',
  })
  iconOn: string
  @Prop({
    type: String,
    default: '',
  })
  iconOff: string

  inputChecked: boolean = false
  inputColor: string = ''
  extStyle: string = ''
  innerIconSize: number = 23
  innerIconOn: string = 'success'
  innerIconOff: string = 'circle'

  get classes() {
    const { prefixCls, inputChecked, disabled, readOnly } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--checked`]: inputChecked,
      [`${prefixCls}--disabled`]: disabled,
      [`${prefixCls}--readonly`]: readOnly,
    })
    const input = `${prefixCls}__input`
    const icon = `${prefixCls}__icon`

    return {
      wrap,
      input,
      icon,
    }
  }

  updated(inputChecked: boolean) {
    if (this.inputChecked !== inputChecked) {
      this.inputChecked = inputChecked
    }
  }

  updateTypeIcons(type: SelectableType, iconSize: string, iconOn: string, iconOff: string) {
    const useDefaultSize = iconSize === ''
    const useDefaultIcon = iconOn === '' && iconOff === ''
    if (type === 'checkbox') {
      this.innerIconSize = useDefaultSize ? 23 : parseInt(iconSize, 10)
      this.innerIconOn = useDefaultIcon ? 'success' : iconOn
      this.innerIconOff = useDefaultIcon ? 'circle' : iconOff
    } else if (type === 'radio') {
      this.innerIconSize = useDefaultSize ? 16 : parseInt(iconSize, 10)
      this.innerIconOn = useDefaultIcon ? 'success_no_circle' : iconOn
      this.innerIconOff = useDefaultIcon ? '' : iconOff
    }
  }

  @Watch('checked')
  onCheckedChange(newVal: boolean) {
    if (this.controlled) {
      this.updated(newVal)
    }
  }

  @Watch('color')
  onColorChange(newVal: string) {
    this.inputColor = isPresetColor(newVal)
  }

  @Watch('wrapStyle')
  onWrapStyleChange(newVal: string | Partial<CSSStyleDeclaration>) {
    this.extStyle = styleToCssString(newVal as any)
  }

  @Watch('type')
  @Watch('iconSize')
  @Watch('iconOn')
  @Watch('iconOff')
  onIconPropsChange() {
    this.updateTypeIcons(this.type, this.iconSize, this.iconOn, this.iconOff)
  }

  onChange() {
    const { value, inputChecked, disabled, readOnly, controlled, type } = this
    if (disabled || readOnly) return

    const item = {
      checked: !inputChecked,
      value,
      type,
    }

    if (!controlled) {
      this.updated(!inputChecked)
    }

    this.$emit('change', item)
  }

  mounted() {
    const inputChecked = this.controlled ? this.checked : this.defaultChecked
    this.inputChecked = inputChecked
    this.inputColor = isPresetColor(this.color)
    this.extStyle = styleToCssString(this.wrapStyle as any)
    this.updateTypeIcons(this.type, this.iconSize, this.iconOn, this.iconOff)
  }
}

export { Selectable }

export default defineComponentHOC({ externalClasses: ['dora-input-class'] })(Selectable)
