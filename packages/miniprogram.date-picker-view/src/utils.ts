import type { DatePickerViewUtilsFieldNames } from './types'

export const DATETIME = 'datetime'
export const DATE = 'date'
export const TIME = 'time'
export const MONTH = 'month'
export const YEAR = 'year'
export const ONE_DAY = 24 * 60 * 60 * 1000
export const TILL_NOW = 'TILL_NOW'

export function fomartArray(min: number, max: number, step = 1) {
  let i = min
  const result: number[] = []
  while (i <= max) {
    result.push(i)
    i += step
  }
  return result
}

export function getDaysInMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

export function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`
}

export function cloneDate(date: Date) {
  return new Date(+date)
}

export function setMonth(date: Date, month: number) {
  date.setDate(Math.min(date.getDate(), getDaysInMonth(new Date(date.getFullYear(), month))))
  date.setMonth(month)
}

export function isTillNow(value: any) {
  return value && (value.tillNow || value[0] === TILL_NOW)
}

export const modeRecord: Record<string, string> = {
  datetime: 'yyyy-MM-dd hh:mm',
  date: 'yyyy-MM-dd',
  year: 'yyyy',
  month: 'yyyy-MM',
  time: 'hh:mm',
}

const makePattern = (str: string) => new RegExp(`^${str.replace(/[a-zA-Z]/g, '\\d')}$`)
const isDateString = (value: string) => Object.keys(modeRecord).some((key) => makePattern(modeRecord[key]).test(value))

export function convertStringArrayToDate(value: any, props: any = {}) {
  if (isTillNow(value)) return new Date()
  if (!Array.isArray(value)) {
    let nextValue: any = value
    if (typeof nextValue === 'string' && isDateString(nextValue)) {
      const now = new Date()
      if (makePattern(modeRecord.year).test(nextValue)) nextValue = `${nextValue}-${now.getMonth()}-${now.getDate()}`
      if (makePattern(modeRecord.month).test(nextValue)) nextValue = `${nextValue}-${now.getDate()}`
      if (makePattern(modeRecord.time).test(nextValue)) nextValue = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${nextValue}`
      nextValue = nextValue.replace(/\-/g, '/')
    } else if (!isNaN(parseInt(nextValue, 10))) {
      nextValue = parseInt(nextValue, 10)
    }
    return new Date(nextValue)
  }

  const { mode, use12Hours } = props
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const day = now.getDate()

  const fixValue = (v: string[], m: string) => {
    if (m === DATETIME)
      return [
        v[0] ? parseInt(v[0], 10) : year,
        v[1] ? parseInt(v[1], 10) : 0,
        v[2] ? parseInt(v[2], 10) : 1,
        v[3] ? parseInt(v[3], 10) : 0,
        v[4] ? parseInt(v[4], 10) : 0,
        0,
      ]
    if (m === TIME) return [year, month, day, v[0] ? parseInt(v[0], 10) : 0, v[1] ? parseInt(v[1], 10) : 0, 0]
    if (m === DATE) return [v[0] ? parseInt(v[0], 10) : year, v[1] ? parseInt(v[1], 10) : 0, v[2] ? parseInt(v[2], 10) : 1, 0, 0, 0]
    if (m === MONTH) return [v[0] ? parseInt(v[0], 10) : year, v[1] ? parseInt(v[1], 10) : 0, 1, 0, 0, 0]
    return [v[0] ? parseInt(v[0], 10) : year, 0, 1, 0, 0, 0]
  }

  const getAmpm = (v: string[], m: string) => (m === DATETIME ? (v[5] ? String(v[5]) : '0') : v[2] ? String(v[2]) : '0')
  const newValue = fixValue(value, mode)
  if (use12Hours && (mode === TIME || mode === DATETIME)) {
    const ampm = getAmpm(value, mode)
    let nhour = parseInt(String(newValue[3]), 10)
    if (ampm === '1') {
      if (nhour <= 12) nhour += 12
      nhour = nhour >= 24 ? 0 : nhour
    } else {
      if (nhour === 0) nhour = 12
      if (nhour > 12) nhour -= 12
      nhour = nhour >= 12 ? 0 : nhour
    }
    newValue.splice(3, 1, nhour)
  }
  return new Date(...(newValue as [number, number, number, number, number, number]))
}

export function convertDateToStringArray(date: Date, props: any = {}) {
  if (!date) return []
  const { mode, use12Hours } = props
  let value: string[] = []
  if (mode === YEAR) value = [`${date.getFullYear()}`]
  if (mode === MONTH) value = [`${date.getFullYear()}`, `${date.getMonth()}`]
  if (mode === DATETIME || mode === DATE) value = [`${date.getFullYear()}`, `${date.getMonth()}`, `${date.getDate()}`]
  if (mode === DATETIME || mode === TIME) {
    const hour = date.getHours()
    const minute = date.getMinutes()
    let dtValue = [`${hour}`, `${minute}`]
    if (use12Hours) {
      const nhour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
      dtValue = [`${nhour}`, `${minute}`, `${hour >= 12 ? 1 : 0}`]
    }
    value = value.concat(dtValue)
  }
  return value
}

const DEFAULT_FIELD_NAMES: DatePickerViewUtilsFieldNames = { label: 'label', value: 'value', disabled: 'disabled' }

export function getRealIndex(value = 0, min = 0, max = 0) {
  if (value <= min) return min
  if (value >= max) return max
  return value
}

export function getIndexFromValue(
  value: unknown,
  col: Array<Record<string, unknown>> = [],
  fieldNames: DatePickerViewUtilsFieldNames = DEFAULT_FIELD_NAMES,
) {
  return getRealIndex(col.map((v) => v[fieldNames.value]).indexOf(value as string), 0, col.length - 1)
}

export function getIndexesFromValues(
  values: string[] = [],
  cols: Array<Array<Record<string, unknown>>> = [],
  fieldNames: DatePickerViewUtilsFieldNames = DEFAULT_FIELD_NAMES,
) {
  return cols.reduce<number[]>((acc, col, idx) => [...acc, getIndexFromValue(values[idx], col, fieldNames)], [])
}

export function getRealValue(
  value = '',
  col: Array<Record<string, unknown>> = [],
  fieldNames: DatePickerViewUtilsFieldNames = DEFAULT_FIELD_NAMES,
) {
  return col.length > 0 ? (col[getIndexFromValue(value, col, fieldNames)]?.[fieldNames.value] as string) : ''
}

export function getRealValues(
  values: string[] = [],
  cols: Array<Array<Record<string, unknown>>> = [],
  fieldNames: DatePickerViewUtilsFieldNames = DEFAULT_FIELD_NAMES,
) {
  return cols.length > 0 ? cols.reduce<string[]>((acc, col, idx) => [...acc, getRealValue(values[idx], col, fieldNames)], []) : []
}

export function getLabelFromIndex(index: number, col: Array<Record<string, unknown>> = [], member?: string) {
  return member ? col[index]?.[member] : col[index]
}

export function getLabelsFromIndexes(indexes: number[], cols: Array<Array<Record<string, unknown>>> = [], member?: string) {
  return cols.reduce<Array<unknown>>((acc, col, idx) => [...acc, getLabelFromIndex(indexes[idx], col, member)], [])
}
