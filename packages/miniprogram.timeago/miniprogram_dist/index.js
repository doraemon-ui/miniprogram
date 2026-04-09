/**
 * @doraemon-ui/miniprogram.timeago.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-06, 00:24:05.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js';
import { parse, diff, format } from './core';
import locales from './locales';
let Timeago = class Timeago extends Doraemon {
    prefixCls;
    to;
    from;
    refreshable;
    lang;
    currentTo = null;
    currentFrom = null;
    timeago = '';
    timeout = null;
    onToChange(v) {
        this.updated(v, this.from, this.lang);
    }
    onFromChange(v) {
        this.updated(this.to, v, this.lang);
    }
    onRefreshableChange(_v) {
        this.updated(this.to, this.from, this.lang, true);
    }
    onLangChange(v) {
        this.updated(this.to, this.from, v, true);
    }
    updated(currentTo, currentFrom, lang, isForce = false) {
        this.clearTimer();
        if (!currentTo)
            return;
        if (currentTo !== this.currentTo || currentFrom !== this.currentFrom || isForce) {
            const diffTime = diff(currentTo, currentFrom);
            const langPack = locales[lang] || locales.zh_CN;
            this.currentTo = currentTo;
            this.currentFrom = currentFrom;
            this.timeago = format(diffTime, langPack);
            if (this.refreshable && !this.from) {
                const howOld = diff(currentTo, currentFrom, 'minute');
                const secondsUntilUpdate = (howOld < 1 && 1) || (howOld < 60 && 30) || (howOld < 180 && 300) || 3600;
                this.timeout = setTimeout(() => {
                    this.updated(currentTo, this.getNow(), lang);
                }, secondsUntilUpdate * 1000);
            }
        }
    }
    clearTimer() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }
    getNow() {
        return this.from ? parse(this.from) : new Date();
    }
    detached() {
        this.clearTimer();
    }
};
__decorate([
    Prop({ type: null, default: null })
], Timeago.prototype, "to", void 0);
__decorate([
    Prop({ type: null, default: null })
], Timeago.prototype, "from", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Timeago.prototype, "refreshable", void 0);
__decorate([
    Prop({ type: String, default: 'zh_CN' })
], Timeago.prototype, "lang", void 0);
__decorate([
    Watch('to')
], Timeago.prototype, "onToChange", null);
__decorate([
    Watch('from')
], Timeago.prototype, "onFromChange", null);
__decorate([
    Watch('refreshable')
], Timeago.prototype, "onRefreshableChange", null);
__decorate([
    Watch('lang')
], Timeago.prototype, "onLangChange", null);
Timeago = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-timeago',
            },
        },
    })
], Timeago);
export default defineComponentHOC()(Timeago);
