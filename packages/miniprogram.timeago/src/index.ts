import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import { parse, diff, format } from './core'
import locales from './locales'
import type { TimeagoLang } from './types'

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-timeago',
    },
  },
})
class Timeago extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Timeago
   */
  prefixCls!: string

  /**
   * 目标时间
   *
   * @type {any}
   * @memberof Timeago
   */
  @Prop({
    type: null,
    default: null,
  })
  to: any

  /**
   * 基准时间
   *
   * @type {any}
   * @memberof Timeago
   */
  @Prop({
    type: null,
    default: null,
  })
  from: any

  /**
   * 是否自动刷新
   *
   * @type {boolean}
   * @memberof Timeago
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  refreshable: boolean

  /**
   * 语言
   *
   * @type {TimeagoLang}
   * @memberof Timeago
   */
  @Prop({
    type: String,
    default: 'zh_CN',
  })
  lang: TimeagoLang

  currentTo: any = null
  currentFrom: any = null
  timeago: string = ''
  private timeout: ReturnType<typeof setTimeout> | null = null

  @Watch('to')
  onToChange(v: any) {
    this.updated(v, this.from, this.lang)
  }

  @Watch('from')
  onFromChange(v: any) {
    this.updated(this.to, v, this.lang)
  }

  @Watch('refreshable')
  onRefreshableChange(_v: boolean) {
    this.updated(this.to, this.from, this.lang, true)
  }

  @Watch('lang')
  onLangChange(v: TimeagoLang) {
    this.updated(this.to, this.from, v, true)
  }

  updated(currentTo: any, currentFrom: any, lang: TimeagoLang, isForce = false) {
    this.clearTimer()
    if (!currentTo) return
    if (currentTo !== this.currentTo || currentFrom !== this.currentFrom || isForce) {
      const diffTime = diff(currentTo, currentFrom)
      const langPack = (locales as any)[lang] || locales.zh_CN
      this.currentTo = currentTo
      this.currentFrom = currentFrom
      this.timeago = format(diffTime, langPack)
      if (this.refreshable && !this.from) {
        const howOld = diff(currentTo, currentFrom, 'minute')
        const secondsUntilUpdate = (howOld < 1 && 1) || (howOld < 60 && 30) || (howOld < 180 && 300) || 3600
        this.timeout = setTimeout(() => {
          this.updated(currentTo, this.getNow(), lang)
        }, secondsUntilUpdate * 1000)
      }
    }
  }

  clearTimer() {
    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = null
    }
  }

  getNow() {
    return this.from ? parse(this.from) : new Date()
  }

  detached() {
    this.clearTimer()
  }
}

export { Timeago }

export default defineComponentHOC()(Timeago)
