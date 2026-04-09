/**
 * @doraemon-ui/miniprogram.timeline.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-06, 00:36:58.
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
let TimelineItem = class TimelineItem extends Doraemon {
    prefixCls;
    content;
    dotStyle;
    custom;
    isLast = false;
    isPending = false;
    pending = false;
    className = '';
    extStyle = '';
    onDotStyleChange(v) {
        this.extStyle = styleToCssString(v);
    }
    get classes() {
        const p = this.prefixCls;
        return {
            wrap: classNames(p, {
                [`${p}--last`]: this.isLast,
                [`${p}--pending`]: this.pending,
            }),
            tail: classNames(`${p}__tail`, {
                [`${p}__tail--pending`]: this.isPending,
            }),
            dot: classNames(`${p}__dot`, {
                [`${p}__dot--custom`]: this.custom,
            }),
            content: `${p}__content`,
        };
    }
    updateIsLastElement({ index, isLast, isPending, pending, position }) {
        const p = this.prefixCls;
        const className = position === 'alternate'
            ? (index % 2 === 0 ? `${p}--alternate ${p}--left` : `${p}--alternate ${p}--right`)
            : (position === 'right' ? `${p}--right` : '');
        this.isLast = isLast;
        this.isPending = isPending;
        this.pending = pending;
        this.className = className;
    }
    mounted() {
        this.onDotStyleChange(this.dotStyle);
    }
};
__decorate([
    Prop({ type: String, default: '' })
], TimelineItem.prototype, "content", void 0);
__decorate([
    Prop({ type: null, default: '' })
], TimelineItem.prototype, "dotStyle", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], TimelineItem.prototype, "custom", void 0);
__decorate([
    Watch('dotStyle')
], TimelineItem.prototype, "onDotStyleChange", null);
TimelineItem = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-timeline-item',
            },
        },
        components: {
            Timeline: () => ({
                module: './index',
                type: 'parent',
            }),
        },
    })
], TimelineItem);
export default defineComponentHOC()(TimelineItem);
