/**
 * @doraemon-ui/miniprogram.notification.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-04, 23:40:42.
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
const defaults = {
    prefixCls: 'dora-notification',
    classNames: 'dora-animate--slideInDown',
    image: '',
    title: '',
    text: '',
    duration: 3000,
    data: '',
    onClick() { },
    onClose() { },
};
let _notification = null;
let Notification = class Notification extends Doraemon {
    prefixCls;
    classNames;
    image;
    title;
    text;
    duration;
    data;
    fns = {
        onClick: defaults.onClick,
        onClose: defaults.onClose,
    };
    'in' = false;
    get classes() {
        const { prefixCls } = this;
        return {
            wrap: classNames(prefixCls),
            content: `${prefixCls}__content`,
            hd: `${prefixCls}__hd`,
            image: `${prefixCls}__image`,
            bd: `${prefixCls}__bd`,
            title: `${prefixCls}__title`,
            text: `${prefixCls}__text`,
            ft: `${prefixCls}__ft`,
        };
    }
    hide() {
        this['in'] = false;
        if (typeof this.fns.onClose === 'function') {
            this.fns.onClose(this.data);
        }
    }
    show(opts = {}) {
        const closePromise = new Promise((resolve) => {
            const options = {
                ...defaults,
                ...opts,
            };
            const callback = () => {
                this.hide();
                resolve(true);
            };
            this.prefixCls = options.prefixCls;
            this.classNames = options.classNames;
            this.image = options.image;
            this.title = options.title;
            this.text = options.text;
            this.duration = options.duration;
            this.data = options.data;
            this.fns = {
                onClick: typeof opts.onClick === 'function' ? opts.onClick : defaults.onClick,
                onClose: typeof opts.onClose === 'function' ? opts.onClose : defaults.onClose,
            };
            this['in'] = true;
            if (_notification) {
                clearTimeout(_notification.timeout);
                _notification = null;
            }
            _notification = {
                hide: this.hide.bind(this),
            };
            _notification.timeout = setTimeout(callback, options.duration);
        });
        const result = (() => {
            if (_notification) {
                _notification.hide();
            }
        });
        result.then = (resolve, reject) => closePromise.then(resolve, reject);
        result.promise = closePromise;
        return result;
    }
    onClick() {
        if (typeof this.fns.onClick === 'function') {
            this.fns.onClick(this.data);
        }
    }
};
__decorate([
    Prop({
        type: String,
        default: defaults.classNames,
    })
], Notification.prototype, "classNames", void 0);
__decorate([
    Prop({
        type: String,
        default: defaults.image,
    })
], Notification.prototype, "image", void 0);
__decorate([
    Prop({
        type: String,
        default: defaults.title,
    })
], Notification.prototype, "title", void 0);
__decorate([
    Prop({
        type: String,
        default: defaults.text,
    })
], Notification.prototype, "text", void 0);
__decorate([
    Prop({
        type: Number,
        default: defaults.duration,
    })
], Notification.prototype, "duration", void 0);
__decorate([
    Prop({
        type: null,
        default: defaults.data,
    })
], Notification.prototype, "data", void 0);
Notification = __decorate([
    Component({
        expose: ['show', 'hide'],
        props: {
            prefixCls: {
                type: String,
                default: 'dora-notification',
            },
        },
    })
], Notification);
export const $wuxNotification = (selector = '#dora-notification', context) => {
    const page = context || getCurrentPages()[getCurrentPages().length - 1];
    return (page?.selectComponent?.(selector) || {});
};
export default defineComponentHOC()(Notification);
