/**
 * @doraemon-ui/miniprogram.icon.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-07-04, 21:59:00.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.66.
 */

import { Doraemon, Prop, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';
import { getFontSize } from '@doraemon-ui/miniprogram.shared';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames, styleToCssString } = Doraemon.util;
const PRESET_MP_ICON_MAP = {
    back: '#B2B2B2',
    cancel: '#F43530',
    circle: '#C9C9C9',
    clear: '#B2B2B2',
    delete: '#B2B2B2',
    download: '#09BB07',
    info: '#10AEFF',
    info_circle: '#09BB07',
    safe_success: '#09BB07',
    safe_warn: '#FFBE00',
    search: '#B2B2B2',
    success: '#09BB07',
    success_circle: '#09BB07',
    success_no_circle: '#09BB07',
    waiting: '#10AEFF',
    waiting_circle: '#10AEFF',
    warn: '#F76260'
};
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
        const { prefixCls, type, size, color } = this;
        let iconColor = '';
        if (prefixCls === 'mpicons' && PRESET_MP_ICON_MAP[type]) {
            const presetColor = PRESET_MP_ICON_MAP[type];
            if (presetColor) {
                iconColor = presetColor;
            }
        }
        if (color !== '') {
            iconColor = color;
        }
        return styleToCssString({
            fontSize: getFontSize(size),
            color: iconColor !== '' ? iconColor : 'unset'
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

export { Icon, PRESET_MP_ICON_MAP, index as default };
