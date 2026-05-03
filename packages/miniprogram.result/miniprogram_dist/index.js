/**
 * @doraemon-ui/miniprogram.result.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:40:30.
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
const defaultIcon = {
    type: 'success',
    size: 93,
    color: '#33cd5f'
};
const getIcon = (icon)=>{
    if (icon !== null && typeof icon === 'object') {
        return Object.assign({}, defaultIcon, icon);
    } else if (typeof icon === 'string') {
        if (icon === '') return null;
        return Object.assign({}, defaultIcon, {
            type: icon
        });
    } else if (icon === false) {
        return null;
    }
    return defaultIcon;
};
let Result = class Result extends Doraemon {
    get classes() {
        const { prefixCls, fixed } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--fixed`]: fixed
        });
        return {
            wrap,
            hd: `${prefixCls}__hd`,
            icon: `${prefixCls}__icon`,
            bd: `${prefixCls}__bd`,
            title: `${prefixCls}__title`,
            desc: `${prefixCls}__desc`,
            buttons: `${prefixCls}__buttons`,
            ft: `${prefixCls}__ft`
        };
    }
    onIconChange(v) {
        this.resultIcon = getIcon(v);
    }
    onClick(e) {
        this.$emit('click', e.currentTarget.dataset);
    }
    emitOpenTypeEvent(name, e) {
        this.$emit(name, {
            ...e.detail,
            ...e.currentTarget.dataset
        });
    }
    bindgetuserinfo(e) {
        this.emitOpenTypeEvent('getuserinfo', e);
    }
    bindcontact(e) {
        this.emitOpenTypeEvent('contact', e);
    }
    bindgetphonenumber(e) {
        this.emitOpenTypeEvent('getphonenumber', e);
    }
    bindopensetting(e) {
        this.emitOpenTypeEvent('opensetting', e);
    }
    bindlaunchapp(e) {
        this.emitOpenTypeEvent('launchapp', e);
    }
    bindchooseavatar(e) {
        this.emitOpenTypeEvent('chooseavatar', e);
    }
    onError(e) {
        this.emitOpenTypeEvent('error', e);
    }
    mounted() {
        this.resultIcon = getIcon(this.icon);
    }
    constructor(...args){
        super(...args);
        this.resultIcon = null;
    }
};
_ts_decorate([
    Prop({
        type: null,
        default: defaultIcon
    })
], Result.prototype, "icon", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Result.prototype, "title", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Result.prototype, "label", void 0);
_ts_decorate([
    Prop({
        type: Array,
        default: []
    })
], Result.prototype, "buttons", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Result.prototype, "extra", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Result.prototype, "fixed", void 0);
_ts_decorate([
    Watch('icon')
], Result.prototype, "onIconChange", null);
Result = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-result'
            }
        }
    })
], Result);
var index = defineComponentHOC()(Result);

export { Result, index as default };
