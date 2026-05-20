/**
 * @doraemon-ui/miniprogram.prompt.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-17, 16:42:40.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Doraemon, Prop, Event, Emit, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames } = Doraemon.util;
const defaultIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAHdElNRQfgCxwAHyE2vHbUAAACWUlEQVRo3u2ZP2gTcRTHP7EpBTOJWrDSxdZBxE0yCC3UdilqUBCs4B8ogVfr0EnQ6lAEsylIXR6moFA1g6IoSAct7WhxUBQFsS5aLDgWcWitLjG5y11zufxyl8Hfd8n7vd+79z738svvfkfAysrqf1fC3609jHGYtnDJJBEuHiDpU7yNAkfj6sAmH990fOV9ADTN8fjK+3VA4izvB9AfL4B3EbY67E75Vn9qHeSCHAzfgQZJIU+f7moaAPvpAC7FAKAnPJ6EprkOQFbP6OZIAbSdgna5PEf4wSt6i8O7/NRx3RZdB84B4y7PGFsrYq7RExGAppgAhnV72ScDdDFVGi7ST4s8jqoD/77/UadTvkiW0wB8pltmZX3jBEYAmizd6YSmKiYfATAStLGadWDAYQ+5p+QXF4G5oBQGANrObccwr50VAXmG5HdQFs8RQpfoKA023Ip1N5c563E/5Qrvwj3NkqGiAU2Q5gYHfCczZPio55mvtuyMADTDHbZUDdnDLOhJKbiu+1O23Qe3sGsgFVC+HFejQgLIA1ro40OVkGUO0SpTtWYM/SuQdZljL/t44jM5T5od8lzWas8XehECCLznmO7kDc6HTLcshs9lsA/IEsOO4Wg95U13whmHPV1fCiMAWWWkaOZkpQkAwP3i52S9CQwBZIUccE+WmwQA3AKu1n+5MYB8JyufmggAte96EQGYyQJYAAtgASyA90y46rC/ahM68DLiigtBAFHfdC4AQBZ4GGH5tzwL6gCc8n3paIRe01v52trQ/wuqaI0X3JQZ80RWVlYN11+uNXxr6IunHwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNi0xMS0yOFQwMDozMTozMyswODowMBHRiXcAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTYtMTEtMjhUMDA6MzE6MzMrMDg6MDBgjDHLAAAAAElFTkSuQmCC';
let Prompt = class Prompt extends Doraemon {
    get classes() {
        const { prefixCls, buttons } = this;
        const wrap = classNames(prefixCls);
        const button = (buttons || []).map((buttonItem)=>{
            const itemWrap = classNames(`${prefixCls}__button`, {
                [`${prefixCls}__button--disabled`]: !!buttonItem.disabled,
                [`${buttonItem.className}`]: !!buttonItem.className
            });
            const hover = buttonItem.hoverClass && buttonItem.hoverClass !== 'default' ? buttonItem.hoverClass : `${prefixCls}__button--hover`;
            return {
                wrap: itemWrap,
                hover
            };
        });
        return {
            wrap,
            button,
            bd: `${prefixCls}__bd`,
            icon: `${prefixCls}__icon`,
            title: `${prefixCls}__title`,
            text: `${prefixCls}__text`,
            buttons: `${prefixCls}__buttons`
        };
    }
    onClick(e) {
        const { index } = e.currentTarget.dataset;
        const value = this.buttons[index];
        if (!value || value.disabled) return;
        this.$emit('click', {
            index,
            value,
            buttons: this.buttons
        });
    }
    onGetUserInfo(e) {
        return {
            ...e.detail,
            ...e.currentTarget.dataset
        };
    }
    onContact(e) {
        return {
            ...e.detail,
            ...e.currentTarget.dataset
        };
    }
    onGetPhoneNumber(e) {
        return {
            ...e.detail,
            ...e.currentTarget.dataset
        };
    }
    onLaunchApp(e) {
        return {
            ...e.detail,
            ...e.currentTarget.dataset
        };
    }
    onChooseAvatar(e) {
        return {
            ...e.detail,
            ...e.currentTarget.dataset
        };
    }
    onOpenSetting(e) {
        return {
            ...e.detail,
            ...e.currentTarget.dataset
        };
    }
    onCreateLiveActivity(e) {
        return {
            ...e.detail,
            ...e.currentTarget.dataset
        };
    }
    onGetRealtimePhoneNumber(e) {
        return {
            ...e.detail,
            ...e.currentTarget.dataset
        };
    }
    onAgreePrivacyAuthorization(e) {
        return {
            ...e.detail,
            ...e.currentTarget.dataset
        };
    }
    onError(e) {
        return {
            ...e.detail,
            ...e.currentTarget.dataset
        };
    }
};
_ts_decorate([
    Prop({
        type: null,
        default: 'dora-animate--fadeIn'
    })
], Prompt.prototype, "classNames", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: defaultIcon
    })
], Prompt.prototype, "icon", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Prompt.prototype, "title", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Prompt.prototype, "text", void 0);
_ts_decorate([
    Prop({
        type: Array,
        default: []
    })
], Prompt.prototype, "buttons", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Prompt.prototype, "visible", void 0);
_ts_decorate([
    Prop({
        type: [
            String,
            Object
        ],
        default: ''
    })
], Prompt.prototype, "wrapStyle", void 0);
_ts_decorate([
    Event(),
    Emit('getuserinfo')
], Prompt.prototype, "onGetUserInfo", null);
_ts_decorate([
    Event(),
    Emit('contact')
], Prompt.prototype, "onContact", null);
_ts_decorate([
    Event(),
    Emit('getphonenumber')
], Prompt.prototype, "onGetPhoneNumber", null);
_ts_decorate([
    Event(),
    Emit('launchapp')
], Prompt.prototype, "onLaunchApp", null);
_ts_decorate([
    Event(),
    Emit('chooseavatar')
], Prompt.prototype, "onChooseAvatar", null);
_ts_decorate([
    Event(),
    Emit('opensetting')
], Prompt.prototype, "onOpenSetting", null);
_ts_decorate([
    Event(),
    Emit('createliveactivity')
], Prompt.prototype, "onCreateLiveActivity", null);
_ts_decorate([
    Event(),
    Emit('getrealtimephonenumber')
], Prompt.prototype, "onGetRealtimePhoneNumber", null);
_ts_decorate([
    Event(),
    Emit('agreeprivacyauthorization')
], Prompt.prototype, "onAgreePrivacyAuthorization", null);
_ts_decorate([
    Event(),
    Emit('error')
], Prompt.prototype, "onError", null);
Prompt = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-prompt'
            }
        }
    })
], Prompt);
var index = defineComponentHOC()(Prompt);

export { Prompt, index as default, defaultIcon };
