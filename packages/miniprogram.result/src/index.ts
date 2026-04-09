import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { CustomEvent } from '@doraemon-ui/miniprogram.core-js'
import type { ResultButton, ResultIcon } from './types'
const { classNames } = Doraemon.util

const defaultIcon: ResultIcon = {
  type: 'success',
  size: 93,
  color: '#33cd5f',
}

const getIcon = (icon: unknown): ResultIcon | null => {
  if (icon !== null && typeof icon === 'object') {
    return Object.assign({}, defaultIcon, icon as Record<string, unknown>) as ResultIcon
  } else if (typeof icon === 'string') {
    if (icon === '') return null
    return Object.assign({}, defaultIcon, { type: icon })
  } else if (icon === false) {
    return null
  }
  return defaultIcon
}

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-result',
    },
  },
})
class Result extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Result
   */
  prefixCls!: string

  /**
   * 图标配置
   *
   * @type {unknown}
   * @memberof Result
   */
  @Prop({
    type: null,
    default: defaultIcon,
  })
  icon: unknown

  /**
   * 标题
   *
   * @type {string}
   * @memberof Result
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
   * @memberof Result
   */
  @Prop({
    type: String,
    default: '',
  })
  label: string

  /**
   * 底部按钮
   *
   * @type {ResultButton[]}
   * @memberof Result
   */
  @Prop({
    type: Array,
    default: [],
  })
  buttons: ResultButton[]

  /**
   * 额外信息
   *
   * @type {string}
   * @memberof Result
   */
  @Prop({
    type: String,
    default: '',
  })
  extra: string

  /**
   * 是否固定底部
   *
   * @type {boolean}
   * @memberof Result
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  fixed: boolean

  resultIcon: ResultIcon | null = null

  get classes() {
    const { prefixCls, fixed } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--fixed`]: fixed,
    })
    return {
      wrap,
      hd: `${prefixCls}__hd`,
      icon: `${prefixCls}__icon`,
      bd: `${prefixCls}__bd`,
      title: `${prefixCls}__title`,
      desc: `${prefixCls}__desc`,
      buttons: `${prefixCls}__buttons`,
      ft: `${prefixCls}__ft`,
    }
  }

  @Watch('icon')
  onIconChange(v: unknown) {
    this.resultIcon = getIcon(v)
  }

  onClick(e: CustomEvent<{ index: number }>) {
    this.$emit('click', e.currentTarget.dataset)
  }

  emitOpenTypeEvent(name: string, e: CustomEvent) {
    this.$emit(name, { ...e.detail, ...e.currentTarget.dataset })
  }
  bindgetuserinfo(e: CustomEvent) {
    this.emitOpenTypeEvent('getuserinfo', e)
  }
  bindcontact(e: CustomEvent) {
    this.emitOpenTypeEvent('contact', e)
  }
  bindgetphonenumber(e: CustomEvent) {
    this.emitOpenTypeEvent('getphonenumber', e)
  }
  bindopensetting(e: CustomEvent) {
    this.emitOpenTypeEvent('opensetting', e)
  }
  bindlaunchapp(e: CustomEvent) {
    this.emitOpenTypeEvent('launchapp', e)
  }
  bindchooseavatar(e: CustomEvent) {
    this.emitOpenTypeEvent('chooseavatar', e)
  }
  onError(e: CustomEvent) {
    this.emitOpenTypeEvent('error', e)
  }

  mounted() {
    this.resultIcon = getIcon(this.icon)
  }
}

export { Result }

export default defineComponentHOC()(Result)
