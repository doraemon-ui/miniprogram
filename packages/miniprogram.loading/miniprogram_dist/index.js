/**
 * @doraemon-ui/miniprogram.loading.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-02-27, 02:20:41.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component } from '@doraemon-ui/miniprogram.core-js';
const { classNames } = Doraemon.util;
const defaults = {
    prefixCls: 'dora-loading',
    classNames: 'dora-animate--fadeIn',
    text: '数据加载中',
    mask: true,
    transparent: true,
};
let Loading = class Loading extends Doraemon {
    prefixCls;
    classNames = defaults.classNames;
    text = defaults.text;
    mask = defaults.mask;
    transparent = defaults.transparent;
    'in' = false;
    get classes() {
        const { prefixCls } = this;
        return {
            wrap: classNames(prefixCls),
            content: classNames(`${prefixCls}__content`, {
                [`${prefixCls}__content--has-icon`]: true,
            }),
            icon: classNames(`${prefixCls}__icon`, {
                [`${prefixCls}__icon--loading`]: true,
            }),
            text: `${prefixCls}__text`,
        };
    }
    hide() {
        this['in'] = false;
    }
    show(opts = {}) {
        const options = {
            ...defaults,
            ...opts,
        };
        this.prefixCls = options.prefixCls;
        this.classNames = options.classNames;
        this.text = options.text;
        this.mask = options.mask;
        this.transparent = options.transparent;
        this['in'] = true;
    }
};
Loading = __decorate([
    Component({
        expose: ['show', 'hide'],
        props: {
            prefixCls: {
                type: String,
                default: 'dora-loading',
            },
        },
    })
], Loading);
export const $wuxLoading = (selector = '#dora-loading', context) => {
    const page = context || getCurrentPages()[getCurrentPages().length - 1];
    return (page?.selectComponent?.(selector) || {});
};
export default defineComponentHOC()(Loading);
