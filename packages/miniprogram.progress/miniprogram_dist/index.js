/**
 * @doraemon-ui/miniprogram.progress.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:40:11.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Doraemon, Prop, Watch, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames, styleToCssString } = Doraemon.util;
const defaultColors = {
    normal: '#387ef5',
    progress: '#387ef5',
    error: '#ef473a',
    success: '#33cd5f'
};
let Progress = class Progress extends Doraemon {
    get classes() {
        const { prefixCls, shape, status } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--${shape}`]: shape,
            [`${prefixCls}--${status}`]: status
        });
        return {
            wrap,
            outer: `${prefixCls}__outer`,
            inner: `${prefixCls}__inner`,
            bar: `${prefixCls}__bar`,
            text: `${prefixCls}__text`
        };
    }
    onBarStyleChange(newVal) {
        this.extStyle = styleToCssString(newVal || '');
    }
    onStyleRelatedChange() {
        this.updateStyle();
    }
    updateStyle() {
        const width = this.percent < 0 ? 0 : this.percent > 100 ? 100 : this.percent;
        const height = this.strokeWidth > 0 ? this.strokeWidth : 10;
        const backgroundColor = this.activeColor || defaultColors[this.status] || defaultColors.normal;
        this.width = width;
        this.style = `background-color: ${backgroundColor}; width: ${width}%; height: ${height}px;`;
    }
    mounted() {
        this.onBarStyleChange(this.barStyle);
        this.updateStyle();
    }
    constructor(...args){
        super(...args);
        this.width = 0;
        this.style = '';
        this.extStyle = '';
    }
};
_ts_decorate([
    Prop({
        type: Number,
        default: 0
    })
], Progress.prototype, "percent", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 10
    })
], Progress.prototype, "strokeWidth", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Progress.prototype, "activeColor", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: '#f3f3f3'
    })
], Progress.prototype, "backgroundColor", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'normal'
    })
], Progress.prototype, "status", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'round'
    })
], Progress.prototype, "shape", void 0);
_ts_decorate([
    Prop({
        type: [
            String,
            Object
        ],
        default: ''
    })
], Progress.prototype, "barStyle", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Progress.prototype, "showInfo", void 0);
_ts_decorate([
    Watch('barStyle')
], Progress.prototype, "onBarStyleChange", null);
_ts_decorate([
    Watch('percent'),
    Watch('strokeWidth'),
    Watch('activeColor'),
    Watch('status')
], Progress.prototype, "onStyleRelatedChange", null);
Progress = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-progress'
            }
        }
    })
], Progress);
var index = defineComponentHOC()(Progress);

export { Progress, index as default };
