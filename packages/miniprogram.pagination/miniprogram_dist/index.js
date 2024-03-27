/**
 * @doraemon-ui/miniprogram.pagination.
 * © 2021 - 2024 Doraemon UI.
 * Built on 2024-03-28, 00:14:31.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.20.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Watch, Emit } from '@doraemon-ui/miniprogram.core-js';
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
            next,
        };
    }
    activeIndex = 1;
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
            type,
        };
    }
    onPrev() {
        const current = this.activeIndex - 1;
        this.onChange(current, 'prev');
        return {
            current,
        };
    }
    onNext() {
        const current = this.activeIndex + 1;
        this.onChange(current, 'next');
        return {
            current,
        };
    }
};
__decorate([
    Watch('current')
], Pagination.prototype, "watchCurrent", null);
__decorate([
    Emit('change')
], Pagination.prototype, "onChange", null);
__decorate([
    Emit('prev')
], Pagination.prototype, "onPrev", null);
__decorate([
    Emit('next')
], Pagination.prototype, "onNext", null);
Pagination = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-pagination',
            },
            mode: {
                type: String,
                default: 'button',
            },
            defaultCurrent: {
                type: Number,
                default: 1,
            },
            current: {
                type: Number,
                default: 1,
            },
            controlled: {
                type: Boolean,
                default: false,
            },
            total: {
                type: Number,
                default: 0,
            },
            simple: {
                type: Boolean,
                default: false,
            },
        },
    })
], Pagination);
export default defineComponentHOC()(Pagination);
