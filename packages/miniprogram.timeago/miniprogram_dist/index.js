/**
 * @doraemon-ui/miniprogram.timeago.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:41:25.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Prop, Watch, Component, defineComponentHOC, Doraemon } from '@doraemon-ui/miniprogram.core-js';
import { diff, format, parse } from './core/index.js';
import locales from './locales/index.js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let Timeago = class Timeago extends Doraemon {
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
        if (!currentTo) return;
        if (currentTo !== this.currentTo || currentFrom !== this.currentFrom || isForce) {
            const diffTime = diff(currentTo, currentFrom);
            const langPack = locales[lang] || locales.zh_CN;
            this.currentTo = currentTo;
            this.currentFrom = currentFrom;
            this.timeago = format(diffTime, langPack);
            if (this.refreshable && !this.from) {
                const howOld = diff(currentTo, currentFrom, 'minute');
                const secondsUntilUpdate = howOld < 1 && 1 || howOld < 60 && 30 || howOld < 180 && 300 || 3600;
                this.timeout = setTimeout(()=>{
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
    constructor(...args){
        super(...args);
        this.currentTo = null;
        this.currentFrom = null;
        this.timeago = '';
        this.timeout = null;
    }
};
_ts_decorate([
    Prop({
        type: null,
        default: null
    })
], Timeago.prototype, "to", void 0);
_ts_decorate([
    Prop({
        type: null,
        default: null
    })
], Timeago.prototype, "from", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Timeago.prototype, "refreshable", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'zh_CN'
    })
], Timeago.prototype, "lang", void 0);
_ts_decorate([
    Watch('to')
], Timeago.prototype, "onToChange", null);
_ts_decorate([
    Watch('from')
], Timeago.prototype, "onFromChange", null);
_ts_decorate([
    Watch('refreshable')
], Timeago.prototype, "onRefreshableChange", null);
_ts_decorate([
    Watch('lang')
], Timeago.prototype, "onLangChange", null);
Timeago = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-timeago'
            }
        }
    })
], Timeago);
var index = defineComponentHOC()(Timeago);

export { Timeago, index as default };
