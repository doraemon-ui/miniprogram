/**
 * @doraemon-ui/miniprogram.toptips.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-06, 00:49:26.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js';
import { defaults } from './utils';
const { classNames } = Doraemon.util;
let _toptips = null;
let Toptips = class Toptips extends Doraemon {
    prefixCls;
    classNames;
    icon;
    hidden;
    text;
    duration;
    in = false;
    removed = false;
    fns = { success: () => { } };
    get classes() {
        const ico = this.icon || 'cancel';
        const p = this.prefixCls;
        const wrap = classNames(p);
        const content = classNames(`${p}__content`, {
            [`${p}__content--${ico}`]: !!ico,
        });
        return {
            wrap,
            content,
            icon: `${p}__icon`,
            text: `${p}__text`,
        };
    }
    hide() {
        if (this.removed)
            return false;
        this.removed = true;
        if (_toptips) {
            clearTimeout(_toptips.timeout);
            _toptips = null;
        }
        this.in = false;
        this.fns.success?.();
        return true;
    }
    show(opts = {}) {
        const closePromise = new Promise((resolve) => {
            const options = Object.assign({}, defaults, opts);
            const callback = () => {
                this.hide();
                resolve(true);
            };
            this.removed = false;
            this.in = true;
            this.classNames = options.classNames || defaults.classNames;
            this.icon = options.icon || defaults.icon;
            this.hidden = !!options.hidden;
            this.text = options.text || '';
            this.duration = options.duration || defaults.duration;
            this.fns = { success: options.success || (() => { }) };
            if (_toptips) {
                clearTimeout(_toptips.timeout);
                _toptips = null;
            }
            _toptips = {
                hide: this.hide.bind(this),
            };
            _toptips.timeout = setTimeout(callback, this.duration);
        });
        const result = () => {
            if (_toptips)
                _toptips.hide.call(this);
        };
        result.then = (resolve, reject) => closePromise.then(resolve, reject);
        result.promise = closePromise;
        return result;
    }
    success(opts = {}) {
        return this.show({ ...opts, icon: 'success' });
    }
    info(opts = {}) {
        return this.show({ ...opts, icon: 'info' });
    }
    warn(opts = {}) {
        return this.show({ ...opts, icon: 'warn' });
    }
    error(opts = {}) {
        return this.show({ ...opts, icon: 'cancel' });
    }
    detached() {
        this.hide();
    }
};
__decorate([
    Prop({ type: String, default: defaults.classNames })
], Toptips.prototype, "classNames", void 0);
__decorate([
    Prop({ type: String, default: defaults.icon })
], Toptips.prototype, "icon", void 0);
__decorate([
    Prop({ type: Boolean, default: defaults.hidden })
], Toptips.prototype, "hidden", void 0);
__decorate([
    Prop({ type: String, default: defaults.text })
], Toptips.prototype, "text", void 0);
__decorate([
    Prop({ type: Number, default: defaults.duration })
], Toptips.prototype, "duration", void 0);
Toptips = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-toptips',
            },
        },
    })
], Toptips);
export default defineComponentHOC()(Toptips);
import * as toptips_1 from './toptips';
export { toptips_1 as toptips };
