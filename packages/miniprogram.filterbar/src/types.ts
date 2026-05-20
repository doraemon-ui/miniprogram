import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'
import type { PresetColor } from '@doraemon-ui/miniprogram.shared'

import type { Filterbar } from './index'

export type FilterbarOptionValue = string | number
export type FilterbarSortValue = 1 | -1
export type FilterbarValue =
  | ''
  | FilterbarOptionValue
  | FilterbarSortValue
  | FilterbarOptionValue[]
  | FilterbarValue[]

export interface FilterbarChoiceItem {
  label: string
  value: FilterbarOptionValue
  checked?: boolean
}

export interface FilterbarBaseItem {
  label: string
  type: 'text' | 'sort' | 'radio' | 'checkbox' | 'filter'
  checked?: boolean
  visible?: boolean
  groups?: string[]
}

export interface FilterbarTextItem extends FilterbarBaseItem {
  type: 'text'
  value?: FilterbarOptionValue
}

export interface FilterbarSortItem extends FilterbarBaseItem {
  type: 'sort'
  sort?: FilterbarSortValue
}

export interface FilterbarRadioItem extends FilterbarBaseItem {
  type: 'radio'
  children: FilterbarChoiceItem[]
}

export interface FilterbarCheckboxItem extends FilterbarBaseItem {
  type: 'checkbox'
  children: FilterbarChoiceItem[]
}

export interface FilterbarFilterChildItem {
  label: string
  type: 'radio' | 'checkbox'
  children: FilterbarChoiceItem[]
}

export interface FilterbarFilterItem extends FilterbarBaseItem {
  type: 'filter'
  children: FilterbarFilterChildItem[]
}

export type FilterbarItem =
  | FilterbarTextItem
  | FilterbarSortItem
  | FilterbarRadioItem
  | FilterbarCheckboxItem
  | FilterbarFilterItem

export interface FilterbarRenderFilterChildItem extends FilterbarFilterChildItem {
  selected: string
  children: FilterbarChoiceItem[]
}

export type FilterbarDisplayValue = string | string[]

export type FilterbarRenderItem = FilterbarItem & {
  displayLabel: FilterbarDisplayValue
  itemClass: string
  iconClass: string
  groupOptions?: Array<{
    title: string
    value: string
    color: PresetColor
  }>
  children?: FilterbarChoiceItem[] | FilterbarRenderFilterChildItem[]
}

export interface FilterbarProps {
  prefixCls?: string
  items?: FilterbarItem[]
  cancelText?: string
  confirmText?: string
}

export interface FilterbarExpose {}

export type FilterbarInstance = ComponentPublicInstance<Filterbar, FilterbarProps, FilterbarExpose>
