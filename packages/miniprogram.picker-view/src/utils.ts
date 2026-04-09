import type { PickerViewUtilsFieldNames } from './types'

const DEFAULT_FIELD_NAMES: PickerViewUtilsFieldNames = {
  label: 'label',
  value: 'value',
  disabled: 'disabled',
}

export function getRealIndex(value = 0, min = 0, max = 0) {
  if (value <= min) return min
  if (value >= max) return max
  return value
}

export function getIndexFromValue(
  value: unknown,
  col: Array<Record<string, unknown>> = [],
  fieldNames: PickerViewUtilsFieldNames = DEFAULT_FIELD_NAMES,
) {
  return getRealIndex(col.map((v) => v[fieldNames.value]).indexOf(value as string), 0, col.length - 1)
}

export function getRealValue(
  value = '',
  col: Array<Record<string, unknown>> = [],
  fieldNames: PickerViewUtilsFieldNames = DEFAULT_FIELD_NAMES,
) {
  return col.length > 0 ? (col[getIndexFromValue(value, col, fieldNames)]?.[fieldNames.value] as string) : ''
}

export function getLabelFromIndex(index: number, col: Array<Record<string, unknown>> = [], member?: string) {
  return member ? col[index]?.[member] : col[index]
}

export function getRealCol(
  data: Array<string | Record<string, unknown>> = [],
  fieldNames: PickerViewUtilsFieldNames = DEFAULT_FIELD_NAMES,
) {
  return data.map((v) => {
    if (typeof v !== 'object') {
      return {
        [fieldNames.value]: v,
        [fieldNames.label]: v,
      }
    }
    return v
  })
}
