/**
 * @doraemon-ui/miniprogram.animation-group.
 * © 2021 - 2024 Doraemon UI.
 * Built on 2024-03-22, 00:58:07.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.20.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Watch, Prop } from '@doraemon-ui/miniprogram.core-js';
const { styleToCssString } = Doraemon.util;
/**
 * 动画状态的类型
 *
 * @enum {number}
 */
var AnimateStatus;
(function (AnimateStatus) {
    /** 进场动画的开始状态 */
    AnimateStatus["ENTER"] = "enter";
    /** 进场动画的结束状态 */
    AnimateStatus["ENTERING"] = "entering";
    /** 进场动画的完成状态 */
    AnimateStatus["ENTERED"] = "entered";
    /** 离场动画的开始状态 */
    AnimateStatus["EXIT"] = "exit";
    /** 离场动画的结束状态 */
    AnimateStatus["EXITING"] = "exiting";
    /** 离场动画的完成状态 */
    AnimateStatus["EXITED"] = "exited";
    /** 组件已卸载 */
    AnimateStatus["UNMOUNTED"] = "unmounted";
})(AnimateStatus || (AnimateStatus = {}));
/**
 * 动画的类型
 *
 * @enum {number}
 */
var AnimateType;
(function (AnimateType) {
    /** 过渡效果 */
    AnimateType["TRANSITION"] = "transition";
    /** 动画效果 */
    AnimateType["ANIMATION"] = "animation";
})(AnimateType || (AnimateType = {}));
/**
 * 默认动画类名
 */
const defaultClassNames = {
    enter: '',
    enterActive: '',
    enterDone: '',
    exit: '',
    exitActive: '',
    exitDone: '',
};
function delayHandler(timeout = 1000 / 60) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}
let AnimationGroup = class AnimationGroup extends Doraemon {
    /**
     * 触发组件进入或离场动画的状态
     *
     * @type {boolean}
     * @memberof AnimationGroup
     */
    in;
    /**
     * 过渡的类名
     *
     * @type {ClassNames}
     * @memberof AnimationGroup
     */
    classNames;
    /**
     * 动画持续时间
     *
     * @type {Duration}
     * @memberof AnimationGroup
     */
    duration;
    /**
     * 动画的类型
     *
     * @type {AnimateType}
     * @memberof AnimationGroup
     */
    type;
    /**
     * 首次挂载时是否触发进场动画
     *
     * @type {boolean}
     * @memberof AnimationGroup
     */
    appear;
    /**
     * 是否启用进场动画
     *
     * @type {boolean}
     * @memberof AnimationGroup
     */
    enter;
    /**
     * 是否启用离场动画
     *
     * @type {boolean}
     * @memberof AnimationGroup
     */
    exit;
    /**
     * 首次进场动画时是否懒挂载组件
     *
     * @type {boolean}
     * @memberof AnimationGroup
     */
    mountOnEnter;
    /**
     * 离场动画完成时是否卸载组件
     *
     * @type {boolean}
     * @memberof AnimationGroup
     */
    unmountOnExit;
    /**
     * 自定义类名
     *
     * @type {string}
     * @memberof AnimationGroup
     */
    wrapCls;
    /**
     * 自定义样式
     *
     * @type {object}
     * @memberof AnimationGroup
     */
    wrapStyle;
    /**
     * 阻止移动触摸
     *
     * @type {boolean}
     * @memberof AnimationGroup
     */
    disableScroll;
    /**
     * 当前生效动画类
     *
     * @type {string}
     * @memberof AnimationGroup
     */
    animateCss = '';
    /**
     * 当前生效动画状态
     *
     * @type {AnimateStatus}
     * @memberof AnimationGroup
     */
    animateStatus = AnimateStatus.EXITED;
    /**
     * 组件是否首次挂载
     *
     * @type {boolean}
     * @memberof AnimationGroup
     */
    isAppearing = false;
    /**
     * 更新组件状态
     *
     * @param {AnimateStatus} nextStatus 下一状态，ENTERING 或 EXITING
     * @param {boolean} [mounting=false] 是否首次挂载
     * @memberof AnimationGroup
     */
    updateStatus(nextStatus, mounting = false) {
        if (nextStatus !== null) {
            this.isAppearing = mounting;
            if (nextStatus === AnimateStatus.ENTERING) {
                this.performEnter();
            }
            else {
                this.performExit();
            }
        }
    }
    /**
     * 获取指定状态下的类名
     *
     * @param {(AnimateStatus.ENTER | AnimateStatus.EXIT)} scene 动画场景，enter 或 exit
     * @returns
     * @memberof AnimationGroup
     */
    getClassNames(scene) {
        const classNames = this.classNames;
        const isString = typeof classNames !== 'string';
        const className = isString ? classNames[scene] : `${classNames}-${scene}`;
        const activeClassName = isString ? classNames[`${scene}Active`] : `${classNames}-${scene}-active`;
        const doneClassName = isString ? classNames[`${scene}Done`] : `${classNames}-${scene}-done`;
        return {
            className,
            activeClassName,
            doneClassName,
        };
    }
    /**
     * 获取动画持续时间
     *
     * @returns {{ enter?: number, exit?: number }}
     * @memberof AnimationGroup
     */
    getTimeouts() {
        const { duration } = this;
        if (duration !== null && typeof duration === 'object') {
            return {
                enter: duration.enter,
                exit: duration.exit,
            };
        }
        else if (typeof duration === 'number') {
            return {
                enter: duration,
                exit: duration,
            };
        }
        return {};
    }
    /**
     * 设置下一阶段动画
     *
     * @param {NextAnimate} nextAnimate 下一阶段动画
     * @param {Function} callback 回调函数
     * @memberof AnimationGroup
     */
    setNextAnimate(nextAnimate, callback) {
        if (nextAnimate.animateStatus) {
            this.animateStatus = nextAnimate.animateStatus;
        }
        if (nextAnimate.animateCss) {
            this.animateCss = nextAnimate.animateCss;
        }
        this.$nextTick(() => {
            callback.call(this);
        });
    }
    /**
     * 进场动画开始
     *
     * @returns
     * @memberof AnimationGroup
     */
    performEnter() {
        const { className, activeClassName } = this.getClassNames(AnimateStatus.ENTER);
        const { enter } = this.getTimeouts();
        const enterParams = {
            animateStatus: AnimateStatus.ENTER,
            animateCss: className,
        };
        const enteringParams = {
            animateStatus: AnimateStatus.ENTERING,
            animateCss: `${className} ${activeClassName}`,
        };
        // 若已禁用进场动画，则更新状态至 ENTERED
        if (!this.isAppearing && !this.enter) {
            return this.performEntered();
        }
        // 第一阶段：设置进场动画的开始状态，并触发 ENTER 事件
        // 第二阶段：延迟一帧后，设置进场动画的结束状态，并触发 ENTERING 事件
        // 第三阶段：若已设置过渡的持续时间，则延迟指定时间后触发进场动画完成 performEntered，否则等待触发 onTransitionEnd 或 onAnimationEnd
        this.setNextAnimate(enterParams, async () => {
            this.$emit('change', { animateStatus: AnimateStatus.ENTER });
            this.$emit(AnimateStatus.ENTER, { isAppearing: this.isAppearing });
            await delayHandler();
            this.setNextAnimate(enteringParams, () => {
                this.$emit('change', { animateStatus: AnimateStatus.ENTERING });
                this.$emit(AnimateStatus.ENTERING, { isAppearing: this.isAppearing });
                if (enter) {
                    setTimeout(() => {
                        this.performEntered();
                    }, enter);
                }
            });
        });
    }
    /**
     * 进场动画完成
     *
     * @memberof AnimationGroup
     */
    performEntered() {
        const { doneClassName } = this.getClassNames(AnimateStatus.ENTER);
        const enteredParams = {
            animateStatus: AnimateStatus.ENTERED,
            animateCss: doneClassName,
        };
        // 第三阶段：设置进场动画的完成状态，并触发 ENTERED 事件
        this.setNextAnimate(enteredParams, () => {
            this.$emit('change', { animateStatus: AnimateStatus.ENTERED });
            this.$emit(AnimateStatus.ENTERED, { isAppearing: this.isAppearing });
        });
    }
    /**
     * 离场动画开始
     *
     * @returns
     * @memberof AnimationGroup
     */
    performExit() {
        const { className, activeClassName } = this.getClassNames(AnimateStatus.EXIT);
        const { exit } = this.getTimeouts();
        const exitParams = {
            animateStatus: AnimateStatus.EXIT,
            animateCss: className,
        };
        const exitingParams = {
            animateStatus: AnimateStatus.EXITING,
            animateCss: `${className} ${activeClassName}`,
        };
        // 若已禁用离场动画，则更新状态至 EXITED
        if (!this.exit) {
            return this.performExited();
        }
        // 第一阶段：设置离场动画的开始状态，并触发 EXIT 事件
        // 第二阶段：延迟一帧后，设置离场动画的结束状态，并触发 EXITING 事件
        // 第三阶段：若已设置过渡的持续时间，则延迟指定时间后触发离场动画完成 performExited，否则等待触发 onTransitionEnd 或 onAnimationEnd
        this.setNextAnimate(exitParams, async () => {
            this.$emit('change', { animateStatus: AnimateStatus.EXIT });
            this.$emit(AnimateStatus.EXIT);
            await delayHandler();
            this.setNextAnimate(exitingParams, () => {
                this.$emit('change', { animateStatus: AnimateStatus.EXITING });
                this.$emit(AnimateStatus.EXITING);
                if (exit) {
                    setTimeout(() => {
                        this.performExited();
                    }, exit);
                }
            });
        });
    }
    /**
     * 离场动画完成
     *
     * @memberof AnimationGroup
     */
    performExited() {
        const { doneClassName } = this.getClassNames(AnimateStatus.EXIT);
        const exitedParams = {
            animateStatus: AnimateStatus.EXITED,
            animateCss: doneClassName,
        };
        // 第三阶段：设置离场动画的完成状态，并触发 EXITED 事件
        this.setNextAnimate(exitedParams, () => {
            this.$emit('change', { animateStatus: AnimateStatus.EXITED });
            this.$emit(AnimateStatus.EXITED);
            // 判断离场动画完成时是否卸载组件
            if (this.unmountOnExit) {
                this.setNextAnimate({ animateStatus: AnimateStatus.UNMOUNTED }, () => {
                    this.$emit('change', { animateStatus: AnimateStatus.UNMOUNTED });
                });
            }
        });
    }
    /**
     * 点击事件
     *
     * @memberof AnimationGroup
     */
    onClick() {
        this.$emit('click');
    }
    /**
     * 阻止移动触摸
     *
     * @memberof AnimationGroup
     */
    onTouchMove() {
        /** Ignore */
    }
    /**
     * 监听过渡或动画的回调函数
     *
     * @memberof AnimationGroup
     */
    addEventListener() {
        const { animateStatus } = this;
        const { enter, exit } = this.getTimeouts();
        if (animateStatus === AnimateStatus.ENTERING && !enter && this.enter) {
            this.performEntered();
        }
        if (animateStatus === AnimateStatus.EXITING && !exit && this.exit) {
            this.performExited();
        }
    }
    /**
     * 会在 WXSS transition 或 wx.createAnimation 动画结束后触发
     *
     * @memberof AnimationGroup
     */
    onTransitionEnd() {
        if (this.type === AnimateType.TRANSITION) {
            this.addEventListener();
        }
    }
    /**
     * 会在一个 WXSS animation 动画完成时触发
     *
     * @memberof AnimationGroup
     */
    onAnimationEnd() {
        if (this.type === AnimateType.ANIMATION) {
            this.addEventListener();
        }
    }
    /**
     * 属性值 in 被更改时的响应函数
     *
     * @param {boolean} newVal 触发组件进入或离场动画的状态
     * @memberof AnimationGroup
     */
    updated(newVal) {
        let { animateStatus } = this;
        let nextStatus = null;
        if (newVal) {
            if (animateStatus === AnimateStatus.UNMOUNTED) {
                animateStatus = AnimateStatus.EXITED;
                this.setNextAnimate({ animateStatus: AnimateStatus.EXITED }, () => {
                    this.$emit('change', { animateStatus: AnimateStatus.EXITED });
                });
            }
            if (animateStatus !== AnimateStatus.ENTER &&
                animateStatus !== AnimateStatus.ENTERING &&
                animateStatus !== AnimateStatus.ENTERED) {
                nextStatus = AnimateStatus.ENTERING;
            }
        }
        else {
            if (animateStatus === AnimateStatus.ENTER ||
                animateStatus === AnimateStatus.ENTERING ||
                animateStatus === AnimateStatus.ENTERED) {
                nextStatus = AnimateStatus.EXITING;
            }
        }
        this.updateStatus(nextStatus);
    }
    /**
     * 组件样式
     *
     * @readonly
     * @memberof AnimationGroup
     */
    get extStyle() {
        return this.wrapStyle ? styleToCssString(this.wrapStyle) : '';
    }
    /**
     * 组件是否显示
     *
     * @readonly
     * @memberof AnimationGroup
     */
    get show() {
        return this._isMounted ? this.animateStatus !== AnimateStatus.UNMOUNTED : false;
    }
    /**
     * 组件挂载完成生命周期
     *
     * @memberof AnimationGroup
     */
    mounted() {
        const props = this;
        let animateStatus = null;
        let appearStatus = null;
        if (props.in) {
            if (props.appear) {
                animateStatus = AnimateStatus.EXITED;
                appearStatus = AnimateStatus.ENTERING;
            }
            else {
                animateStatus = AnimateStatus.ENTERED;
            }
        }
        else {
            if (props.unmountOnExit || props.mountOnEnter) {
                animateStatus = AnimateStatus.UNMOUNTED;
            }
            else {
                animateStatus = AnimateStatus.EXITED;
            }
        }
        this.animateStatus = animateStatus;
        this.$nextTick(() => {
            this.$emit('change', { animateStatus });
            this.updateStatus(appearStatus, true);
        });
    }
};
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], AnimationGroup.prototype, "in", void 0);
__decorate([
    Prop({
        type: null,
        default: defaultClassNames,
    })
], AnimationGroup.prototype, "classNames", void 0);
__decorate([
    Prop({
        type: null,
        default: null,
    })
], AnimationGroup.prototype, "duration", void 0);
__decorate([
    Prop({
        type: String,
        default: AnimateType.TRANSITION,
    })
], AnimationGroup.prototype, "type", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], AnimationGroup.prototype, "appear", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: true,
    })
], AnimationGroup.prototype, "enter", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: true,
    })
], AnimationGroup.prototype, "exit", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: true,
    })
], AnimationGroup.prototype, "mountOnEnter", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: true,
    })
], AnimationGroup.prototype, "unmountOnExit", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], AnimationGroup.prototype, "wrapCls", void 0);
__decorate([
    Prop({
        type: Object,
        default: null,
    })
], AnimationGroup.prototype, "wrapStyle", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], AnimationGroup.prototype, "disableScroll", void 0);
__decorate([
    Watch('in')
], AnimationGroup.prototype, "updated", null);
AnimationGroup = __decorate([
    Component({})
], AnimationGroup);
export default defineComponentHOC()(AnimationGroup);
