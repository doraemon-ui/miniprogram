import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js'
const { classNames } = Doraemon.util

const defaultStatus = ['wait', 'process', 'finish', 'error']
const defaultIcon = 'ios-checkmark'

@Component({
  components: {
    Steps: () => ({
      module: './index',
      type: 'parent',
    }),
  },
  props: {
    prefixCls: {
      type: String,
      default: 'dora-step',
    },
  },
})
class Step extends Doraemon {
  prefixCls!: string

  @Prop({
    type: String,
    default: '',
  })
  status: string
  @Prop({
    type: String,
    default: '',
  })
  title: string
  @Prop({
    type: String,
    default: '',
  })
  content: string
  @Prop({
    type: String,
    default: '',
  })
  icon: string

  width: string = '100%'
  length: number = 1
  index: number = 0
  current: number = 0
  direction: 'horizontal' | 'vertical' = 'horizontal'
  hasIcon: boolean = false
  thumb: string = defaultIcon
  className: string = ''

  get classes() {
    const { prefixCls, direction } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--${direction}`]: direction,
    })
    return {
      wrap,
      hd: `${prefixCls}__hd`,
      icon: `${prefixCls}__icon`,
      thumb: `${prefixCls}__thumb`,
      bd: `${prefixCls}__bd`,
      title: `${prefixCls}__title`,
      content: `${prefixCls}__content`,
      ft: `${prefixCls}__ft`,
    }
  }

  updateCurrent(opts: { length?: number; index?: number; current?: number; direction?: 'horizontal' | 'vertical' } = {}) {
    const length = opts.length || this.length || 1
    const direction = opts.direction || this.direction
    const width = direction === 'horizontal' ? `${100 / length}%` : '100%'
    const index = typeof opts.index === 'number' ? opts.index : this.index
    const current = typeof opts.current === 'number' ? opts.current : this.current
    const stateIndex = defaultStatus.indexOf(this.status)
    const hasIcon = index < current || !!this.icon
    const thumb = this.icon || defaultIcon
    const suffix = stateIndex !== -1 ? defaultStatus[stateIndex] : index < current ? 'finish' : index === current ? 'process' : ''
    const className = suffix ? `${this.prefixCls}--${suffix}` : ''

    this.width = width
    this.length = length
    this.index = index
    this.current = current
    this.direction = direction
    this.hasIcon = hasIcon
    this.thumb = thumb
    this.className = className
  }

  mounted() {
    this.updateCurrent()
  }
}

export { Step }

export default defineComponentHOC()(Step)
