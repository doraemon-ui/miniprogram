/**
 * @doraemon-ui/miniprogram.loading.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:39:39.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Doraemon, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames } = Doraemon.util;
const defaults = {
    prefixCls: 'dora-loading',
    classNames: 'dora-animate--fadeIn',
    text: '数据加载中',
    mask: true,
    transparent: true
};
let Loading = class Loading extends Doraemon {
    get classes() {
        const { prefixCls } = this;
        return {
            wrap: classNames(prefixCls),
            content: classNames(`${prefixCls}__content`, {
                [`${prefixCls}__content--has-icon`]: true
            }),
            icon: classNames(`${prefixCls}__icon`, {
                [`${prefixCls}__icon--loading`]: true
            }),
            text: `${prefixCls}__text`
        };
    }
    hide() {
        this['in'] = false;
    }
    show(opts = {}) {
        const options = {
            ...defaults,
            ...opts
        };
        this.prefixCls = options.prefixCls;
        this.classNames = options.classNames;
        this.text = options.text;
        this.mask = options.mask;
        this.transparent = options.transparent;
        this['in'] = true;
    }
    constructor(...args){
        super(...args);
        this.classNames = defaults.classNames;
        this.text = defaults.text;
        this.mask = defaults.mask;
        this.transparent = defaults.transparent;
        this['in'] = false;
    }
};
Loading = _ts_decorate([
    Component({
        expose: [
            'show',
            'hide'
        ],
        props: {
            prefixCls: {
                type: String,
                default: 'dora-loading'
            }
        }
    })
], Loading);
const $wuxLoading = (selector = '#dora-loading', context)=>{
    const page = context || getCurrentPages()[getCurrentPages().length - 1];
    return page?.selectComponent?.(selector) || {};
};
var index = defineComponentHOC()(Loading);

export { $wuxLoading, Loading, index as default };
