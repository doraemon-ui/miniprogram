/**
 * @doraemon-ui/miniprogram.notice-bar.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-04, 23:22:35.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js';
import { useRect } from '@doraemon-ui/miniprogram.shared';
const { classNames } = Doraemon.util;
const notice = 'data:image/gif;base64,R0lGODlhAQABAAAAACw=';
const close = 'data:image/gif;base64,R0lGODlhAQABAAAAACw=';
let NoticeBar = class NoticeBar extends Doraemon {
    prefixCls;
    icon;
    content;
    mode;
    action;
    loop;
    leading;
    trailing;
    speed;
    animatedWidth = 0;
    overflowWidth = 0;
    visible = true;
    marqueeTimer = null;
    get classes() {
        const { prefixCls } = this;
        return {
            wrap: classNames(prefixCls),
            hd: `${prefixCls}__hd`,
            icon: `${prefixCls}__icon`,
            bd: `${prefixCls}__bd`,
            container: `${prefixCls}__marquee-container`,
            marquee: `${prefixCls}__marquee`,
            ft: `${prefixCls}__ft`,
            action: `${prefixCls}__action`,
        };
    }
    onContentChange() {
        this.resetAnimation();
    }
    clearMarqueeTimer() {
        if (this.marqueeTimer) {
            clearTimeout(this.marqueeTimer);
            this.marqueeTimer = null;
        }
    }
    startAnimation() {
        this.clearMarqueeTimer();
        const { overflowWidth, loop, leading, trailing, speed } = this;
        const isLeading = this.animatedWidth === 0;
        const timeout = isLeading ? leading : speed;
        const animate = () => {
            let animatedWidth = this.animatedWidth + 1;
            const isRoundOver = animatedWidth > overflowWidth;
            if (isRoundOver) {
                if (!loop)
                    return;
                animatedWidth = 0;
            }
            if (isRoundOver && trailing) {
                setTimeout(() => {
                    this.animatedWidth = animatedWidth;
                    this.marqueeTimer = setTimeout(animate, speed);
                }, trailing);
            }
            else {
                this.animatedWidth = animatedWidth;
                this.marqueeTimer = setTimeout(animate, speed);
            }
        };
        if (overflowWidth !== 0) {
            this.marqueeTimer = setTimeout(animate, timeout);
        }
    }
    initAnimation(isForce = false) {
        const { prefixCls } = this;
        Promise.all([
            useRect(`.${prefixCls}__marquee-container`, this._renderProxy),
            useRect(`.${prefixCls}__marquee`, this._renderProxy),
        ]).then((rects) => {
            if (rects.filter((n) => !n).length)
                return;
            const container = rects[0];
            const text = rects[1];
            if (!container || !text)
                return;
            const overflowWidth = text.width - container.width;
            if (this.overflowWidth !== overflowWidth || isForce) {
                this.overflowWidth = overflowWidth;
                this.animatedWidth = 0;
                if (text.width > 0 && overflowWidth > 0) {
                    this.startAnimation();
                }
                else {
                    this.clearMarqueeTimer();
                }
            }
        });
    }
    resetAnimation() {
        this.initAnimation(true);
    }
    stopAnimation() {
        this.clearMarqueeTimer();
    }
    onAction() {
        if (this.mode === 'closable') {
            this.clearMarqueeTimer();
            this.visible = false;
        }
        this.$emit('click');
    }
    onClick() {
        this.$emit('click');
    }
    mounted() {
        this.visible = true;
        this.initAnimation();
    }
    destroyed() {
        this.clearMarqueeTimer();
    }
};
__decorate([
    Prop({
        type: String,
        default: notice,
    })
], NoticeBar.prototype, "icon", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], NoticeBar.prototype, "content", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], NoticeBar.prototype, "mode", void 0);
__decorate([
    Prop({
        type: String,
        default: close,
    })
], NoticeBar.prototype, "action", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], NoticeBar.prototype, "loop", void 0);
__decorate([
    Prop({
        type: Number,
        default: 500,
    })
], NoticeBar.prototype, "leading", void 0);
__decorate([
    Prop({
        type: Number,
        default: 800,
    })
], NoticeBar.prototype, "trailing", void 0);
__decorate([
    Prop({
        type: Number,
        default: 25,
    })
], NoticeBar.prototype, "speed", void 0);
__decorate([
    Watch('content')
], NoticeBar.prototype, "onContentChange", null);
NoticeBar = __decorate([
    Component({
        expose: ['resetAnimation', 'stopAnimation'],
        props: {
            prefixCls: {
                type: String,
                default: 'dora-notice-bar',
            },
        },
    })
], NoticeBar);
export default defineComponentHOC()(NoticeBar);
