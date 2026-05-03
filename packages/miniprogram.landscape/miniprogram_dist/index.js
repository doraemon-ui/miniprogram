/**
 * @doraemon-ui/miniprogram.landscape.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:39:32.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Doraemon, Prop, Watch, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames } = Doraemon.util;
let Landscape = class Landscape extends Doraemon {
    get classes() {
        const { prefixCls, showMask } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--has-mask`]: showMask
        });
        return {
            wrap,
            inner: `${prefixCls}__inner`,
            close: `${prefixCls}__close`,
            x: `${prefixCls}__close-x`
        };
    }
    get popupBodyStyle() {
        return {
            backgroundColor: 'transparent',
            padding: '0'
        };
    }
    onMaskChange(mask) {
        if (this.showMask !== mask) {
            this.showMask = mask;
        }
    }
    onClose() {
        this.$emit('close', {
            visible: !this.visible
        });
    }
    mounted() {
        this.onMaskChange(this.mask);
    }
    constructor(...args){
        super(...args);
        this.showMask = true;
    }
};
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Landscape.prototype, "visible", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], Landscape.prototype, "mask", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Landscape.prototype, "maskClosable", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], Landscape.prototype, "closable", void 0);
_ts_decorate([
    Watch('mask')
], Landscape.prototype, "onMaskChange", null);
Landscape = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-landscape'
            }
        }
    })
], Landscape);
var index = defineComponentHOC()(Landscape);

export { Landscape, index as default };
