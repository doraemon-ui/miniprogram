/**
 * @doraemon-ui/miniprogram.list.
 * © 2021 - 2021 Doraemon UI.
 * Built on 2021-09-25, 17:38:06.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.14.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Emit, Event } from '@doraemon-ui/miniprogram.core-js';
const { classNames } = Doraemon.util;
let ListItem = class ListItem extends Doraemon {
    get classes() {
        const { prefixCls, hoverClass, isLast, hasLine, isLink, disabled } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--last`]: isLast,
            [`${prefixCls}--has-line`]: hasLine,
            [`${prefixCls}--access`]: isLink,
            [`${prefixCls}--disabled`]: disabled,
        });
        const hd = `${prefixCls}__hd`;
        const thumb = `${prefixCls}__thumb`;
        const bd = `${prefixCls}__bd`;
        const text = `${prefixCls}__text`;
        const desc = `${prefixCls}__desc`;
        const ft = `${prefixCls}__ft`;
        const hover = hoverClass && hoverClass !== 'default' ? hoverClass : `${prefixCls}--hover`;
        return {
            wrap,
            hd,
            thumb,
            bd,
            text,
            desc,
            ft,
            hover,
        };
    }
    isLast = false;
    onClick() {
        if (!this.disabled) {
            this.$emit('click');
            this.linkTo();
        }
    }
    onGetUserInfo(e) {
        return e.target;
    }
    onContact(e) {
        return e.target;
    }
    onGetPhoneNumber(e) {
        return e.target;
    }
    onOpenSetting(e) {
        return e.target;
    }
    onError(e) {
        return e.target;
    }
    linkTo() {
        const { url, isLink, openType, delta } = this;
        const navigate = [
            'navigateTo',
            'redirectTo',
            'switchTab',
            'navigateBack',
            'reLaunch',
        ];
        // openType 属性可选值为 navigateTo、redirectTo、switchTab、navigateBack、reLaunch
        if (!isLink || !url || !navigate.includes(openType)) {
            return false;
        }
        else if (openType === 'navigateBack') {
            return wx[openType].call(wx, {
                delta,
            });
        }
        else {
            return wx[openType].call(wx, {
                url,
            });
        }
    }
    updateIsLastElement(isLast) {
        if (isLast !== this.isLast) {
            this.isLast = isLast;
        }
    }
};
__decorate([
    Event(),
    Emit('getuserinfo')
], ListItem.prototype, "onGetUserInfo", null);
__decorate([
    Event(),
    Emit('contact')
], ListItem.prototype, "onContact", null);
__decorate([
    Event(),
    Emit('getphonenumber')
], ListItem.prototype, "onGetPhoneNumber", null);
__decorate([
    Event(),
    Emit('opensetting')
], ListItem.prototype, "onOpenSetting", null);
__decorate([
    Event(),
    Emit('error')
], ListItem.prototype, "onError", null);
ListItem = __decorate([
    Component({
        components: {
            List: () => ({
                module: './index',
                type: 'ancestor',
            }),
        },
        props: {
            prefixCls: {
                type: String,
                default: 'dora-list-item',
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            hoverClass: {
                type: String,
                default: 'default',
            },
            hoverStopPropagation: {
                type: Boolean,
                default: false,
            },
            hoverStartTime: {
                type: Number,
                default: 20,
            },
            hoverStayTime: {
                type: Number,
                default: 70,
            },
            lang: {
                type: String,
                default: 'en',
            },
            sessionFrom: {
                type: String,
                default: '',
            },
            sendMessageTitle: {
                type: String,
                default: '',
            },
            sendMessagePath: {
                type: String,
                default: '',
            },
            sendMessageImg: {
                type: String,
                default: '',
            },
            showMessageCard: {
                type: Boolean,
                default: false,
            },
            appParameter: {
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
            label: {
                type: String,
                default: '',
            },
            extra: {
                type: String,
                default: '',
            },
            hasLine: {
                type: Boolean,
                default: true,
            },
            isLink: {
                type: Boolean,
                default: false,
            },
            openType: {
                type: String,
                default: 'navigateTo',
            },
            url: {
                type: String,
                default: '',
            },
            delta: {
                type: Number,
                default: 1,
            },
        },
    })
], ListItem);
export default defineComponentHOC()(ListItem);
