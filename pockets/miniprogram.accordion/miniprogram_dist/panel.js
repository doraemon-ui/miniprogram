/**
 * @doraemon-ui/miniprogram.accordion.
 * © 2021 - 2021 Doraemon UI.
 * Built on 2021-11-30, 15:14:45.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.17.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component } from '@doraemon-ui/miniprogram.core-js';
const { classNames } = Doraemon.util;
let Panel = class Panel extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Button
     */
    prefixCls;
    /**
     * 当前的主题
     *
     * @type {string}
     * @memberof Button
     */
    darkmode;
    get classes() {
        const { prefixCls, current, disabled } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--current`]: current,
            [`${prefixCls}--disabled`]: disabled,
        });
        const hd = `${prefixCls}__hd`;
        const thumb = `${prefixCls}__thumb`;
        const title = `${prefixCls}__title`;
        const arrow = `${prefixCls}__arrow`;
        const bd = `${prefixCls}__bd`;
        const content = `${prefixCls}__content`;
        return {
            wrap,
            hd,
            thumb,
            title,
            arrow,
            bd,
            content,
        };
    }
    current = false;
    index = '0';
    changeCurrent(current, index) {
        this.current = current;
        this.index = index;
    }
    onClick() {
        const { index, disabled } = this;
        if (!disabled && this.$parent) {
            this.$parent.onClickItem(index);
        }
    }
};
Panel = __decorate([
    Component({
        components: {
            Accordion: () => ({
                module: './index',
                type: 'parent',
            }),
        },
        props: {
            prefixCls: {
                type: String,
                default: 'dora-accordion-panel',
            },
            darkmode: {
                type: String,
                default: Doraemon.config.darkmode,
            },
            key: {
                type: String,
                default: '',
            },
            thumb: {
                type: String,
                default: '',
            },
            title: {
                type: String,
                default: '',
            },
            content: {
                type: String,
                default: '',
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            showArrow: {
                type: Boolean,
                default: true,
            },
        },
    })
], Panel);
export default defineComponentHOC()(Panel);
