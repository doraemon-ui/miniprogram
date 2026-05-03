/**
 * @doraemon-ui/miniprogram.pagination.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:42:23.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Doraemon, Prop, Watch, Emit, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames } = Doraemon.util;
let Pagination = class Pagination extends Doraemon {
    get classes() {
        const { prefixCls } = this;
        const wrap = classNames(prefixCls);
        const prev = `${prefixCls}__prev`;
        const button = `${prefixCls}__button`;
        const number = `${prefixCls}__number`;
        const active = `${prefixCls}__active`;
        const pointer = `${prefixCls}__pointer`;
        const dot = `${prefixCls}__dot`;
        const next = `${prefixCls}__next`;
        return {
            wrap,
            prev,
            button,
            number,
            active,
            pointer,
            dot,
            next
        };
    }
    watchCurrent(newVal) {
        if (this.controlled) {
            this.updated(newVal);
        }
    }
    updated(activeIndex) {
        if (this.activeIndex !== activeIndex) {
            this.activeIndex = activeIndex;
        }
    }
    onChange(current, type) {
        if (!this.controlled) {
            this.updated(current);
        }
        return {
            current,
            type
        };
    }
    onPrev() {
        const current = this.activeIndex - 1;
        this.onChange(current, 'prev');
        return {
            current
        };
    }
    onNext() {
        const current = this.activeIndex + 1;
        this.onChange(current, 'next');
        return {
            current
        };
    }
    mounted() {
        const { defaultCurrent, current, controlled } = this;
        const activeIndex = controlled ? current : defaultCurrent;
        this.updated(activeIndex);
    }
    constructor(...args){
        super(...args);
        this.activeIndex = 1;
    }
};
_ts_decorate([
    Prop({
        type: String,
        default: 'button'
    })
], Pagination.prototype, "mode", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 1
    })
], Pagination.prototype, "defaultCurrent", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 1
    })
], Pagination.prototype, "current", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Pagination.prototype, "controlled", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 0
    })
], Pagination.prototype, "total", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Pagination.prototype, "simple", void 0);
_ts_decorate([
    Watch('current')
], Pagination.prototype, "watchCurrent", null);
_ts_decorate([
    Emit('change')
], Pagination.prototype, "onChange", null);
_ts_decorate([
    Emit('prev')
], Pagination.prototype, "onPrev", null);
_ts_decorate([
    Emit('next')
], Pagination.prototype, "onNext", null);
Pagination = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-pagination'
            }
        }
    })
], Pagination);
var index = defineComponentHOC()(Pagination);

export { Pagination, index as default };
