/**
 * @doraemon-ui/miniprogram.prompt.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-05, 01:01:37.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js';
const { classNames, styleToCssString } = Doraemon.util;
const defaultIcon = 'data:image/gif;base64,R0lGODlhAQABAAAAACw=';
let Prompt = class Prompt extends Doraemon {
    prefixCls;
    classNames;
    icon;
    title;
    text;
    buttons;
    visible;
    wrapStyle;
    get classes() {
        const { prefixCls, buttons: btns } = this;
        const button = btns.map((btn) => ({
            wrap: classNames(`${prefixCls}__button`, {
                [`${prefixCls}__button--disabled`]: !!btn.disabled,
                [`${btn.className || ''}`]: !!btn.className,
            }),
            hover: btn.hoverClass && btn.hoverClass !== 'default' ? btn.hoverClass : `${prefixCls}__button--hover`,
        }));
        return {
            wrap: classNames(prefixCls),
            button,
            bd: `${prefixCls}__bd`,
            icon: `${prefixCls}__icon`,
            title: `${prefixCls}__title`,
            text: `${prefixCls}__text`,
            buttons: `${prefixCls}__buttons`,
        };
    }
    get internalWrapStyle() {
        return styleToCssString(this.wrapStyle || '');
    }
    onTap(e) {
        const { index } = e.currentTarget.dataset;
        const value = this.buttons[index];
        if (value?.disabled)
            return;
        this.$emit('click', { index, value, buttons: this.buttons });
    }
    emitOpenTypeEvent(name, e) {
        this.$emit(name, { ...e.detail, ...e.currentTarget.dataset });
    }
    bindgetuserinfo(e) { this.emitOpenTypeEvent('getuserinfo', e); }
    bindcontact(e) { this.emitOpenTypeEvent('contact', e); }
    bindgetphonenumber(e) { this.emitOpenTypeEvent('getphonenumber', e); }
    bindopensetting(e) { this.emitOpenTypeEvent('opensetting', e); }
    bindlaunchapp(e) { this.emitOpenTypeEvent('launchapp', e); }
    bindchooseavatar(e) { this.emitOpenTypeEvent('chooseavatar', e); }
    onError(e) { this.emitOpenTypeEvent('error', e); }
};
__decorate([
    Prop({
        type: null,
        default: 'dora-animate--fadeIn',
    })
], Prompt.prototype, "classNames", void 0);
__decorate([
    Prop({
        type: String,
        default: defaultIcon,
    })
], Prompt.prototype, "icon", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], Prompt.prototype, "title", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], Prompt.prototype, "text", void 0);
__decorate([
    Prop({
        type: Array,
        default: [],
    })
], Prompt.prototype, "buttons", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], Prompt.prototype, "visible", void 0);
__decorate([
    Prop({
        type: [String, Object],
        default: '',
    })
], Prompt.prototype, "wrapStyle", void 0);
Prompt = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-prompt',
            },
        },
    })
], Prompt);
export default defineComponentHOC()(Prompt);
