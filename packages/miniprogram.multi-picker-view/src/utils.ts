import type { MultiPickerUtilsFieldNames } from './types'

const DEFAULT_FIELD_NAMES: MultiPickerUtilsFieldNames = {
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
  fieldNames: MultiPickerUtilsFieldNames = DEFAULT_FIELD_NAMES,
) {
  return getRealIndex(col.map((v) => v[fieldNames.value]).indexOf(value as string), 0, col.length - 1)
}

export function getIndexesFromValues(
  values: string[] = [],
  cols: Array<Array<Record<string, unknown>>> = [],
  fieldNames: MultiPickerUtilsFieldNames = DEFAULT_FIELD_NAMES,
) {
  return cols.reduce<number[]>((acc, col, idx) => [...acc, getIndexFromValue(values[idx], col, fieldNames)], [])
}

export function getRealValue(
  value = '',
  col: Array<Record<string, unknown>> = [],
  fieldNames: MultiPickerUtilsFieldNames = DEFAULT_FIELD_NAMES,
) {
  return col.length > 0 ? (col[getIndexFromValue(value, col, fieldNames)]?.[fieldNames.value] as string) : ''
}

export function getRealValues(
  values: string[] = [],
  cols: Array<Array<Record<string, unknown>>> = [],
  fieldNames: MultiPickerUtilsFieldNames = DEFAULT_FIELD_NAMES,
) {
  return cols.length > 0 ? cols.reduce<string[]>((acc, col, idx) => [...acc, getRealValue(values[idx], col, fieldNames)], []) : []
}

export function getLabelFromIndex(index: number, col: Array<Record<string, unknown>> = [], member?: string) {
  return member ? col[index]?.[member] : col[index]
}

export function getLabelsFromIndexes(indexes: number[], cols: Array<Array<Record<string, unknown>>> = [], member?: string) {
  return cols.reduce<Array<unknown>>((acc, col, idx) => [...acc, getLabelFromIndex(indexes[idx], col, member)], [])
}

export function isMultiPicker(data: unknown[] = []) {
  return !!data && Array.isArray(data[0])
}

export function getRealCol(
  data: Array<string | Record<string, unknown>> = [],
  fieldNames: MultiPickerUtilsFieldNames = DEFAULT_FIELD_NAMES,
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

export function getRealCols(data: any[] = [], fieldNames: MultiPickerUtilsFieldNames = DEFAULT_FIELD_NAMES) {
  const cols = isMultiPicker(data) ? data : [data]
  return cols.reduce<Array<Array<Record<string, unknown>>>>((acc, col) => [...acc, getRealCol(col, fieldNames)], [])
}
