/**
 * @doraemon-ui/miniprogram.toast.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:42:36.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Doraemon, Prop, Watch, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';
import { presetIconRecord } from './toast.js';
import * as toast from './toast.js';
export { toast };

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames } = Doraemon.util;
let Toast = class Toast extends Doraemon {
    get classes() {
        const { prefixCls, iconType: hasIcon, image } = this;
        const wrap = classNames(prefixCls);
        const content = classNames(`${prefixCls}__content`, {
            [`${prefixCls}__content--has-icon`]: hasIcon !== '' || image !== ''
        });
        const img = `${prefixCls}__img`;
        const icon = classNames(`${prefixCls}__icon`, {
            [`${prefixCls}__icon--${this.icon}`]: this.icon
        });
        const text = `${prefixCls}__text`;
        return {
            wrap,
            content,
            img,
            icon,
            text
        };
    }
    get maskStyle() {
        return {
            pointerEvents: this.maskClosable ? 'none' : 'auto'
        };
    }
    get iconType() {
        return presetIconRecord[this.icon] ?? this.icon ?? '';
    }
    get bodyStyle() {
        const getTop = (position)=>{
            switch(position){
                case 'top':
                    return '20%';
                case 'bottom':
                    return '80%';
                default:
                    return '50%';
            }
        };
        return {
            maxWidth: '75vw',
            maxHeight: '75vh',
            backgroundColor: 'unset',
            top: getTop(this.position)
        };
    }
    onVisibleChange(visible) {
        this.setPopupVisible(visible);
    }
    setPopupVisible(popupVisible) {
        if (this.popupVisible !== popupVisible) {
            this.popupVisible = popupVisible;
        }
    }
    onPopupClose() {
        this.onClose();
    }
    onPopupClosed() {
        this.onClosed();
    }
    onClose() {
        this.$emit('close');
    }
    onClosed() {
        this.$emit('closed');
    }
    mounted() {
        this.setPopupVisible(this.visible);
    }
    constructor(...args){
        super(...args);
        this.popupVisible = false;
    }
};
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Toast.prototype, "image", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Toast.prototype, "icon", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Toast.prototype, "iconColor", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Toast.prototype, "text", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 1500
    })
], Toast.prototype, "duration", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'center'
    })
], Toast.prototype, "position", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], Toast.prototype, "mask", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], Toast.prototype, "maskClosable", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Toast.prototype, "visible", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: null
    })
], Toast.prototype, "zIndex", void 0);
_ts_decorate([
    Watch('visible')
], Toast.prototype, "onVisibleChange", null);
Toast = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-toast'
            }
        }
    })
], Toast);
var index = defineComponentHOC()(Toast);

export { Toast, index as default };
