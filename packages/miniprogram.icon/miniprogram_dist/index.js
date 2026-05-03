/**
 * @doraemon-ui/miniprogram.icon.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:37:43.
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
let Icon = class Icon extends Doraemon {
    get classes() {
        const { prefixCls, type } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}-${type}`]: type
        });
        return {
            wrap
        };
    }
    get containerStyle() {
        const getFontSize = (size)=>{
            let fontSize = size;
            if (typeof size === 'number') {
                fontSize = `${size}px`;
            } else if (typeof size === 'string') {
                if (!isNaN(Number(size))) {
                    fontSize = `${size}px`;
                }
            }
            return fontSize;
        };
        return styleToCssString({
            fontSize: getFontSize(this.size),
            color: this.color !== '' ? this.color : 'unset'
        });
    }
    onClick() {
        this.$emit('click');
    }
};
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Icon.prototype, "hidden", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Icon.prototype, "type", void 0);
_ts_decorate([
    Prop({
        type: [
            String,
            Number
        ],
        default: 32
    })
], Icon.prototype, "size", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Icon.prototype, "color", void 0);
Icon = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'doraicons'
            }
        }
    })
], Icon);
var index = defineComponentHOC()(Icon);

export { Icon, index as default };
