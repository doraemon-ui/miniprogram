import { defineComponentHOC, Doraemon, Component } from '@doraemon-ui/miniprogram.core-js'
import { useRect } from '@doraemon-ui/miniprogram.shared'
import type { MiniprogramDOMRect, MiniprogramPublicInstance } from '@doraemon-ui/miniprogram.shared'
import type {
  CalendarDay,
  CalendarDayType,
  CalendarDirection,
  CalendarMonth,
  CalendarOpenOptions,
  CalendarWeek,
  TouchPosition,
} from './types'
const { classNames } = Doraemon.util

const defaults = {
  prefixCls: 'dora-calendar',
  monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  dayNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  firstDay: 1,
  weekendDays: [0, 6],
  multiple: false,
  dateFormat: 'yyyy-mm-dd',
  direction: 'horizontal' as CalendarDirection,
  minDate: null as number | string | null,
  maxDate: null as number | string | null,
  touchMove: true,
  animate: true,
  closeOnSelect: true,
  weekHeader: true,
  toolbar: true,
  value: [] as Array<number | string>,
}

const getTouchPosition = (e: WechatMiniprogram.TouchEvent): TouchPosition => {
  const touches = (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0])
  return {
    x: touches.pageX,
    y: touches.pageY,
  }
}

const getTransform = (translate: number, isH: boolean) => `transform: translate3d(${isH ? translate : 0}%, ${isH ? 0 : translate}%, 0)`

const isSameDate = (a: number | string, b: number | string) => {
  const prev = new Date(a)
  const next = new Date(b)
  return prev.getFullYear() === next.getFullYear() && prev.getMonth() === next.getMonth() && prev.getDate() === next.getDate()
}

@Component({
  props: {
    prefixCls: {
      type: String,
      default: defaults.prefixCls,
    },
  },
  expose: ['open', 'close', 'setYearMonth', 'nextMonth', 'prevMonth', 'nextYear', 'prevYear'],
})
class Calendar extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Calendar
   */
  prefixCls!: string

  visible: boolean = false

  monthNames: string[] = defaults.monthNames
  monthNamesShort: string[] = defaults.monthNamesShort
  dayNames: string[] = defaults.dayNames
  dayNamesShort: string[] = defaults.dayNamesShort
  firstDay: number = defaults.firstDay
  weekendDays: number[] = defaults.weekendDays
  multiple: boolean = defaults.multiple
  dateFormat: string = defaults.dateFormat
  direction: CalendarDirection = defaults.direction
  minDate: number | string | null = defaults.minDate
  maxDate: number | string | null = defaults.maxDate
  touchMove: boolean = defaults.touchMove
  animate: boolean = defaults.animate
  closeOnSelect: boolean = defaults.closeOnSelect
  weekHeader: boolean = defaults.weekHeader
  toolbar: boolean = defaults.toolbar
  value: Array<number | string> = []

  weeks: CalendarWeek[] = []
  months: CalendarMonth[] = []
  monthsTranslate: string[] = []
  wrapperTranslate: string = ''
  swiping: boolean = false

  currentMonth: number = 0
  currentYear: number = 0
  currentMonthName: string = ''

  private fns: Required<
    Pick<
      CalendarOpenOptions,
      'onMonthAdd' | 'onChange' | 'onOpen' | 'onClose' | 'onDayClick' | 'onMonthYearChangeStart' | 'onMonthYearChangeEnd'
    >
  > = {
    onMonthAdd: () => {},
    onChange: () => {},
    onOpen: () => {},
    onClose: () => {},
    onDayClick: () => {},
    onMonthYearChangeStart: () => {},
    onMonthYearChangeEnd: () => {},
  }

  private monthsTranslateIndex: number = 0
  private isH: boolean = true
  private start: TouchPosition = { x: 0, y: 0 }
  private move: Partial<TouchPosition> = {}
  private touchesDiff: number = 0
  private allowItemClick: boolean = true
  private isMoved: boolean = false
  private isRendered: boolean = false

  get classes() {
    const { prefixCls, direction } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--${direction}`]: direction,
    })
    const content = `${prefixCls}__content`
    const hd = `${prefixCls}__hd`
    const toolbar = `${prefixCls}__toolbar`
    const picker = `${prefixCls}__picker`
    const link = `${prefixCls}__link`
    const prev = classNames(`${prefixCls}__icon`, {
      [`${prefixCls}__icon--prev`]: true,
    })
    const next = classNames(`${prefixCls}__icon`, {
      [`${prefixCls}__icon--next`]: true,
    })
    const value = `${prefixCls}__value`
    const bd = `${prefixCls}__bd`
    const weekdays = `${prefixCls}__weekdays`
    const weekday = `${prefixCls}__weekday`
    const months = `${prefixCls}__months`
    const monthsContent = `${prefixCls}__months-content`
    const month = `${prefixCls}__month`
    const days = `${prefixCls}__days`
    const day = `${prefixCls}__day`
    const text = `${prefixCls}__text`

    return {
      wrap,
      content,
      hd,
      toolbar,
      picker,
      link,
      prev,
      next,
      value,
      bd,
      weekdays,
      weekday,
      months,
      monthsContent,
      month,
      days,
      day,
      text,
    }
  }

  private mergeOptions(opts: CalendarOpenOptions = {}) {
    const { onMonthAdd, onChange, onOpen, onClose, onDayClick, onMonthYearChangeStart, onMonthYearChangeEnd, ...rest } = opts
    this.fns = {
      onMonthAdd: onMonthAdd || (() => {}),
      onChange: onChange || (() => {}),
      onOpen: onOpen || (() => {}),
      onClose: onClose || (() => {}),
      onDayClick: onDayClick || (() => {}),
      onMonthYearChangeStart: onMonthYearChangeStart || (() => {}),
      onMonthYearChangeEnd: onMonthYearChangeEnd || (() => {}),
    }
    return rest
  }

  open(opts: CalendarOpenOptions = {}) {
    const config = { ...defaults, ...this.mergeOptions(opts) }
    this.monthsTranslateIndex = 0
    this.isH = config.direction === 'horizontal'

    this.monthNames = config.monthNames
    this.monthNamesShort = config.monthNamesShort
    this.dayNames = config.dayNames
    this.dayNamesShort = config.dayNamesShort
    this.firstDay = config.firstDay
    this.weekendDays = config.weekendDays
    this.multiple = config.multiple
    this.dateFormat = config.dateFormat
    this.direction = config.direction
    this.minDate = config.minDate
    this.maxDate = config.maxDate
    this.touchMove = config.touchMove
    this.animate = config.animate
    this.closeOnSelect = config.closeOnSelect
    this.weekHeader = config.weekHeader
    this.toolbar = config.toolbar

    this.visible = true

    this.setValue(config.value || [])
    this.init()

    this.fns.onOpen()
  }

  close() {
    this.visible = false
    this.fns.onClose()
  }

  init() {
    const weeks = this.setWeekHeader()
    const months = this.setMonthsHTML()
    const monthsTranslate = this.setMonthsTranslate()

    months.forEach((month) => this.fns.onMonthAdd(month))

    this.weeks = weeks
    this.months = months
    this.monthsTranslate = monthsTranslate
    this.wrapperTranslate = ''

    const params = this.updateCurrentMonthYear()
    this.currentMonth = params.currentMonth
    this.currentYear = params.currentYear
    this.currentMonthName = params.currentMonthName
  }

  setMonthsTranslate(translate: number = this.monthsTranslateIndex) {
    const prevMonthTranslate = -(translate + 1) * 100
    const currentMonthTranslate = -translate * 100
    const nextMonthTranslate = -(translate - 1) * 100
    return [
      getTransform(prevMonthTranslate, this.isH),
      getTransform(currentMonthTranslate, this.isH),
      getTransform(nextMonthTranslate, this.isH),
    ]
  }

  updateCurrentMonthYear(dir?: 'prev' | 'next') {
    const { months, monthNames } = this
    if (!dir) {
      const currentMonth = parseInt(String(months[1].month), 10)
      const currentYear = parseInt(String(months[1].year), 10)
      const currentMonthName = monthNames[currentMonth]
      return { currentMonth, currentYear, currentMonthName }
    }
    const index = dir === 'next' ? months.length - 1 : 0
    const currentMonth = parseInt(String(months[index].month), 10)
    const currentYear = parseInt(String(months[index].year), 10)
    const currentMonthName = monthNames[currentMonth]
    return { currentMonth, currentYear, currentMonthName }
  }

  onTouchStart(e: WechatMiniprogram.TouchEvent) {
    if (!this.touchMove || this.isMoved || this.isRendered) return
    this.start = getTouchPosition(e)
    this.move = {}
    this.touchesDiff = 0
    this.allowItemClick = true
    this.isMoved = false
  }

  async onTouchMove(e: WechatMiniprogram.TouchEvent) {
    if (!this.touchMove || this.isRendered) return
    this.allowItemClick = false
    if (!this.isMoved) {
      this.isMoved = true
    }
    this.swiping = true

    const prefixCls = this.prefixCls
    const rect = (await useRect(
      `.${prefixCls}__months-content`,
      this._renderProxy as unknown as MiniprogramPublicInstance,
    )) as unknown as MiniprogramDOMRect
    if (!rect || !this.isMoved) return

    this.move = getTouchPosition(e)
    this.touchesDiff = this.isH ? this.move.x! - this.start.x : this.move.y! - this.start.y

    const { width, height } = rect
    const percentage = this.touchesDiff / (this.isH ? width : height)
    const currentTranslate = (this.monthsTranslateIndex + percentage) * 100
    const transform = getTransform(currentTranslate, this.isH)
    this.wrapperTranslate = `transition-duration: 0s; ${transform}`
  }

  onTouchEnd() {
    if (!this.touchMove || !this.isMoved || this.isRendered) return
    this.isMoved = false
    this.swiping = false

    if (Math.abs(this.touchesDiff) < 30) {
      this.resetMonth()
    } else if (this.touchesDiff >= 30) {
      this.prevMonth()
    } else {
      this.nextMonth()
    }
    setTimeout(() => (this.allowItemClick = true), 100)
  }

  onDayClick(e: WechatMiniprogram.TouchEvent) {
    if (!this.allowItemClick) return
    const dataset = (e.currentTarget as any).dataset as any
    const dateYear = dataset.year
    const dateMonth = dataset.month
    const dateDay = dataset.day
    const dateType = dataset.type as CalendarDayType

    if (dateType.selected && !this.multiple) return
    if (dateType.disabled) return
    if (dateType.next) this.nextMonth()
    if (dateType.prev) this.prevMonth()

    this.fns.onDayClick(dateYear, dateMonth, dateDay)

    this.addValue(new Date(dateYear, dateMonth, dateDay).getTime())

    if (this.closeOnSelect && !this.multiple) {
      this.close()
    }
  }

  resetMonth() {
    const translate = this.monthsTranslateIndex * 100
    const transform = getTransform(translate, this.isH)
    this.wrapperTranslate = `transition-duration: 0s; ${transform}`
  }

  setYearMonth(year: number = this.currentYear, month: number = this.currentMonth) {
    const targetDate = year < this.currentYear ? new Date(year, month + 1, -1).getTime() : new Date(year, month).getTime()
    if (this.maxDate && targetDate > new Date(this.maxDate).getTime()) return
    if (this.minDate && targetDate < new Date(this.minDate).getTime()) return

    const currentDate = new Date(this.currentYear, this.currentMonth).getTime()
    const dir: 'next' | 'prev' = targetDate > currentDate ? 'next' : 'prev'
    const newMonthHTML = this.monthHTML(new Date(year, month))

    const prevTranslate = this.monthsTranslateIndex || 0
    if (targetDate > currentDate) {
      this.monthsTranslateIndex = this.monthsTranslateIndex - 1
      const translate = -(prevTranslate - 1) * 100
      const nextMonthTranslate = getTransform(translate, this.isH)
      this.months = [this.months[1], this.months[2], newMonthHTML]
      this.monthsTranslate = [this.monthsTranslate[1], this.monthsTranslate[2], nextMonthTranslate]
    } else {
      this.monthsTranslateIndex = this.monthsTranslateIndex + 1
      const translate = -(prevTranslate + 1) * 100
      const prevMonthTranslate = getTransform(translate, this.isH)
      this.months = [newMonthHTML, this.months[0], this.months[1]]
      this.monthsTranslate = [prevMonthTranslate, this.monthsTranslate[0], this.monthsTranslate[1]]
    }

    this.onMonthChangeStart(dir)

    const transform = getTransform(this.monthsTranslateIndex * 100, this.isH)
    const duration = this.animate ? 0.3 : 0
    this.wrapperTranslate = `transition-duration: ${duration}s; ${transform}`
    setTimeout(() => this.onMonthChangeEnd(dir, true), duration * 1000)
  }

  nextYear() {
    this.setYearMonth(this.currentYear + 1)
  }

  prevYear() {
    this.setYearMonth(this.currentYear - 1)
  }

  nextMonth() {
    const nextMonth = parseInt(String(this.months[this.months.length - 1].month), 10)
    const nextYear = parseInt(String(this.months[this.months.length - 1].year), 10)
    const nextDate = new Date(nextYear, nextMonth)
    const nextDateTime = nextDate.getTime()

    if (this.maxDate && nextDateTime > new Date(this.maxDate).getTime()) {
      return this.resetMonth()
    }

    this.monthsTranslateIndex = this.monthsTranslateIndex - 1

    if (nextMonth === this.currentMonth) {
      const translate = -this.monthsTranslateIndex * 100
      const nextMonthHTML = this.monthHTML(nextDateTime, 'next')
      const nextMonthTranslate = getTransform(translate, this.isH)
      const months = [this.months[1], this.months[2], nextMonthHTML]
      this.months = months
      this.monthsTranslate = [this.monthsTranslate[1], this.monthsTranslate[2], nextMonthTranslate]
      this.fns.onMonthAdd(months[months.length - 1])
    }

    this.onMonthChangeStart('next')

    const transform = getTransform(this.monthsTranslateIndex * 100, this.isH)
    const duration = this.animate ? 0.3 : 0
    this.wrapperTranslate = `transition-duration: ${duration}s; ${transform}`
    setTimeout(() => this.onMonthChangeEnd('next'), duration * 1000)
  }

  prevMonth() {
    const prevMonth = parseInt(String(this.months[0].month), 10)
    const prevYear = parseInt(String(this.months[0].year), 10)
    const prevDate = new Date(prevYear, prevMonth + 1, -1)
    const prevDateTime = prevDate.getTime()

    if (this.minDate && prevDateTime < new Date(this.minDate).getTime()) {
      return this.resetMonth()
    }

    this.monthsTranslateIndex = this.monthsTranslateIndex + 1

    if (prevMonth === this.currentMonth) {
      const translate = -this.monthsTranslateIndex * 100
      const prevMonthHTML = this.monthHTML(prevDateTime, 'prev')
      const prevMonthTranslate = getTransform(translate, this.isH)
      const months = [prevMonthHTML, this.months[0], this.months[1]]
      this.months = months
      this.monthsTranslate = [prevMonthTranslate, this.monthsTranslate[0], this.monthsTranslate[1]]
      this.fns.onMonthAdd(months[0])
    }

    this.onMonthChangeStart('prev')

    const transform = getTransform(this.monthsTranslateIndex * 100, this.isH)
    const duration = this.animate ? 0.3 : 0
    this.wrapperTranslate = `transition-duration: ${duration}s; ${transform}`
    setTimeout(() => this.onMonthChangeEnd('prev'), duration * 1000)
  }

  onMonthChangeStart(dir: 'prev' | 'next') {
    const params = this.updateCurrentMonthYear(dir)
    this.currentMonth = params.currentMonth
    this.currentYear = params.currentYear
    this.currentMonthName = params.currentMonthName
    this.fns.onMonthYearChangeStart(params.currentYear, params.currentMonth)
  }

  onMonthChangeEnd(dir: 'next' | 'prev' = 'next', rebuildBoth: boolean = false) {
    const currentYear = this.currentYear
    const currentMonth = this.currentMonth
    let months = [...this.months]

    if (!rebuildBoth) {
      const newMonthHTML = this.monthHTML(new Date(currentYear, currentMonth), dir)
      if (dir === 'next') {
        months = [months[1], months[2], newMonthHTML]
      } else {
        months = [newMonthHTML, months[0], months[1]]
      }
    } else {
      const prevMonthHTML = this.monthHTML(new Date(currentYear, currentMonth), 'prev')
      const nextMonthHTML = this.monthHTML(new Date(currentYear, currentMonth), 'next')
      months = [prevMonthHTML, months[dir === 'next' ? months.length - 1 : 0], nextMonthHTML]
    }

    const monthsTranslate = this.setMonthsTranslate(this.monthsTranslateIndex)
    this.isRendered = true
    this.months = months
    this.monthsTranslate = monthsTranslate
    this.isRendered = false

    this.fns.onMonthAdd(dir === 'next' ? months[months.length - 1] : months[0])
    this.fns.onMonthYearChangeEnd(currentYear, currentMonth)
  }

  setWeekHeader() {
    const weeks: CalendarWeek[] = []
    if (this.weekHeader) {
      for (let i = 0; i < 7; i++) {
        const weekDayIndex = i + this.firstDay > 6 ? i - 7 + this.firstDay : i + this.firstDay
        const dayName = this.dayNamesShort[weekDayIndex]
        const weekend = this.weekendDays.indexOf(weekDayIndex) >= 0
        weeks.push({ weekend, dayName })
      }
    }
    return weeks
  }

  daysInMonth(date: number) {
    const d = new Date(date)
    return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
  }

  monthHTML(date: number | Date, offset?: 'next' | 'prev') {
    let d = new Date(date)
    let year = d.getFullYear()
    let month = d.getMonth()
    let time = d.getTime()

    if (offset === 'next') {
      d = month === 11 ? new Date(year + 1, 0) : new Date(year, month + 1, 1)
    }
    if (offset === 'prev') {
      d = month === 0 ? new Date(year - 1, 11) : new Date(year, month - 1, 1)
    }
    if (offset === 'next' || offset === 'prev') {
      month = d.getMonth()
      year = d.getFullYear()
      time = d.getTime()
    }

    let daysInPrevMonth = this.daysInMonth(new Date(d.getFullYear(), d.getMonth()).getTime() - 10 * 24 * 60 * 60 * 1000)
    const daysInMonthNow = this.daysInMonth(d.getTime())
    let firstDayOfMonthIndex = new Date(d.getFullYear(), d.getMonth()).getDay()
    if (firstDayOfMonthIndex === 0) firstDayOfMonthIndex = 7

    const currentValues: number[] = []
    const today = new Date().setHours(0, 0, 0, 0)
    const minDate = this.minDate ? new Date(this.minDate).getTime() : null
    const maxDate = this.maxDate ? new Date(this.maxDate).getTime() : null

    if (this.value && this.value.length) {
      for (let i = 0; i < this.value.length; i++) {
        currentValues.push(new Date(this.value[i]).setHours(0, 0, 0, 0))
      }
    }

    const items: CalendarDay[][] = []
    const rows = 6
    const cols = 7
    let dayIndex = 0 + (this.firstDay - 1)

    for (let i = 1; i <= rows; i++) {
      const rowHTML: CalendarDay[] = []
      for (let j = 1; j <= cols; j++) {
        dayIndex++
        let dayNumber = dayIndex - firstDayOfMonthIndex
        const type: CalendarDayType = {}
        let dayDateTime = 0

        if (dayNumber < 0) {
          dayNumber = daysInPrevMonth + dayNumber + 1
          type.prev = true
          dayDateTime = new Date(month - 1 < 0 ? year - 1 : year, month - 1 < 0 ? 11 : month - 1, dayNumber).getTime()
        } else {
          dayNumber = dayNumber + 1
          if (dayNumber > daysInMonthNow) {
            dayNumber = dayNumber - daysInMonthNow
            type.next = true
            dayDateTime = new Date(month + 1 > 11 ? year + 1 : year, month + 1 > 11 ? 0 : month + 1, dayNumber).getTime()
          } else {
            dayDateTime = new Date(year, month, dayNumber).getTime()
          }
        }

        if (dayDateTime === today) type.today = true
        if (currentValues.indexOf(dayDateTime) >= 0) type.selected = true
        if (this.weekendDays.indexOf(j - 1) >= 0) type.weekend = true
        if ((minDate && dayDateTime < minDate) || (maxDate && dayDateTime > maxDate)) type.disabled = true

        const dayDate = new Date(dayDateTime)
        const dayYear = dayDate.getFullYear()
        const dayMonth = dayDate.getMonth()

        rowHTML.push({
          type,
          year: dayYear,
          month: dayMonth,
          day: dayNumber,
          date: `${dayYear}-${dayMonth + 1}-${dayNumber}`,
        })
      }
      items.push(rowHTML)
    }

    return { year, month, time, items }
  }

  setMonthsHTML() {
    const layoutDate = this.value && this.value.length ? new Date(this.value[0]).setHours(0, 0, 0, 0) : new Date().setHours(0, 0, 0, 0)
    const prevMonthHTML = this.monthHTML(layoutDate, 'prev')
    const currentMonthHTML = this.monthHTML(layoutDate)
    const nextMonthHTML = this.monthHTML(layoutDate, 'next')
    return [prevMonthHTML, currentMonthHTML, nextMonthHTML]
  }

  formatDate(date: number | string) {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = d.getMonth()
    const month1 = month + 1
    const day = d.getDate()
    const weekDay = d.getDay()

    return this.dateFormat
      .replace(/yyyy/g, String(year))
      .replace(/yy/g, String(year).substring(2))
      .replace(/mm/g, month1 < 10 ? '0' + month1 : String(month1))
      .replace(/m/g, String(month1))
      .replace(/MM/g, this.monthNames[month])
      .replace(/M/g, this.monthNamesShort[month])
      .replace(/dd/g, day < 10 ? '0' + day : String(day))
      .replace(/d/g, String(day))
      .replace(/DD/g, this.dayNames[weekDay])
      .replace(/D/g, this.dayNamesShort[weekDay])
  }

  addValue(value: number) {
    if (this.multiple) {
      const arrValues = [...(this.value || [])]
      let inValuesIndex = -1
      for (let i = 0; i < arrValues.length; i++) {
        if (isSameDate(value, arrValues[i])) {
          inValuesIndex = i
        }
      }
      if (inValuesIndex === -1) {
        arrValues.push(value)
      } else {
        arrValues.splice(inValuesIndex, 1)
      }
      this.setValue(arrValues)
    } else {
      this.setValue([value])
    }
  }

  setValue(value: Array<number | string>) {
    this.value = value
    this.updateValue()
  }

  updateValue() {
    const selectedValues = (this.value || []).map((n) => new Date(n).setHours(0, 0, 0, 0))
    const nextMonths = this.months.map((m) => ({
      ...m,
      items: m.items.map((row) =>
        row.map((col) => {
          const dayDate = new Date(col.year, col.month, col.day).setHours(0, 0, 0, 0)
          const selected = selectedValues.includes(dayDate)
          return {
            ...col,
            type: {
              ...col.type,
              selected,
            },
          }
        }),
      ),
    }))
    this.months = nextMonths
    this.fns.onChange(
      selectedValues,
      (this.value || []).map((n) => this.formatDate(n)),
    )
  }
}

export { Calendar }

export default defineComponentHOC()(Calendar)
