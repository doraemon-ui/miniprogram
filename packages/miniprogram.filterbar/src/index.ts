import type { CustomEvent } from '@doraemon-ui/miniprogram.core-js'
import { Component, defineComponentHOC, Doraemon, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'

import type {
  FilterbarDisplayValue,
  FilterbarFilterChildItem,
  FilterbarItem,
  FilterbarRenderFilterChildItem,
  FilterbarRenderItem,
  FilterbarValue,
} from './types'

const { classNames } = Doraemon.util

function clone<T>(obj: T): T {
  if (obj == null) return obj
  return JSON.parse(JSON.stringify(obj))
}

function isContain(source: string | number | Array<string | number> | undefined, value: string | number) {
  return Array.isArray(source) ? source.includes(value) : source === value
}

function getValue(children: Array<{ checked?: boolean; value: string | number }> = [], single: boolean = false) {
  const allValues = children.filter((item) => item.checked).map((item) => item.value)
  return single ? allValues[0] || '' : allValues
}

function getGroupOptions(children: Array<{ label: string; value: string | number }> = []) {
  return children.map((item) => ({
    title: item.label,
    value: `${item.value}`,
    color: 'assertive' as const,
  }))
}

function getSortValue(sort: number | undefined) {
  return typeof sort === 'number' && [1, -1].includes(sort) ? sort : 1
}

function getValues(options: FilterbarItem[] = []): FilterbarValue[] {
  return options.reduce<FilterbarValue[]>((acc, option) => {
    switch (option.type) {
      case 'radio':
        acc.push(getValue(option.children, true))
        break
      case 'checkbox':
        acc.push(getValue(option.children, false))
        break
      case 'text':
        acc.push(option.checked ? option.value || '' : '')
        break
      case 'sort':
        acc.push(option.checked ? getSortValue(option.sort) : '')
        break
      case 'filter':
        acc.push(getValues(option.children))
        break
      default:
        acc.push('')
        break
    }
    return acc
  }, [])
}

function getFilterChildSelected(option: FilterbarFilterChildItem, value: FilterbarValue | undefined) {
  if (option.type === 'radio' || option.type === 'checkbox') {
    return option.children
      .filter((item) => isContain(value as any, item.value))
      .map((item) => item.label)
      .join(',')
  }
  return ''
}

function getDisplayValue(option: FilterbarItem, value: FilterbarValue): FilterbarDisplayValue {
  switch (option.type) {
    case 'radio':
    case 'checkbox': {
      const labels = option.children
        .filter((item) => isContain(value as any, item.value))
        .map((item) => item.label)
        .join(',')
      return labels || option.label
    }
    case 'filter':
      return option.children.map((child, index) => getFilterChildSelected(child, Array.isArray(value) ? value[index] : undefined))
    default:
      return option.label
  }
}

function getDifference(data: string[] = [], values: string[] = []) {
  return data.filter((item) => values.includes(item))
}

function hasCheckedValue(value: FilterbarValue) {
  if (Array.isArray(value)) {
    return value.some((item) => hasCheckedValue(item as FilterbarValue))
  }
  return value !== '' && value !== undefined && value !== null
}

function applyValuesToOptions(options: FilterbarItem[], values: FilterbarValue[]): FilterbarItem[] {
  return options.map((option, index) => {
    const value = values[index]
    switch (option.type) {
      case 'radio': {
        const children = option.children.map((child) => ({ ...child, checked: value === child.value }))
        return { ...option, checked: value !== '', visible: false, children }
      }
      case 'checkbox': {
        const checkedValues = Array.isArray(value) ? value : []
        const children = option.children.map((child) => ({ ...child, checked: checkedValues.includes(child.value) }))
        return { ...option, checked: checkedValues.length > 0, visible: false, children }
      }
      case 'filter': {
        const childValues = Array.isArray(value) ? value : []
        const children = option.children.map((child, childIndex) => {
          const nextValue = childValues[childIndex]
          if (child.type === 'radio') {
            const nextChildren = child.children.map((item) => ({ ...item, checked: nextValue === item.value }))
            return { ...child, children: nextChildren }
          }
          const nextChildren = child.children.map((item) => ({
            ...item,
            checked: Array.isArray(nextValue) ? nextValue.includes(item.value) : false,
          }))
          return { ...child, children: nextChildren }
        })
        return { ...option, checked: hasCheckedValue(value), visible: false, children }
      }
      default:
        return option
    }
  })
}

function clearOptionSelection(option: FilterbarItem): FilterbarItem {
  switch (option.type) {
    case 'radio':
    case 'checkbox':
      return {
        ...option,
        checked: false,
        visible: false,
        children: option.children.map((child) => ({ ...child, checked: false })),
      }
    case 'filter':
      return {
        ...option,
        checked: false,
        visible: false,
        children: option.children.map((child) => ({
          ...child,
          children: child.children.map((item) => ({ ...item, checked: false })),
        })),
      }
    case 'sort':
      return {
        ...option,
        checked: false,
        sort: undefined,
      }
    default:
      return {
        ...option,
        checked: false,
        visible: false,
      }
  }
}

function getItemClass(prefixCls: string, option: FilterbarItem) {
  return classNames(`${prefixCls}__item`, {
    [`${prefixCls}__item--has-icon`]: option.type !== 'text',
    [`${prefixCls}__item--checked`]: !!option.checked,
    [`${prefixCls}__item--visible`]: !!option.visible,
  })
}

function getIconClass(prefixCls: string, option: FilterbarItem) {
  const iconClasses: string[] = [`${prefixCls}__icon`]

  if (option.type !== 'text') {
    iconClasses.push(`${prefixCls}__icon--${option.type}`)
  }

  if (option.type === 'sort') {
    if (option.sort === 1) {
      iconClasses.push(`${prefixCls}__icon--sort-asc`)
    } else if (option.sort === -1) {
      iconClasses.push(`${prefixCls}__icon--sort-desc`)
    }
  }

  return classNames(iconClasses)
}

function buildFilterChildren(children: FilterbarFilterChildItem[], value: FilterbarValue): FilterbarRenderFilterChildItem[] {
  const childValues = Array.isArray(value) ? value : []
  return children.map((child, childIndex) => {
    const currentValue = childValues[childIndex]
    return {
      ...child,
      selected: getFilterChildSelected(child, currentValue),
      children: child.children.map((item) => ({
        ...item,
        checked: isContain(currentValue as any, item.value),
      })),
    }
  })
}

function buildRenderOptions(prefixCls: string, options: FilterbarItem[], values: FilterbarValue[]): FilterbarRenderItem[] {
  return options.map((option, index) => {
    const currentValue = values[index]
    return {
      ...option,
      displayLabel: getDisplayValue(option, currentValue),
      itemClass: getItemClass(prefixCls, option),
      iconClass: getIconClass(prefixCls, option),
      groupOptions: option.type === 'radio' || option.type === 'checkbox' ? getGroupOptions(option.children) : undefined,
      children:
        option.type === 'filter'
          ? buildFilterChildren(option.children, currentValue)
          : 'children' in option
            ? option.children.map((child) => ({
              ...child,
              checked: isContain(currentValue as any, child.value),
            }))
            : undefined,
    } as FilterbarRenderItem
  })
}

function getDisplayItems(options: FilterbarItem[], values: FilterbarValue[]) {
  return options.map((option, index) => {
    if (option.type === 'radio' || option.type === 'checkbox') {
      return {
        ...option,
        selected: getDisplayValue(option, values[index]),
      }
    }
    if (option.type === 'filter') {
      return {
        ...option,
        children: option.children.map((child, childIndex) => ({
          ...child,
          selected: getFilterChildSelected(child, Array.isArray(values[index]) ? values[index][childIndex] : undefined),
        })),
      }
    }
    return { ...option }
  })
}

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-filterbar',
    },
  },
})
class Filterbar extends Doraemon {
  prefixCls!: string

  @Prop({
    type: Array,
    default: () => [],
  })
  items: FilterbarItem[]

  @Prop({
    type: String,
    default: '重置',
  })
  cancelText: string

  @Prop({
    type: String,
    default: '确定',
  })
  confirmText: string

  options: FilterbarItem[] = []
  values: FilterbarValue[] = []
  showOptions: FilterbarRenderItem[] = []
  activeIndex: number = -1
  backdropVisible: boolean = false

  get classes() {
    const prefixCls = this.prefixCls
    return {
      wrap: classNames(prefixCls),
      bd: `${prefixCls}__bd`,
      text: `${prefixCls}__text`,
      pop: `${prefixCls}__pop`,
      select: `${prefixCls}__select`,
      scrollView: `${prefixCls}__scroll-view`,
      panel: `${prefixCls}__panel`,
      panelHd: `${prefixCls}__panel-hd`,
      panelTitle: `${prefixCls}__panel-title`,
      panelSelected: `${prefixCls}__panel-selected`,
      panelBd: `${prefixCls}__panel-bd`,
      groups: `${prefixCls}__groups`,
      group: `${prefixCls}__group`,
      radio: `${prefixCls}__radio`,
      check: `${prefixCls}__check`,
      btn: `${prefixCls}__btn`,
      btnChecked: `${prefixCls}__btn--checked`,
      btns: `${prefixCls}__btns`,
      btnDanger: `${prefixCls}__btn--danger`,
    }
  }

  @Watch('items')
  onItemsChange(newVal: FilterbarItem[]) {
    this.syncItems(newVal)
  }

  syncItems(items: FilterbarItem[] = []) {
    const options = clone(items) || []
    this.options = options
    this.values = getValues(options)
    this.activeIndex = -1
    this.backdropVisible = false
    this.refreshShowOptions()
  }

  refreshShowOptions() {
    this.showOptions = buildRenderOptions(this.prefixCls, this.options, this.values)
  }

  updatedValues(values: FilterbarValue[], callback?: () => void) {
    this.values = values
    this.refreshShowOptions()
    if (typeof callback === 'function') callback()
  }

  onBackdropClick() {
    if (this.activeIndex !== -1) {
      this.onSelectClose(this.activeIndex)
    }
  }

  onClose(e: CustomEvent<{}, {}, { index: number }>) {
    this.onSelectClose(e.currentTarget.dataset.index)
  }

  onSelectClose(index: number, callback?: () => void) {
    this.options = this.options.map((option, optionIndex) => ({
      ...option,
      visible: optionIndex === index ? false : !!option.visible,
    }))
    this.values = getValues(this.options)
    this.activeIndex = -1
    this.backdropVisible = false
    this.refreshShowOptions()
    if (typeof callback === 'function') callback()
  }

  onSelectReset(e: CustomEvent<{}, {}, { index: number }>) {
    const { index } = e.currentTarget.dataset
    const values = [...this.values]
    values[index] = []
    this.updatedValues(values)
  }

  onSelectConfirm(e: CustomEvent<{}, {}, { index: number }>) {
    const { index } = e.currentTarget.dataset
    this.options = applyValuesToOptions(this.options, this.values)
    this.onSelectClose(index, () => this.onChange())
  }

  onPopupSelectChange(e: CustomEvent<{ value: string[] | string }, {}, { index: number; parentIndex: number }>) {
    const values = [...this.values]
    const { value } = e.detail
    const { index, parentIndex } = e.currentTarget.dataset
    const parentValues = Array.isArray(values[parentIndex]) ? [...(values[parentIndex] as FilterbarValue[])] : []
    parentValues[index] = value as FilterbarValue
    values[parentIndex] = parentValues
    this.updatedValues(values)
  }

  onSelectChange(
    e: CustomEvent<{ value?: string[] | string; selectedValue?: string[] | string }, {}, { index: number; type: FilterbarItem['type'] }>,
  ) {
    const values = [...this.values]
    const value = e.detail.selectedValue ?? e.detail.value ?? ''
    const { index, type } = e.currentTarget.dataset
    values[index] = value as FilterbarValue
    this.updatedValues(values)
    if (type === 'radio') {
      this.options = applyValuesToOptions(this.options, values)
      this.onSelectClose(index, () => this.onChange())
    }
  }

  onClick(e: CustomEvent<{}, {}, { index: number }>) {
    const { index } = e.currentTarget.dataset
    const options = this.options
    if (!options[index].visible) {
      this.values = getValues(options)
    }
    this.onOpenSelect(index)
  }

  onOpenSelect(index: number) {
    const current = this.options[index]
    const options = this.options.map((option, optionIndex) => {
      let nextChecked = optionIndex === index ? !option.checked : false

      if (option.checked) {
        const has = getDifference(option.groups || [], current.groups || [])
        nextChecked = has.length > 0

        if (option.type === 'text' && optionIndex === index) {
          nextChecked = false
        }

        if (optionIndex !== index && has.length === 0) {
          return clearOptionSelection({
            ...option,
            checked: nextChecked,
          })
        }
      }

      switch (option.type) {
        case 'radio':
        case 'checkbox':
        case 'filter':
          return {
            ...option,
            checked: nextChecked,
            visible: optionIndex === index ? !option.visible : false,
          }
        case 'sort':
          return {
            ...option,
            checked: nextChecked,
            sort: optionIndex === index ? (typeof option.sort === 'number' ? ((option.sort * -1) as 1 | -1) : 1) : option.sort,
          }
        default:
          return {
            ...option,
            checked: nextChecked,
            visible: false,
          }
      }
    })

    this.options = options
    this.activeIndex = options[index].visible ? index : -1
    this.backdropVisible = !!options[index].visible && options[index].type === 'filter'
    this.refreshShowOptions()

    if (current.type !== 'radio' && current.type !== 'checkbox' && current.type !== 'filter') {
      this.onChange()
    }
  }

  onChange() {
    const checkedValues = getValues(this.options)
    const items = getDisplayItems(this.options, checkedValues)
    this.values = checkedValues
    this.refreshShowOptions()
    this.$emit('change', {
      checkedItems: items.filter((item) => item.checked),
      items,
      checkedValues,
    })
  }

  onScroll(e: CustomEvent) {
    this.$emit('scroll', e.detail)
  }

  onOpen(e: CustomEvent) {
    this.$emit('open', e.detail)
  }

  onClosed(e: CustomEvent) {
    this.$emit('close', e.detail)
  }

  noop() {
    /**
     * Ignore
     */
  }

  mounted() {
    this.syncItems(this.items)
  }
}

export { Filterbar }

export default defineComponentHOC()(Filterbar)
