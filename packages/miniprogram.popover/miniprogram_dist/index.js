/**
 * @doraemon-ui/miniprogram.popover.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-04, 23:54:14.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js';
import { useRect, useScrollOffset } from '@doraemon-ui/miniprogram.shared';
const { classNames, styleToCssString } = Doraemon.util;
const getPlacements = ([a, s, b, r], placement = 'top') => {
    switch (placement) {
        case 'topLeft':
            return { top: !r ? s.scrollTop + a.top - b.height - 4 : a.top - b.height - r.top, left: !r ? s.scrollLeft + a.left : a.left };
        case 'top':
            return { top: !r ? s.scrollTop + a.top - b.height - 4 : a.top - b.height - r.top, left: !r ? s.scrollLeft + a.left + (a.width - b.width) / 2 : a.left + (a.width - b.width) / 2 };
        case 'topRight':
            return { top: !r ? s.scrollTop + a.top - b.height - 4 : a.top - b.height - r.top, left: !r ? s.scrollLeft + a.left + a.width - b.width : a.left + a.width - b.width };
        case 'rightTop':
            return { top: !r ? s.scrollTop + a.top : a.top - r.top, left: !r ? s.scrollLeft + a.left + a.width + 4 : a.left + a.width };
        case 'right':
            return { top: !r ? s.scrollTop + a.top + (a.height - b.height) / 2 : a.top + (a.height - b.height) / 2 - r.top, left: !r ? s.scrollLeft + a.left + a.width + 4 : a.left + a.width };
        case 'rightBottom':
            return { top: !r ? s.scrollTop + a.top + a.height - b.height : a.top + a.height - b.height - r.top, left: !r ? s.scrollLeft + a.left + a.width + 4 : a.left + a.width };
        case 'bottomRight':
            return { top: !r ? s.scrollTop + a.top + a.height + 4 : a.top + a.height - r.top, left: !r ? s.scrollLeft + a.left + a.width - b.width : a.left + a.width - b.width };
        case 'bottom':
            return { top: !r ? s.scrollTop + a.top + a.height + 4 : a.top + a.height - r.top, left: !r ? s.scrollLeft + a.left + (a.width - b.width) / 2 : a.left + (a.width - b.width) / 2 };
        case 'bottomLeft':
            return { top: !r ? s.scrollTop + a.top + a.height + 4 : a.top + a.height - r.top, left: !r ? s.scrollLeft + a.left : a.left };
        case 'leftBottom':
            return { top: !r ? s.scrollTop + a.top + a.height - b.height : a.top + a.height - b.height - r.top, left: !r ? s.scrollLeft + a.left - b.width - 4 : a.left - b.width };
        case 'left':
            return { top: !r ? s.scrollTop + a.top + (a.height - b.height) / 2 : a.top + (a.height - b.height) / 2 - r.top, left: !r ? s.scrollLeft + a.left - b.width - 4 : a.left - b.width };
        case 'leftTop':
            return { top: !r ? s.scrollTop + a.top : a.top - r.top, left: !r ? s.scrollLeft + a.left - b.width - 4 : a.left - b.width };
        default:
            return { left: 0, top: 0 };
    }
};
let Popover = class Popover extends Doraemon {
    prefixCls;
    classNames;
    theme;
    title;
    content;
    placement;
    trigger;
    bodyStyle;
    defaultVisible;
    visible;
    controlled;
    mask;
    maskClosable;
    useSlot;
    slotRect;
    relativeRect;
    extStyle = '';
    popoverStyle = '';
    popoverVisible = false;
    get classes() {
        const { prefixCls, theme, placement } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--theme-${theme}`]: theme,
            [`${prefixCls}--placement-${placement}`]: placement,
        });
        return {
            wrap,
            content: `${prefixCls}__content`,
            arrow: `${prefixCls}__arrow`,
            inner: `${prefixCls}__inner`,
            title: `${prefixCls}__title`,
            innerContent: `${prefixCls}__inner-content`,
            element: `${prefixCls}__element`,
        };
    }
    onBodyStyleChange(val) {
        this.extStyle = styleToCssString(val);
    }
    onVisibleChange(v) {
        if (this.controlled) {
            this.updated(v);
        }
    }
    updated(popoverVisible) {
        if (this.popoverVisible !== popoverVisible) {
            this.popoverVisible = popoverVisible;
        }
    }
    getPopoverStyle() {
        const { prefixCls, placement, slotRect, relativeRect } = this;
        const promises = [];
        if (this.useSlot) {
            promises.push(useRect(`.${prefixCls}__element`, this._renderProxy));
        }
        promises.push(useScrollOffset(this._renderProxy));
        promises.push(useRect(`.${prefixCls}`, this._renderProxy));
        Promise.all(promises).then((rects) => {
            if (rects.filter((n) => !n).length)
                return;
            const res = rects.length === 3
                ? [...rects, relativeRect]
                : [slotRect, ...rects, relativeRect];
            const placements = getPlacements(res, placement);
            this.popoverStyle = styleToCssString(placements);
        });
    }
    onEnter() {
        this.getPopoverStyle();
    }
    onChange() {
        const nextVisible = !this.popoverVisible;
        if (!this.controlled) {
            this.updated(nextVisible);
        }
        this.$emit('change', { visible: nextVisible });
    }
    onClick() {
        if (this.trigger === 'click') {
            this.onChange();
        }
    }
    onMaskClick() {
        if (this.maskClosable && this.popoverVisible) {
            this.onChange();
        }
    }
    mounted() {
        const popoverVisible = this.controlled ? this.visible : this.defaultVisible;
        this.onBodyStyleChange(this.bodyStyle);
        this.updated(popoverVisible);
    }
};
__decorate([
    Prop({
        type: null,
        default: 'dora-animate--fadeIn',
    })
], Popover.prototype, "classNames", void 0);
__decorate([
    Prop({
        type: String,
        default: 'light',
    })
], Popover.prototype, "theme", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], Popover.prototype, "title", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], Popover.prototype, "content", void 0);
__decorate([
    Prop({
        type: String,
        default: 'top',
    })
], Popover.prototype, "placement", void 0);
__decorate([
    Prop({
        type: String,
        default: 'click',
    })
], Popover.prototype, "trigger", void 0);
__decorate([
    Prop({
        type: [String, Object],
        default: '',
    })
], Popover.prototype, "bodyStyle", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], Popover.prototype, "defaultVisible", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], Popover.prototype, "visible", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], Popover.prototype, "controlled", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], Popover.prototype, "mask", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: true,
    })
], Popover.prototype, "maskClosable", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: true,
    })
], Popover.prototype, "useSlot", void 0);
__decorate([
    Prop({
        type: Object,
        default: null,
    })
], Popover.prototype, "slotRect", void 0);
__decorate([
    Prop({
        type: Object,
        default: null,
    })
], Popover.prototype, "relativeRect", void 0);
__decorate([
    Watch('bodyStyle')
], Popover.prototype, "onBodyStyleChange", null);
__decorate([
    Watch('visible')
], Popover.prototype, "onVisibleChange", null);
Popover = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-popover',
            },
        },
    })
], Popover);
export default defineComponentHOC()(Popover);
