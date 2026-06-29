/**
 * @doraemon-ui/miniprogram.popover.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-06-27, 16:55:42.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.41.
 */

import { Doraemon, Prop, Watch, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';
import { useRect, useScrollOffset, findComponentNode } from '@doraemon-ui/miniprogram.shared';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames, styleToCssString } = Doraemon.util;
function getPlacements(rects, placement = 'top') {
    const [a, s, b, r] = rects;
    switch(placement){
        case 'topLeft':
            return {
                top: !r ? s.scrollTop + a.top - b.height - 4 : a.top - b.height - r.top,
                left: !r ? s.scrollLeft + a.left : a.left
            };
        case 'top':
            return {
                top: !r ? s.scrollTop + a.top - b.height - 4 : a.top - b.height - r.top,
                left: !r ? s.scrollLeft + a.left + (a.width - b.width) / 2 : a.left + (a.width - b.width) / 2
            };
        case 'topRight':
            return {
                top: !r ? s.scrollTop + a.top - b.height - 4 : a.top - b.height - r.top,
                left: !r ? s.scrollLeft + a.left + a.width - b.width : a.left + a.width - b.width
            };
        case 'rightTop':
            return {
                top: !r ? s.scrollTop + a.top : a.top - r.top,
                left: !r ? s.scrollLeft + a.left + a.width + 4 : a.left + a.width
            };
        case 'right':
            return {
                top: !r ? s.scrollTop + a.top + (a.height - b.height) / 2 : a.top + (a.height - b.height) / 2 - r.top,
                left: !r ? s.scrollLeft + a.left + a.width + 4 : a.left + a.width
            };
        case 'rightBottom':
            return {
                top: !r ? s.scrollTop + a.top + a.height - b.height : a.top + a.height - b.height - r.top,
                left: !r ? s.scrollLeft + a.left + a.width + 4 : a.left + a.width
            };
        case 'bottomRight':
            return {
                top: !r ? s.scrollTop + a.top + a.height + 4 : a.top + a.height - r.top,
                left: !r ? s.scrollLeft + a.left + a.width - b.width : a.left + a.width - b.width
            };
        case 'bottom':
            return {
                top: !r ? s.scrollTop + a.top + a.height + 4 : a.top + a.height - r.top,
                left: !r ? s.scrollLeft + a.left + (a.width - b.width) / 2 : a.left + (a.width - b.width) / 2
            };
        case 'bottomLeft':
            return {
                top: !r ? s.scrollTop + a.top + a.height + 4 : a.top + a.height - r.top,
                left: !r ? s.scrollLeft + a.left : a.left
            };
        case 'leftBottom':
            return {
                top: !r ? s.scrollTop + a.top + a.height - b.height : a.top + a.height - b.height - r.top,
                left: !r ? s.scrollLeft + a.left - b.width - 4 : a.left - b.width
            };
        case 'left':
            return {
                top: !r ? s.scrollTop + a.top + (a.height - b.height) / 2 : a.top + (a.height - b.height) / 2 - r.top,
                left: !r ? s.scrollLeft + a.left - b.width - 4 : a.left - b.width
            };
        case 'leftTop':
            return {
                top: !r ? s.scrollTop + a.top : a.top - r.top,
                left: !r ? s.scrollLeft + a.left - b.width - 4 : a.left - b.width
            };
        default:
            return {
                left: 0,
                top: 0
            };
    }
}
let Popover = class Popover extends Doraemon {
    get classes() {
        const { prefixCls, color, placement } = this;
        return {
            wrap: classNames(prefixCls, {
                [`${prefixCls}--color-${color}`]: color,
                [`${prefixCls}--placement-${placement}`]: placement
            }),
            content: `${prefixCls}__content`,
            arrow: `${prefixCls}__arrow`,
            inner: `${prefixCls}__inner`,
            title: `${prefixCls}__title`,
            innerContent: `${prefixCls}__inner-content`,
            element: `${prefixCls}__element`
        };
    }
    onBodyStyleChange(newVal) {
        this.extStyle = styleToCssString(newVal);
    }
    onVisibleChange(newVal) {
        if (this.controlled) {
            this.updated(newVal);
        }
    }
    updated(popoverVisible) {
        if (this.popoverVisible !== popoverVisible) {
            this.popoverVisible = popoverVisible;
            this.setBackdropVisible(popoverVisible);
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
        Promise.all(promises).then((rects)=>{
            if (rects.filter((n)=>!n).length) return;
            const res = rects.length === 3 ? [
                ...rects,
                relativeRect
            ] : [
                slotRect,
                ...rects,
                relativeRect
            ];
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
        this.$emit('change', {
            visible: nextVisible
        });
    }
    onClick() {
        if (this.trigger === 'click') {
            this.onChange();
        }
    }
    setBackdropVisible(visible) {
        if (this.mask && this._backdrop) {
            if (visible) {
                this._backdrop.retain?.();
            } else {
                this._backdrop.release?.();
            }
        }
    }
    onMaskClick() {
        if (this.maskClosable && this.popoverVisible) {
            this.onChange();
        }
    }
    created() {
        if (this.mask) {
            this._backdrop = findComponentNode('#dora-backdrop', this._renderProxy);
        }
    }
    mounted() {
        this.onBodyStyleChange(this.bodyStyle);
        this.updated(this.controlled ? this.visible : this.defaultVisible);
    }
    constructor(...args){
        super(...args);
        this.extStyle = '';
        this.popoverStyle = '';
        this.popoverVisible = false;
    }
};
_ts_decorate([
    Prop({
        type: null,
        default: 'dora-animate--fadeIn'
    })
], Popover.prototype, "classNames", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'light'
    })
], Popover.prototype, "color", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Popover.prototype, "title", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Popover.prototype, "content", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'top'
    })
], Popover.prototype, "placement", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'click'
    })
], Popover.prototype, "trigger", void 0);
_ts_decorate([
    Prop({
        type: [
            String,
            Object
        ],
        default: ''
    })
], Popover.prototype, "bodyStyle", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Popover.prototype, "defaultVisible", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Popover.prototype, "visible", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Popover.prototype, "controlled", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Popover.prototype, "mask", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], Popover.prototype, "maskClosable", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], Popover.prototype, "useSlot", void 0);
_ts_decorate([
    Prop({
        type: Object,
        default: null
    })
], Popover.prototype, "slotRect", void 0);
_ts_decorate([
    Prop({
        type: Object,
        default: null
    })
], Popover.prototype, "relativeRect", void 0);
_ts_decorate([
    Watch('bodyStyle')
], Popover.prototype, "onBodyStyleChange", null);
_ts_decorate([
    Watch('visible')
], Popover.prototype, "onVisibleChange", null);
Popover = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-popover'
            }
        }
    })
], Popover);
var index = defineComponentHOC()(Popover);

export { Popover, index as default };
