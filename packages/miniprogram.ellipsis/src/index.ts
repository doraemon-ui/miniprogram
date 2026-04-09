import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { EllipsisDirection, EllipsisTextRange } from './types'
const { classNames, styleToCssString } = Doraemon.util

function getSubString(chars: string[], start: number, end: number) {
  return chars.slice(start, end).join('')
}

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-ellipsis',
    },
    content: {
      type: String,
      default: '',
    },
    direction: {
      type: String,
      default: 'end',
    },
    defaultExpanded: {
      type: Boolean,
      default: false,
    },
    expandText: {
      type: String,
      default: '',
    },
    collapseText: {
      type: String,
      default: '',
    },
    rows: {
      type: Number,
      default: 1,
    },
  },
})
class Ellipsis extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Ellipsis
   */
  prefixCls!: string

  /**
   * 原始文本内容
   *
   * @type {string}
   * @memberof Ellipsis
   */
  @Prop({
    type: String,
    default: '',
  })
  content: string

  /**
   * 省略方向：start | middle | end
   *
   * @type {EllipsisDirection}
   * @memberof Ellipsis
   */
  @Prop({
    type: String,
    default: 'end',
  })
  direction: EllipsisDirection

  /**
   * 默认是否展开
   *
   * @type {boolean}
   * @memberof Ellipsis
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  defaultExpanded: boolean

  /**
   * 展开按钮文本
   *
   * @type {string}
   * @memberof Ellipsis
   */
  @Prop({
    type: String,
    default: '',
  })
  expandText: string

  /**
   * 收起按钮文本
   *
   * @type {string}
   * @memberof Ellipsis
   */
  @Prop({
    type: String,
    default: '',
  })
  collapseText: string

  /**
   * 最大显示行数
   *
   * @type {number}
   * @memberof Ellipsis
   */
  @Prop({
    type: Number,
    default: 1,
  })
  rows: number

  ellipsised: EllipsisTextRange = {
    leading: '',
    tailing: '',
  }

  expanded: boolean = false
  exceeded: boolean = false
  innerText: string = ''
  end: number = -1
  containerStyle: string = ''

  get classes() {
    const { prefixCls } = this
    return {
      wrap: classNames(prefixCls),
      container: classNames(prefixCls, `${prefixCls}--container`),
      expanded: `${prefixCls}__expanded`,
      collapsed: `${prefixCls}__collapsed`,
    }
  }

  @Watch('prefixCls')
  @Watch('content')
  @Watch('direction')
  @Watch('rows')
  @Watch('expandText')
  @Watch('collapseText')
  onPropsChange() {
    this.calcEllipsised()
  }

  /**
   * 点击组件
   */
  onTap() {
    this.$emit('click')
  }

  /**
   * 展开/收起
   */
  setExpanded(e: WechatMiniprogram.BaseEvent<{ expanded?: string | number }>) {
    const expanded = String(e?.target?.dataset?.expanded || '0')
    this.expanded = expanded === '1'
    this.calcEllipsised()
  }

  /**
   * 计算省略文案
   * 注：按字符数近似计算，避免运行时测量抖动
   */
  calcEllipsised() {
    const chars = Array.from(this.content || '')
    const end = chars.length
    const maxChars = Math.max(1, Number(this.rows || 1) * 26)
    this.innerText = this.content
    this.end = end
    this.containerStyle = styleToCssString({ width: '100%', wordBreak: 'break-word' })

    if (this.expanded || end <= maxChars) {
      this.exceeded = false
      this.ellipsised = { leading: this.content, tailing: '' }
      return
    }

    this.exceeded = true
    if (this.direction === 'start') {
      this.ellipsised = {
        leading: '',
        tailing: '...' + getSubString(chars, Math.max(0, end - maxChars), end),
      }
      return
    }
    if (this.direction === 'middle') {
      const left = Math.floor(maxChars / 2)
      const right = end - Math.ceil(maxChars / 2)
      this.ellipsised = {
        leading: getSubString(chars, 0, left) + '...',
        tailing: '...' + getSubString(chars, Math.max(left, right), end),
      }
      return
    }
    this.ellipsised = {
      leading: getSubString(chars, 0, maxChars) + '...',
      tailing: '',
    }
  }

  mounted() {
    this.expanded = this.defaultExpanded
    this.calcEllipsised()
  }
}

export { Ellipsis }

export default defineComponentHOC()(Ellipsis)
