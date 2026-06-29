import { defineComponentHOC, Doraemon, Component, Watch, Prop } from '@doraemon-ui/miniprogram.core-js'
import type { AnimateStatus, AnimateType, ClassNames, Duration, NextAnimate } from './types'
import { useRect } from '@doraemon-ui/miniprogram.shared'
import type { MiniprogramDOMRect } from '@doraemon-ui/miniprogram.shared'
const { styleToCssString } = Doraemon.util

const AnimateStatusMap = {
  ENTER: 'enter',
  ENTERING: 'entering',
  ENTERED: 'entered',
  EXIT: 'exit',
  EXITING: 'exiting',
  EXITED: 'exited',
  UNMOUNTED: 'unmounted',
} as const

const AnimateTypeMap = {
  TRANSITION: 'transition',
  ANIMATION: 'animation',
} as const

/**
 * 默认动画类名
 */
const defaultClassNames: ClassNames = {
  enter: '',
  enterActive: '',
  enterDone: '',
  exit: '',
  exitActive: '',
  exitDone: '',
}

function delayHandler(timeout = 1000 / 60) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}

@Component({})
class AnimationGroup extends Doraemon {
  /**
   * 触发组件进入或离场动画的状态
   *
   * @type {boolean}
   * @memberof AnimationGroup
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  in: boolean

  /**
   * 过渡的类名
   *
   * @type {ClassNames}
   * @memberof AnimationGroup
   */
  @Prop({
    type: null,
    default: defaultClassNames,
  })
  classNames: ClassNames

  /**
   * 动画持续时间
   *
   * @type {Duration}
   * @memberof AnimationGroup
   */
  @Prop({
    type: null,
    default: null,
  })
  duration: Duration

  /**
   * 动画的类型
   *
   * @type {AnimateType}
   * @memberof AnimationGroup
   */
  @Prop({
    type: String,
    default: AnimateTypeMap.TRANSITION,
  })
  type: AnimateType

  /**
   * 首次挂载时是否触发进场动画
   *
   * @type {boolean}
   * @memberof AnimationGroup
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  appear: boolean

  /**
   * 是否启用进场动画
   *
   * @type {boolean}
   * @memberof AnimationGroup
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  enter: boolean

  /**
   * 是否启用离场动画
   *
   * @type {boolean}
   * @memberof AnimationGroup
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  exit: boolean

  /**
   * 首次进场动画时是否懒挂载组件
   *
   * @type {boolean}
   * @memberof AnimationGroup
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  mountOnEnter: boolean

  /**
   * 离场动画完成时是否卸载组件
   *
   * @type {boolean}
   * @memberof AnimationGroup
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  unmountOnExit: boolean

  /**
   * 自定义类名
   *
   * @type {string}
   * @memberof AnimationGroup
   */
  @Prop({
    type: String,
    default: 'dora-animation-group',
  })
  wrapCls: string

  /**
   * 自定义样式
   *
   * @type {Partial<CSSStyleDeclaration>}
   * @memberof AnimationGroup
   */
  @Prop({
    type: Object,
    default: null,
  })
  wrapStyle: Partial<CSSStyleDeclaration>

  /**
   * 阻止移动触摸
   *
   * @type {boolean}
   * @memberof AnimationGroup
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  disableScroll: boolean

  /**
   * 当前生效动画类
   *
   * @type {string}
   * @memberof AnimationGroup
   */
  animateCss: string = ''

  /**
   * 当前生效动画状态
   *
   * @type {AnimateStatus}
   * @memberof AnimationGroup
   */
  animateStatus: AnimateStatus = AnimateStatusMap.EXITED

  /**
   * 组件是否首次挂载
   *
   * @type {boolean}
   * @memberof AnimationGroup
   */
  isAppearing: boolean = false

  /**
   * 更新组件状态
   *
   * @param {AnimateStatus} nextStatus 下一状态，ENTERING 或 EXITING
   * @param {boolean} [mounting=false] 是否首次挂载
   * @memberof AnimationGroup
   */
  updateStatus(nextStatus: AnimateStatus, mounting: boolean = false) {
    if (nextStatus !== null) {
      this.isAppearing = mounting

      if (nextStatus === AnimateStatusMap.ENTERING) {
        this.performEnter()
      } else {
        this.performExit()
      }
    }
  }

  /**
   * 获取指定状态下的类名
   *
   * @param {'enter' | 'exit'} scene 动画场景，enter 或 exit
   * @returns
   * @memberof AnimationGroup
   */
  getClassNames(scene: 'enter' | 'exit'): {
    className: string
    activeClassName: string
    doneClassName: string
  } {
    const classNames = this.classNames
    const isString = typeof classNames !== 'string'
    const className = isString ? classNames[scene] : `${classNames}-${scene}`
    const activeClassName = isString ? classNames[`${scene}Active`] : `${classNames}-${scene}-active`
    const doneClassName = isString ? classNames[`${scene}Done`] : `${classNames}-${scene}-done`

    return {
      className,
      activeClassName,
      doneClassName,
    }
  }

  /**
   * 获取动画持续时间
   *
   * @returns {{ enter?: number, exit?: number }}
   * @memberof AnimationGroup
   */
  getTimeouts(): { enter?: number; exit?: number } {
    const { duration } = this
    if (duration !== null && typeof duration === 'object') {
      return {
        enter: duration.enter,
        exit: duration.exit,
      }
    } else if (typeof duration === 'number') {
      return {
        enter: duration,
        exit: duration,
      }
    }
    return {}
  }

  /**
   * 设置下一阶段动画
   *
   * @param {NextAnimate} nextAnimate 下一阶段动画
   * @param {Function} callback 回调函数
   * @memberof AnimationGroup
   */
  setNextAnimate(nextAnimate: NextAnimate, callback: Function) {
    if (nextAnimate.animateStatus) {
      this.animateStatus = nextAnimate.animateStatus
    }
    if (nextAnimate.animateCss) {
      this.animateCss = nextAnimate.animateCss
    }
    this.$nextTick(() => {
      callback.call(this)
    })
  }

  /**
   * 进场动画开始
   *
   * @returns
   * @memberof AnimationGroup
   */
  performEnter() {
    const { className, activeClassName } = this.getClassNames(AnimateStatusMap.ENTER)
    const { enter } = this.getTimeouts()
    const enterParams: NextAnimate = {
      animateStatus: AnimateStatusMap.ENTER,
      animateCss: className,
    }
    const enteringParams: NextAnimate = {
      animateStatus: AnimateStatusMap.ENTERING,
      animateCss: `${className} ${activeClassName}`,
    }

    // 若已禁用进场动画，则更新状态至 ENTERED
    if (!this.isAppearing && !this.enter) {
      return this.performEntered()
    }

    // 第一阶段：设置进场动画的开始状态，并触发 ENTER 事件
    // 第二阶段：延迟一帧后，设置进场动画的结束状态，并触发 ENTERING 事件
    // 第三阶段：若已设置过渡的持续时间，则延迟指定时间后触发进场动画完成 performEntered，否则等待触发 onTransitionEnd 或 onAnimationEnd
    this.setNextAnimate(enterParams, async () => {
      this.$emit('change', { animateStatus: AnimateStatusMap.ENTER })
      this.$emit(AnimateStatusMap.ENTER, { isAppearing: this.isAppearing })

      await delayHandler()
      this.setNextAnimate(enteringParams, () => {
        this.$emit('change', { animateStatus: AnimateStatusMap.ENTERING })
        this.$emit(AnimateStatusMap.ENTERING, { isAppearing: this.isAppearing })

        if (enter) {
          setTimeout(() => {
            this.performEntered()
          }, enter)
        }
      })
    })
  }

  /**
   * 进场动画完成
   *
   * @memberof AnimationGroup
   */
  performEntered() {
    const { doneClassName } = this.getClassNames(AnimateStatusMap.ENTER)
    const enteredParams: NextAnimate = {
      animateStatus: AnimateStatusMap.ENTERED,
      animateCss: doneClassName,
    }

    // 第三阶段：设置进场动画的完成状态，并触发 ENTERED 事件
    this.setNextAnimate(enteredParams, () => {
      this.$emit('change', { animateStatus: AnimateStatusMap.ENTERED })
      this.$emit(AnimateStatusMap.ENTERED, { isAppearing: this.isAppearing })
    })
  }

  /**
   * 离场动画开始
   *
   * @returns
   * @memberof AnimationGroup
   */
  performExit() {
    const { className, activeClassName } = this.getClassNames(AnimateStatusMap.EXIT)
    const { exit } = this.getTimeouts()
    const exitParams: NextAnimate = {
      animateStatus: AnimateStatusMap.EXIT,
      animateCss: className,
    }
    const exitingParams: NextAnimate = {
      animateStatus: AnimateStatusMap.EXITING,
      animateCss: `${className} ${activeClassName}`,
    }

    // 若已禁用离场动画，则更新状态至 EXITED
    if (!this.exit) {
      return this.performExited()
    }

    // 第一阶段：设置离场动画的开始状态，并触发 EXIT 事件
    // 第二阶段：延迟一帧后，设置离场动画的结束状态，并触发 EXITING 事件
    // 第三阶段：若已设置过渡的持续时间，则延迟指定时间后触发离场动画完成 performExited，否则等待触发 onTransitionEnd 或 onAnimationEnd
    this.setNextAnimate(exitParams, async () => {
      this.$emit('change', { animateStatus: AnimateStatusMap.EXIT })
      this.$emit(AnimateStatusMap.EXIT)

      await delayHandler()
      this.setNextAnimate(exitingParams, () => {
        this.$emit('change', { animateStatus: AnimateStatusMap.EXITING })
        this.$emit(AnimateStatusMap.EXITING)

        if (exit) {
          setTimeout(() => {
            this.performExited()
          }, exit)
        }
      })
    })
  }

  /**
   * 离场动画完成
   *
   * @memberof AnimationGroup
   */
  performExited() {
    const { doneClassName } = this.getClassNames(AnimateStatusMap.EXIT)
    const exitedParams: NextAnimate = {
      animateStatus: AnimateStatusMap.EXITED,
      animateCss: doneClassName,
    }

    // 第三阶段：设置离场动画的完成状态，并触发 EXITED 事件
    this.setNextAnimate(exitedParams, () => {
      this.$emit('change', { animateStatus: AnimateStatusMap.EXITED })
      this.$emit(AnimateStatusMap.EXITED)

      // 判断离场动画完成时是否卸载组件
      if (this.unmountOnExit) {
        this.setNextAnimate({ animateStatus: AnimateStatusMap.UNMOUNTED }, () => {
          this.$emit('change', { animateStatus: AnimateStatusMap.UNMOUNTED })
        })
      }
    })
  }

  /**
   * 点击事件
   *
   * @memberof AnimationGroup
   */
  onClick() {
    this.$emit('click')
  }

  /**
   * 阻止移动触摸
   *
   * @memberof AnimationGroup
   */
  onTouchMove() {
    /**
     * Ignore
     */
  }

  /**
   * 监听过渡或动画的回调函数
   *
   * @memberof AnimationGroup
   */
  addEventListener() {
    const { animateStatus } = this
    const { enter, exit } = this.getTimeouts()

    if (animateStatus === AnimateStatusMap.ENTERING && !enter && this.enter) {
      this.performEntered()
    }

    if (animateStatus === AnimateStatusMap.EXITING && !exit && this.exit) {
      this.performExited()
    }
  }

  /**
   * 会在 WXSS transition 或 wx.createAnimation 动画结束后触发
   *
   * @memberof AnimationGroup
   */
  onTransitionEnd() {
    if (this.type === AnimateTypeMap.TRANSITION) {
      this.addEventListener()
    }
  }

  /**
   * 会在一个 WXSS animation 动画完成时触发
   *
   * @memberof AnimationGroup
   */
  onAnimationEnd() {
    if (this.type === AnimateTypeMap.ANIMATION) {
      this.addEventListener()
    }
  }

  /**
   * 属性值 in 被更改时的响应函数
   *
   * @param {boolean} newVal 触发组件进入或离场动画的状态
   * @memberof AnimationGroup
   */
  @Watch('in')
  updated(newVal: boolean) {
    let { animateStatus } = this
    let nextStatus = null

    if (newVal) {
      if (animateStatus === AnimateStatusMap.UNMOUNTED) {
        animateStatus = AnimateStatusMap.EXITED
        this.setNextAnimate({ animateStatus: AnimateStatusMap.EXITED }, () => {
          this.$emit('change', { animateStatus: AnimateStatusMap.EXITED })
        })
      }
      if (animateStatus !== AnimateStatusMap.ENTER && animateStatus !== AnimateStatusMap.ENTERING && animateStatus !== AnimateStatusMap.ENTERED) {
        nextStatus = AnimateStatusMap.ENTERING
      }
    } else {
      if (animateStatus === AnimateStatusMap.ENTER || animateStatus === AnimateStatusMap.ENTERING || animateStatus === AnimateStatusMap.ENTERED) {
        nextStatus = AnimateStatusMap.EXITING
      }
    }

    this.updateStatus(nextStatus)
  }

  /**
   * 组件样式
   *
   * @readonly
   * @memberof AnimationGroup
   */
  get containerStyle() {
    return this.wrapStyle ? styleToCssString(this.wrapStyle) : ''
  }

  /**
   * 组件是否显示
   *
   * @readonly
   * @memberof AnimationGroup
   */
  get show() {
    return this._isMounted ? this.animateStatus !== AnimateStatusMap.UNMOUNTED : false
  }

  /**
   * 组件挂载完成生命周期
   *
   * @memberof AnimationGroup
   */
  mounted() {
    const props = this
    let animateStatus: AnimateStatus = null
    let appearStatus: AnimateStatus = null
    if (props.in) {
      if (props.appear) {
        animateStatus = AnimateStatusMap.EXITED
        appearStatus = AnimateStatusMap.ENTERING
      } else {
        animateStatus = AnimateStatusMap.ENTERED
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        animateStatus = AnimateStatusMap.UNMOUNTED
      } else {
        animateStatus = AnimateStatusMap.EXITED
      }
    }
    this.animateStatus = animateStatus
    this.$nextTick(() => {
      this.$emit('change', { animateStatus })
      this.updateStatus(appearStatus, true)
    })
  }

  getBoundingClientRect(): Promise<MiniprogramDOMRect> {
    return useRect(`.${this.wrapCls}`, this._renderProxy)
  }
}

export { AnimationGroup }

export default defineComponentHOC()(AnimationGroup)
