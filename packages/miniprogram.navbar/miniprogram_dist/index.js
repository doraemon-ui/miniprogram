/**
 * @doraemon-ui/miniprogram.navbar.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-04, 23:09:43.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js';
const { classNames } = Doraemon.util;
let Navbar = class Navbar extends Doraemon {
    prefixCls;
    theme;
    title;
    leftText;
    rightText;
    get classes() {
        const { prefixCls, theme } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--${theme}`]: theme,
        });
        return {
            wrap,
            left: `${prefixCls}__left`,
            text: `${prefixCls}__text`,
            title: `${prefixCls}__title`,
            right: `${prefixCls}__right`,
        };
    }
    onClick(e) {
        const { type } = e.currentTarget.dataset;
        this.$emit('click', { type });
    }
};
__decorate([
    Prop({
        type: String,
        default: 'light',
    })
], Navbar.prototype, "theme", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], Navbar.prototype, "title", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], Navbar.prototype, "leftText", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], Navbar.prototype, "rightText", void 0);
Navbar = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-navbar',
            },
        },
    })
], Navbar);
export default defineComponentHOC()(Navbar);
