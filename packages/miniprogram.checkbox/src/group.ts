import { defineComponentHOC, Doraemon, Component, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { ComponentRenderProxy, CustomEvent } from '@doraemon-ui/miniprogram.core-js'
import { useRect } from '@doraemon-ui/miniprogram.shared'
import type { MiniprogramDOMRect } from '@doraemon-ui/miniprogram.shared'
import { checkboxGroupProps } from './props'
import type {
  CheckboxChangeItem,
  CheckboxGroupOption,
  CheckboxIconPosition,
  CheckboxInstance,
  CheckboxProps,
  NormalizedCheckboxGroupOption,
} from './types'

function normalizeOptions(options: CheckboxGroupOption[], values: string[]) {
  const checkedValues = Array.isArray(values) ? values : []
  return (options || []).map<NormalizedCheckboxGroupOption>((option, index) => {
    if (typeof option === 'string') {
      return {
        index,
        title: option,
        __comp_unique_key: option,
        value: option,
        __checked: checkedValues.includes(option),
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
      __checked: checkedValues.includes(value),
    }
  })
}

function getCheckedValues(newVal: string, oldVal: string[] = []) {
  const checkedValues = Array.isArray(oldVal) ? [...oldVal] : []
  return checkedValues.indexOf(newVal) !== -1 ? checkedValues.filter((n) => n !== newVal) : [...checkedValues, newVal]
}

@Component({
  components: {
    Checkbox: () => ({
      module: './index',
      type: 'descendant',
      observer: 'onChildrenChanged',
    }),
  },
  props: checkboxGroupProps,
  expose: ['getValue', 'getBoundingClientRect', 'changeValue', 'onChange'],
})
class CheckboxGroup extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof CheckboxGroup
   */
  prefixCls!: string

  /**
   * `dora-list` 组件的类名前缀
   *
   * @type {string}
   * @memberof CheckboxGroup
   */

  cellGroupPrefixCls!: string

  /**
   * 当前选中的值（受控）
   *
   * @type {string[]}
   * @memberof CheckboxGroup
   */
  value!: string[]

  /**
   * 表单字段名
   *
   * @type {string}
   * @memberof CheckboxGroup
   */
  name!: string

  /**
   * 标题
   *
   * @type {string}
   * @memberof CheckboxGroup
   */
  title!: string

  /**
   * 描述
   *
   * @type {string}
   * @memberof CheckboxGroup
   */
  label!: string

  /**
   * 选项列表（支持 slot 或 options 传入）
   *
   * @type {CheckboxGroupOption[]}
   * @memberof CheckboxGroup
   */
  options!: CheckboxGroupOption[]

  /**
   * 是否禁用
   *
   * @type {boolean}
   * @memberof CheckboxGroup
   */
  disabled!: boolean

  /**
   * 是否只读
   *
   * @type {boolean}
   * @memberof CheckboxGroup
   */
  readOnly!: boolean

  /**
   * list 组件的模式
   *
   * @type {string}
   * @memberof CheckboxGroup
   */
  mode!: string

  /**
   * 自定义 body 样式
   *
   * @type {(string | Partial<CSSStyleDeclaration>)}
   * @memberof CheckboxGroup
   */
  bodyStyle!: string | Partial<CSSStyleDeclaration>

  /**
   * 是否有底部横线
   *
   * @type {boolean}
   * @memberof CheckboxGroup
   */
  hasLine!: boolean

  /**
   * 是否使用 `dora-list` 组件包裹
   *
   * @type {boolean}
   * @memberof CheckboxGroup
   */
  withListComponent!: boolean

  /**
   * 图标位置
   *
   * @type {CheckboxIconPosition}
   * @memberof CheckboxGroup
   */
  iconPosition!: CheckboxIconPosition

  /**
   * 图标大小
   *
   * @type {string}
   * @memberof CheckboxGroup
   */
  iconSize!: string

  /**
   * 选中图标
   *
   * @type {string}
   * @memberof CheckboxGroup
   */
  iconOn!: string

  /**
   * 未选中图标
   *
   * @type {string}
   * @memberof CheckboxGroup
   */
  iconOff!: string

  hasFieldDecorator: boolean = false
  inputValue: string[] = []
  keys: CheckboxProps[] = []
  showOptions: NormalizedCheckboxGroupOption[] = []

  @Watch('value')
  onValueChange(newVal: string[]) {
    if (this.hasFieldDecorator) return
    this.updated(newVal)
    this.showOptions = normalizeOptions(this.options, newVal)
    this.changeValue({ value: newVal })
  }

  @Watch('options')
  onOptionsChange() {
    this.showOptions = normalizeOptions(this.options, this.inputValue)
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

  updated(inputValue: string[]) {
    if (this.inputValue !== inputValue) {
      this.inputValue = inputValue
    }
  }

  changeValue(props: Partial<{ value: string[] }> = {}) {
    const { disabled, readOnly, hasLine, withListComponent, iconPosition, iconSize, iconOn, iconOff, prefixCls } = this

    const value = props.value != null ? props.value : this.inputValue
    const showOptions = this.showOptions

    const setChildrenValues = (children: CheckboxInstance[]) => {
      const keys: CheckboxProps[] = []
      if (children && children.length > 0) {
        const lastIndex = children.length - 1
        children.forEach((child, index) => {
          const active = Array.isArray(value) && value.includes(child.value)
          const isLast = index === lastIndex
          child.changeValue(active, index, isLast, {
            disabled,
            readOnly,
            hasLine,
            hasFieldDecorator: !!this.hasFieldDecorator,
            withListComponent,
            iconPosition,
            iconSize,
            iconOn,
            iconOff,
          })
          keys.push(child.$data)
        })
      }
      this.keys = keys
    }

    Doraemon.nextTick(() => {
      const proxy = this._renderProxy
      const selectedNodes = (
        typeof proxy.selectAllComponents === 'function'
          ? proxy.selectAllComponents(showOptions.length > 0 ? `.${prefixCls}__checkbox` : 'dora-checkbox')
          : []
      ) as ComponentRenderProxy<Doraemon>[]
      const relationNodes = this.$children as CheckboxInstance[]
      const rawNodes = (selectedNodes && selectedNodes.length > 0 ? selectedNodes : relationNodes) || []

      const children = rawNodes
        .map((node) =>
          (node as unknown as ComponentRenderProxy<Doraemon>).$component
            ? (node as unknown as ComponentRenderProxy<Doraemon>).$component
            : node,
        )
        .filter((node) => {
          const child = node as unknown as CheckboxInstance
          return typeof child.changeValue === 'function' && typeof child.value === 'string' && typeof child.title === 'string'
        })

      setChildrenValues(children)
    })
  }

  onChange(item: CheckboxChangeItem) {
    const checkedValues = getCheckedValues(item.value, this.inputValue)

    this.$emit('change', {
      ...this.getValue(checkedValues),
      ...item,
      name: this.name,
    })
  }

  onCheckboxChange(e: CustomEvent<CheckboxChangeItem>) {
    // Set real index
    const { index } = e.currentTarget.dataset
    this.onChange({
      ...e.detail,
      index,
    })
  }

  getValue(value: string[] = this.inputValue, cols: CheckboxProps[] = this.keys) {
    const values = Array.isArray(value) ? value : []
    const checkedValues = values.reduce<CheckboxProps[]>((acc, val) => [...acc, ...cols.filter((option) => option.value === val)], [])
    const displayValue = checkedValues.map((option) => option.title) || []
    const allValues = cols.map((option) => option.value)
    const selectedIndex = values.map((n) => allValues.indexOf(n))

    return {
      value: values,
      displayValue,
      selectedIndex,
      selectedValue: values,
      cols,
    }
  }

  getBoundingClientRect(): Promise<MiniprogramDOMRect> {
    return useRect(`.${this.prefixCls}`, this._renderProxy)
  }

  mounted() {
    this.updated(this.value)
    this.showOptions = normalizeOptions(this.options, this.value)
    this.changeValue()
  }
}

export { CheckboxGroup }

export default defineComponentHOC({ behaviors: ['wx://form-field'] })(CheckboxGroup)
