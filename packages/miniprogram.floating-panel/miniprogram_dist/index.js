/**
 * @doraemon-ui/miniprogram.floating-panel.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-02-26, 19:07:49.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js';
import { getTouchPoints, getPointsNumber, getSystemInfoSync } from '@doraemon-ui/miniprogram.shared';
const { classNames, styleToCssString } = Doraemon.util;
function nearest(values, offsetY) {
    if (!values.length)
        return offsetY;
    let minDistance = Math.abs(values[0] - offsetY);
    let selected = values[0];
    for (let i = 1; i < values.length; i += 1) {
        const d = Math.abs(values[i] - offsetY);
        if (d < minDistance) {
            minDistance = d;
            selected = values[i];
        }
    }
    return selected;
}
function rubberbandIfOutOfBounds(position, min, max) {
    if (position < min) {
        return min - (min - position) * 0.55;
    }
    if (position > max) {
        return max + (position - max) * 0.55;
    }
    return position;
}
let FloatingPanel = class FloatingPanel extends Doraemon {
    /**
     * 自定义类名前缀
     */
    prefixCls;
    /**
     * 默认锚点高度列表（px）
     */
    defaultAnchors;
    wrapStyle = '';
    possibles = [];
    moving = false;
    bounds = {
        top: -1,
        bottom: -1,
    };
    moveY = 0;
    endY = 0;
    startY = 0;
    lastY = 0;
    movingTimer = null;
    get classes() {
        const { prefixCls } = this;
        return {
            wrap: classNames(prefixCls),
            hd: `${prefixCls}__hd`,
            bd: `${prefixCls}__bd`,
            bar: `${prefixCls}__bar`,
            mask: `${prefixCls}__mask`,
        };
    }
    onAnchorsChange() {
        this.initializeAnchors();
    }
    /**
     * 手指触摸动作开始
     */
    onTouchStart(e) {
        if (this.moving || getPointsNumber(e) > 1)
            return;
        this.startY = getTouchPoints(e).y;
        this.moveY = 0;
        this.endY = 0;
        this.moving = true;
    }
    /**
     * 手指触摸后移动
     */
    onTouchMove(e) {
        if (!this.moving || getPointsNumber(e) > 1)
            return;
        this.moveY = getTouchPoints(e).y;
        const deltaY = this.moveY - this.startY;
        const offsetY = rubberbandIfOutOfBounds(Math.abs(this.lastY + deltaY), -this.bounds.bottom, -this.bounds.top);
        this.setTransform(-Math.round(offsetY));
    }
    /**
     * 手指触摸动作结束
     */
    onTouchEnd(e) {
        if (!this.moving || getPointsNumber(e) > 1)
            return;
        this.endY = getTouchPoints(e).y;
        const deltaY = this.endY - this.startY;
        const offsetY = this.lastY + deltaY;
        this.lastY = nearest(this.possibles, offsetY);
        this.setTransform(Math.round(this.lastY), 0.3);
        if (this.movingTimer)
            clearTimeout(this.movingTimer);
        this.movingTimer = setTimeout(() => {
            this.moving = false;
        }, 300);
    }
    /**
     * 设置滚动样式
     */
    setTransform(y, time = 0) {
        const wrapStyle = styleToCssString({
            height: `${-this.bounds.top}px`,
            transform: `translate3d(0, calc(100% + ${y}px), 0)`,
            transition: time ? `cubic-bezier(0, 0, 0.2, 1.15) ${time}s` : 'none',
        });
        if (this.wrapStyle !== wrapStyle) {
            this.wrapStyle = wrapStyle;
            if (time) {
                setTimeout(() => this.setTransform(y), time * 1000);
            }
            this.$emit('heightChange', {
                height: -y,
                minHeight: -this.bounds.bottom,
                maxHeight: -this.bounds.top,
                animating: !!time,
            });
        }
    }
    setHeight(height, options = {}) {
        this.setTransform(-height, options.immediate ? 0.3 : 0);
        this.lastY = -height;
    }
    initializeAnchors() {
        const anchors = (this.defaultAnchors || []).filter((x) => typeof x === 'number' && x > 0);
        const possibles = anchors.length === 0 ? [-getSystemInfoSync(['window']).windowHeight] : anchors.map((x) => -x);
        const bounds = {
            top: Math.round(possibles[possibles.length - 1]),
            bottom: Math.round(possibles[0]),
        };
        this.bounds = bounds;
        this.lastY = bounds.bottom;
        this.possibles = possibles;
        this.setTransform(bounds.bottom);
    }
    mounted() {
        this.initializeAnchors();
    }
};
__decorate([
    Prop({ type: Array, default: () => [] })
], FloatingPanel.prototype, "defaultAnchors", void 0);
__decorate([
    Watch('defaultAnchors')
], FloatingPanel.prototype, "onAnchorsChange", null);
FloatingPanel = __decorate([
    Component({
        expose: ['setHeight'],
        props: {
            prefixCls: {
                type: String,
                default: 'dora-floating-panel',
            },
            defaultAnchors: {
                type: Array,
                default: () => [],
            },
        },
    })
], FloatingPanel);
export default defineComponentHOC()(FloatingPanel);
