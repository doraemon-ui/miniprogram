import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import { useRect } from '@doraemon-ui/miniprogram.shared'
import type { MiniprogramDOMRect } from '@doraemon-ui/miniprogram.shared'
import type {
  NormalizedRadioGroupOption,
  RadioChangeItem,
  RadioChildLike,
  RadioContext,
  RadioGroupDatasetIndex,
  RadioGroupOption,
  RadioIconPosition,
  RenderProxySelector,
  RenderProxyWithComponent,
} from './types'

function normalizeOptions(options: RadioGroupOption[]) {
  return (options || []).map<NormalizedRadioGroupOption>((option, index) => {
    if (typeof option === 'string') {
      return {
        index,
        __comp_unique_key: option,
        title: option,
        value: option,
      }
    }
    const title = option.title != null ? option.title : ''
    const value = option.value != null ? option.value : ''
    return {
      ...option,
      index,
      __comp_unique_key: option.value !== undefined ? option.value : index,
      title,
      value,
    }
  })
}

@Component({
  components: {
    Radio: () => ({
      module: './index',
      type: 'descendant',
      observer: 'onChildrenChanged',
    }),
  },
  props: {
    prefixCls: {
      type: String,
      default: 'dora-radio-group',
    },
    cellGroupPrefixCls: {
      type: String,
      default: 'dora-list',
    },
    value: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: 'default',
    },
    bodyStyle: {
      type: null,
      default: '',
    },
    hasLine: {
      type: Boolean,
      default: true,
    },
    withListComponent: {
      type: Boolean,
      default: true,
    },
    iconPosition: {
      type: String,
      default: 'right',
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
  expose: ['getValue', 'getBoundingClientRect', 'changeValue'],
})
class RadioGroup extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof RadioGroup
   */
  prefixCls!: string

  /**
   * `dora-list` 组件的类名前缀
   *
   * @type {string}
   * @memberof RadioGroup
   */
  @Prop({
    type: String,
    default: 'dora-list',
  })
  cellGroupPrefixCls: string

  /**
   * 当前选中的值（受控）
   *
   * @type {string}
   * @memberof RadioGroup
   */
  @Prop({
    type: String,
    default: '',
  })
  value: string

  /**
   * 表单字段名
   *
   * @type {string}
   * @memberof RadioGroup
   */
  @Prop({
    type: String,
    default: '',
  })
  name: string

  /**
   * 标题
   *
   * @type {string}
   * @memberof RadioGroup
   */
  @Prop({
    type: String,
    default: '',
  })
  title: string

  /**
   * 描述
   *
   * @type {string}
   * @memberof RadioGroup
   */
  @Prop({
    type: String,
    default: '',
  })
  label: string

  /**
   * 选项列表（支持 slot 或 options 传入）
   *
   * @type {RadioGroupOption[]}
   * @memberof RadioGroup
   */
  @Prop({
    type: Array,
    default: () => [],
  })
  options: RadioGroupOption[]

  /**
   * 是否禁用
   *
   * @type {boolean}
   * @memberof RadioGroup
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  disabled: boolean

  /**
   * 是否只读
   *
   * @type {boolean}
   * @memberof RadioGroup
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  readOnly: boolean

  /**
   * `dora-list` 展示模式
   *
   * @type {string}
   * @memberof RadioGroup
   */
  @Prop({
    type: String,
    default: 'default',
  })
  mode: string

  /**
   * `dora-list` 自定义 body 样式
   *
   * @type {(string | Partial<CSSStyleDeclaration>)}
   * @memberof RadioGroup
   */
  @Prop({
    type: null,
    default: '',
  })
  bodyStyle: string | Partial<CSSStyleDeclaration>

  /**
   * 是否有底部横线
   *
   * @type {boolean}
   * @memberof RadioGroup
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  hasLine: boolean

  /**
   * 是否使用 List 组件渲染
   *
   * @type {boolean}
   * @memberof RadioGroup
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  withListComponent: boolean

  /**
   * 图标位置
   *
   * @type {RadioIconPosition}
   * @memberof RadioGroup
   */
  @Prop({
    type: String,
    default: 'right',
  })
  iconPosition: RadioIconPosition

  /**
   * 图标大小
   *
   * @type {string}
   * @memberof RadioGroup
   */
  @Prop({
    type: String,
    default: '',
  })
  iconSize: string

  /**
   * 选中图标
   *
   * @type {string}
   * @memberof RadioGroup
   */
  @Prop({
    type: String,
    default: '',
  })
  iconOn: string

  /**
   * 未选中图标
   *
   * @type {string}
   * @memberof RadioGroup
   */
  @Prop({
    type: String,
    default: '',
  })
  iconOff: string

  hasFieldDecorator: boolean = false
  inputValue: string = ''
  keys: Array<{ title: string; value: string }> = []
  showOptions: NormalizedRadioGroupOption[] = []

  @Watch('value')
  onValueChange(newVal: string) {
    if (this.hasFieldDecorator) return
    this.updated(newVal)
    this.changeValue({ value: newVal })
  }

  @Watch('options')
  onOptionsChange() {
    this.showOptions = normalizeOptions(this.options)
    this.changeValue()
  }

  @Watch('disabled')
  @Watch('readOnly')
  @Watch('hasLine')
  @Watch('withListComponent')
  @Watch('iconPosition')
  @Watch('iconSize')
  @Watch('iconOn')
  @Watch('iconOff')
  @Watch('prefixCls')
  onContextChange() {
    this.changeValue()
  }

  onChildrenChanged() {
    this.changeValue()
  }

  updated(inputValue: string) {
    if (this.inputValue !== inputValue) {
      this.inputValue = inputValue
    }
  }

  changeValue(props: Partial<{ value: string }> = {}) {
    const { disabled, readOnly, hasLine, withListComponent, iconPosition, iconSize, iconOn, iconOff, prefixCls } = this

    const value = props.value != null ? props.value : this.inputValue
    const showOptions = this.showOptions

    const setChildrenValues = (children: RadioChildLike[]) => {
      const keys: Array<{ title: string; value: string }> = []
      if (children && children.length > 0) {
        const lastIndex = children.length - 1
        children.forEach((child, index) => {
          const active = value === child.value
          const isLast = index === lastIndex
          const useDefaultSize = iconSize === ''
          const useDefaultIcon = iconOn === '' && iconOff === ''
          child.changeValue(active, index, isLast, {
            disabled,
            readOnly,
            hasLine,
            hasFieldDecorator: !!this.hasFieldDecorator,
            withListComponent,
            iconPosition,
            iconSize: withListComponent ? iconSize : useDefaultSize ? '23' : iconSize,
            iconOn: withListComponent ? iconOn : useDefaultIcon ? 'success' : iconOn,
            iconOff: withListComponent ? iconOff || iconOn : useDefaultIcon ? 'circle' : iconOff,
          })
          keys.push({ title: child.title, value: child.value })
        })
      }
      this.keys = keys
    }

    Doraemon.nextTick(() => {
      const proxy = this._renderProxy as unknown as RenderProxySelector
      const selectedNodes =
        typeof proxy.selectAllComponents === 'function'
          ? proxy.selectAllComponents(showOptions.length > 0 ? `.${prefixCls}__radio` : 'dora-radio')
          : []
      const relationNodes = proxy.getRelationNodes('./index')
      const rawNodes = (selectedNodes && selectedNodes.length > 0 ? selectedNodes : relationNodes) || []

      const children = rawNodes
        .map((node) => ((node as RenderProxyWithComponent).$component ? (node as RenderProxyWithComponent).$component : node))
        .filter((node): node is RadioChildLike => {
          const child = node as Partial<RadioChildLike>
          return typeof child.changeValue === 'function' && typeof child.value === 'string' && typeof child.title === 'string'
        })

      setChildrenValues(children)
    })
  }

  onChange(item: RadioChangeItem) {
    this.$emit('change', {
      ...item,
      ...this.getValue(item.value),
      name: this.name,
      value: item.value, // 兼容旧版本 value 字段
    })
  }

  onRadioChange(e: WechatMiniprogram.CustomEvent<RadioChangeItem>) {
    const dataset = (e.currentTarget as unknown as { dataset: RadioGroupDatasetIndex }).dataset
    const index = typeof dataset?.index === 'number' ? dataset.index : e.detail?.index != null ? e.detail.index : -1
    this.onChange({
      ...e.detail,
      index,
    })
  }

  getValue(value: string = this.inputValue, cols: Array<{ title: string; value: string }> = this.keys) {
    const newValue = value ? [value] : []
    const checkedValues = cols.filter((option) => newValue.includes(option.value))
    const displayValue = checkedValues.map((option) => option.title) || []
    const allValues = cols.map((option) => option.value)
    const selectedIndex = newValue.map((n) => allValues.indexOf(n))

    return {
      value,
      displayValue: displayValue[0] != null ? displayValue[0] : '',
      selectedIndex: selectedIndex[0] != null ? selectedIndex[0] : -1,
      selectedValue: value,
      cols,
    }
  }

  getBoundingClientRect(): Promise<MiniprogramDOMRect> {
    return useRect(`.${this.prefixCls}`, this._renderProxy)
  }

  mounted() {
    this.updated(this.value)
    this.showOptions = normalizeOptions(this.options)
    this.changeValue()
  }
}

export { RadioGroup }

export default defineComponentHOC({ behaviors: ['wx://form-field'] })(RadioGroup)
