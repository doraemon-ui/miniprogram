/**
 * @doraemon-ui/miniprogram.white-space.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:41:51.
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
let WhiteSpace = class WhiteSpace extends Doraemon {
    onBodyStyleChange(v) {
        this.extStyle = styleToCssString(v);
    }
    get classes() {
        const { prefixCls, size } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--${size}`]: !!size
        });
        return {
            wrap
        };
    }
    onTap() {
        this.$emit('click');
    }
    mounted() {
        this.onBodyStyleChange(this.bodyStyle);
    }
    constructor(...args){
        super(...args);
        this.extStyle = '';
    }
};
_ts_decorate([
    Prop({
        type: String,
        default: 'default'
    })
], WhiteSpace.prototype, "size", void 0);
_ts_decorate([
    Prop({
        type: null,
        default: ''
    })
], WhiteSpace.prototype, "bodyStyle", void 0);
_ts_decorate([
    Watch('bodyStyle')
], WhiteSpace.prototype, "onBodyStyleChange", null);
WhiteSpace = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-white-space'
            }
        }
    })
], WhiteSpace);
var index = defineComponentHOC()(WhiteSpace);

export { WhiteSpace, index as default };
