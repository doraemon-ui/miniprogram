/**
 * @doraemon-ui/miniprogram.divider.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:38:41.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Doraemon, Prop, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames } = Doraemon.util;
let Divider = class Divider extends Doraemon {
    get classes() {
        const { prefixCls, dashed, showText, position, direction } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--dashed`]: dashed,
            [`${prefixCls}--text`]: showText,
            [`${prefixCls}--text-${position}`]: showText && position,
            [`${prefixCls}--${direction}`]: direction
        });
        const text = `${prefixCls}__text`;
        return {
            wrap,
            text
        };
    }
};
_ts_decorate([
    Prop({
        type: String,
        default: 'center'
    })
], Divider.prototype, "position", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Divider.prototype, "dashed", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Divider.prototype, "text", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], Divider.prototype, "showText", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'horizontal'
    })
], Divider.prototype, "direction", void 0);
Divider = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-divider'
            },
            position: {
                type: String,
                default: 'center'
            },
            dashed: {
                type: Boolean,
                default: false
            },
            text: {
                type: String,
                default: ''
            },
            showText: {
                type: Boolean,
                default: true
            },
            direction: {
                type: String,
                default: 'horizontal'
            }
        }
    })
], Divider);
var index = defineComponentHOC()(Divider);

export { Divider, index as default };
