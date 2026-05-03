/**
 * @doraemon-ui/miniprogram.prompt.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:40:14.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Doraemon, Prop, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames, styleToCssString } = Doraemon.util;
let Prompt = class Prompt extends Doraemon {
    get classes() {
        const { prefixCls, hoverClass, disabled } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--disabled`]: disabled
        });
        const hover = hoverClass && hoverClass !== 'default' ? hoverClass : `${prefixCls}--hover`;
        return {
            wrap,
            hover
        };
    }
    get containerStyle() {
        return this.wrapStyle ? styleToCssString(this.wrapStyle) : '';
    }
    onClick() {
        if (!this.disabled) {
            this.$emit('click');
        }
    }
};
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Prompt.prototype, "disabled", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'default'
    })
], Prompt.prototype, "hoverClass", void 0);
_ts_decorate([
    Prop({
        type: Object,
        default: null
    })
], Prompt.prototype, "wrapStyle", void 0);
Prompt = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-prompt'
            }
        }
    })
], Prompt);
var index = defineComponentHOC()(Prompt);

export { Prompt, index as default };
