import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import { useRect } from '@doraemon-ui/miniprogram.shared'
import type { NoticeBarMode } from './types'

const { classNames } = Doraemon.util

const notice = 'data:image/gif;base64,R0lGODlhAQABAAAAACw='
const close = 'data:image/gif;base64,R0lGODlhAQABAAAAACw='

@Component({
  expose: ['resetAnimation', 'stopAnimation'],
  props: {
    prefixCls: {
      type: String,
      default: 'dora-notice-bar',
    },
  },
})
class NoticeBar extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof NoticeBar
   */
  prefixCls!: string

  /**
   * 左侧图标
   *
   * @type {string}
   * @memberof NoticeBar
   */
  @Prop({
    type: String,
    default: notice,
  })
  icon: string

  /**
   * 通知内容
   *
   * @type {string}
   * @memberof NoticeBar
   */
  @Prop({
    type: String,
    default: '',
  })
  content: string

  /**
   * 模式
   *
   * @type {NoticeBarMode}
   * @memberof NoticeBar
   */
  @Prop({
    type: String,
    default: '',
  })
  mode: NoticeBarMode

  /**
   * 操作图标
   *
   * @type {string}
   * @memberof NoticeBar
   */
  @Prop({
    type: String,
    default: close,
  })
  action: string

  /**
   * 是否循环滚动
   *
   * @type {boolean}
   * @memberof NoticeBar
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  loop: boolean

  /**
   * 首次滚动延迟（ms）
   *
   * @type {number}
   * @memberof NoticeBar
   */
  @Prop({
    type: Number,
    default: 500,
  })
  leading: number

  /**
   * 每轮滚动后停顿（ms）
   *
   * @type {number}
   * @memberof NoticeBar
   */
  @Prop({
    type: Number,
    default: 800,
  })
  trailing: number

  /**
   * 滚动速度（ms）
   *
   * @type {number}
   * @memberof NoticeBar
   */
  @Prop({
    type: Number,
    default: 25,
  })
  speed: number

  animatedWidth: number = 0
  overflowWidth: number = 0
  visible: boolean = true
  marqueeTimer: ReturnType<typeof setTimeout> | null = null

  get classes() {
    const { prefixCls } = this
    return {
      wrap: classNames(prefixCls),
      hd: `${prefixCls}__hd`,
      icon: `${prefixCls}__icon`,
      bd: `${prefixCls}__bd`,
      container: `${prefixCls}__marquee-container`,
      marquee: `${prefixCls}__marquee`,
      ft: `${prefixCls}__ft`,
      action: `${prefixCls}__action`,
    }
  }

  @Watch('content')
  onContentChange() {
    this.resetAnimation()
  }

  clearMarqueeTimer() {
    if (this.marqueeTimer) {
      clearTimeout(this.marqueeTimer)
      this.marqueeTimer = null
    }
  }

  startAnimation() {
    this.clearMarqueeTimer()
    const { overflowWidth, loop, leading, trailing, speed } = this
    const isLeading = this.animatedWidth === 0
    const timeout = isLeading ? leading : speed
    const animate = () => {
      let animatedWidth = this.animatedWidth + 1
      const isRoundOver = animatedWidth > overflowWidth
      if (isRoundOver) {
        if (!loop) return
        animatedWidth = 0
      }
      if (isRoundOver && trailing) {
        setTimeout(() => {
          this.animatedWidth = animatedWidth
          this.marqueeTimer = setTimeout(animate, speed)
        }, trailing)
      } else {
        this.animatedWidth = animatedWidth
        this.marqueeTimer = setTimeout(animate, speed)
      }
    }
    if (overflowWidth !== 0) {
      this.marqueeTimer = setTimeout(animate, timeout)
    }
  }

  initAnimation(isForce = false) {
    const { prefixCls } = this
    Promise.all([
      useRect(`.${prefixCls}__marquee-container`, this._renderProxy),
      useRect(`.${prefixCls}__marquee`, this._renderProxy),
    ]).then((rects) => {
      if (rects.filter((n) => !n).length) return
      const container = rects[0]
      const text = rects[1]
      if (!container || !text) return
      const overflowWidth = text.width - container.width
      if (this.overflowWidth !== overflowWidth || isForce) {
        this.overflowWidth = overflowWidth
        this.animatedWidth = 0
        if (text.width > 0 && overflowWidth > 0) {
          this.startAnimation()
        } else {
          this.clearMarqueeTimer()
        }
      }
    })
  }

  resetAnimation() {
    this.initAnimation(true)
  }

  stopAnimation() {
    this.clearMarqueeTimer()
  }

  onAction() {
    if (this.mode === 'closable') {
      this.clearMarqueeTimer()
      this.visible = false
    }
    this.$emit('click')
  }

  onClick() {
    this.$emit('click')
  }

  mounted() {
    this.visible = true
    this.initAnimation()
  }

  destroyed() {
    this.clearMarqueeTimer()
  }
}

export { NoticeBar }

export default defineComponentHOC()(NoticeBar)
