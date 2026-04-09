/**
 * @doraemon-ui/miniprogram.badge.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-02-25, 23:30:49.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js';
const { classNames, styleToCssString } = Doraemon.util;
let Badge = class Badge extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Badge
     */
    prefixCls;
    count;
    overflowCount;
    dot;
    showZero;
    status;
    text;
    position;
    backgroundColor;
    hideShadow;
    title;
    finalCount = 0;
    badgeStyle = '';
    get classes() {
        const { prefixCls, position, hideShadow, status } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--position-${position}`]: position,
            [`${prefixCls}--hide-shadow`]: hideShadow,
        });
        const statusWrap = `${prefixCls}__status`;
        const statusDot = classNames(`${prefixCls}__status-dot`, {
            [`${prefixCls}__status-dot--${status}`]: status,
        });
        const statusText = `${prefixCls}__status-text`;
        const dot = `${prefixCls}__dot`;
        const count = `${prefixCls}__count`;
        return {
            wrap,
            status: statusWrap,
            statusDot,
            statusText,
            dot,
            count,
        };
    }
    updated(props = { count: this.count, overflowCount: this.overflowCount }) {
        const { count, overflowCount } = props;
        this.finalCount = count >= overflowCount ? `${overflowCount}+` : count;
    }
    updateStyle(backgroundColor) {
        const nextStyle = styleToCssString({
            backgroundColor,
        });
        if (nextStyle !== this.badgeStyle) {
            this.badgeStyle = nextStyle;
        }
    }
    onCountChange() {
        this.updated();
    }
    onBackgroundColorChange(newVal) {
        this.updateStyle(newVal);
    }
    mounted() {
        this.updated();
        this.updateStyle(this.backgroundColor);
    }
};
__decorate([
    Prop({
        type: Number,
        default: 0,
    })
], Badge.prototype, "count", void 0);
__decorate([
    Prop({
        type: Number,
        default: 99,
    })
], Badge.prototype, "overflowCount", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], Badge.prototype, "dot", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], Badge.prototype, "showZero", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], Badge.prototype, "status", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], Badge.prototype, "text", void 0);
__decorate([
    Prop({
        type: String,
        default: 'topRight',
    })
], Badge.prototype, "position", void 0);
__decorate([
    Prop({
        type: String,
        default: '#ed3f14',
    })
], Badge.prototype, "backgroundColor", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], Badge.prototype, "hideShadow", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], Badge.prototype, "title", void 0);
__decorate([
    Watch('count'),
    Watch('overflowCount')
], Badge.prototype, "onCountChange", null);
__decorate([
    Watch('backgroundColor')
], Badge.prototype, "onBackgroundColorChange", null);
Badge = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-badge',
            },
            count: {
                type: Number,
                default: 0,
            },
            overflowCount: {
                type: Number,
                default: 99,
            },
            dot: {
                type: Boolean,
                default: false,
            },
            showZero: {
                type: Boolean,
                default: false,
            },
            status: {
                type: String,
                default: '',
            },
            text: {
                type: String,
                default: '',
            },
            position: {
                type: String,
                default: 'topRight',
            },
            backgroundColor: {
                type: String,
                default: '#ed3f14',
            },
            hideShadow: {
                type: Boolean,
                default: false,
            },
            title: {
                type: String,
                default: '',
            },
        },
    })
], Badge);
export default defineComponentHOC({ externalClasses: ['dora-class-badge'] })(Badge);
