/**
 * @doraemon-ui/miniprogram.media.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:39:42.
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
let Media = class Media extends Doraemon {
    get classes() {
        const { prefixCls, align } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--align-${align}`]: align
        });
        return {
            wrap,
            hd: `${prefixCls}__hd`,
            thumb: `${prefixCls}__thumb`,
            bd: `${prefixCls}__bd`,
            title: `${prefixCls}__title`,
            desc: `${prefixCls}__desc`
        };
    }
    onThumbStyleChange(value) {
        this.extStyle = styleToCssString(value || '');
    }
    mounted() {
        this.onThumbStyleChange(this.thumbStyle);
    }
    constructor(...args){
        super(...args);
        this.extStyle = '';
    }
};
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Media.prototype, "thumb", void 0);
_ts_decorate([
    Prop({
        type: [
            String,
            Object
        ],
        default: ''
    })
], Media.prototype, "thumbStyle", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Media.prototype, "title", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Media.prototype, "label", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'center'
    })
], Media.prototype, "align", void 0);
_ts_decorate([
    Watch('thumbStyle')
], Media.prototype, "onThumbStyleChange", null);
Media = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-media'
            }
        }
    })
], Media);
var index = defineComponentHOC()(Media);

export { Media, index as default };
