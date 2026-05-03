/**
 * @doraemon-ui/miniprogram.alert.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:42:00.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Doraemon, Prop, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames } = Doraemon.util;
let Alert = class Alert extends Doraemon {
    get classes() {
        const { prefixCls, theme } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--${theme}`]: theme
        });
        const hd = `${prefixCls}__hd`;
        const thumb = `${prefixCls}__thumb`;
        const bd = `${prefixCls}__bd`;
        const text = `${prefixCls}__text`;
        const desc = `${prefixCls}__desc`;
        const ft = `${prefixCls}__ft`;
        const closable = `${prefixCls}__closable`;
        return {
            wrap,
            hd,
            thumb,
            bd,
            text,
            desc,
            ft,
            closable
        };
    }
    /**
   * 关闭时触发的回调函数
   */ onClose() {
        if (this.closable) {
            this.visible = false;
        }
        this.$emit('click');
    }
    /**
   * 点击事件
   */ onClick() {
        this.$emit('click');
    }
    constructor(...args){
        super(...args);
        /**
   * 是否可见
   */ this.visible = true;
    }
};
_ts_decorate([
    Prop({
        type: null,
        default: 'dora-animate--fadeIn'
    })
], Alert.prototype, "classNames", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'balanced'
    })
], Alert.prototype, "theme", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Alert.prototype, "thumb", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Alert.prototype, "title", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Alert.prototype, "label", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Alert.prototype, "closable", void 0);
Alert = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-alert'
            }
        }
    })
], Alert);
var index = defineComponentHOC()(Alert);

export { Alert, index as default };
