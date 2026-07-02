/**
 * @doraemon-ui/miniprogram.selectable.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-07-02, 19:42:21.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.65.
 */

import { Doraemon, Prop, Watch, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';
import { getPresetColor } from '@doraemon-ui/miniprogram.shared';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames, styleToCssString } = Doraemon.util;
let Selectable = class Selectable extends Doraemon {
    get classes() {
        const { prefixCls, inputChecked, disabled, readOnly } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--checked`]: inputChecked,
            [`${prefixCls}--disabled`]: disabled,
            [`${prefixCls}--readonly`]: readOnly
        });
        const input = `${prefixCls}__input`;
        const icon = `${prefixCls}__icon`;
        return {
            wrap,
            input,
            icon
        };
    }
    updated(inputChecked) {
        if (this.inputChecked !== inputChecked) {
            this.inputChecked = inputChecked;
        }
    }
    updateTypeIcons(type, iconSize, iconOn, iconOff) {
        const useDefaultSize = iconSize === '';
        const useDefaultIcon = iconOn === '' && iconOff === '';
        if (type === 'checkbox') {
            this.innerIconSize = useDefaultSize ? 23 : parseInt(iconSize, 10);
            this.innerIconOn = useDefaultIcon ? 'success' : iconOn;
            this.innerIconOff = useDefaultIcon ? 'circle' : iconOff;
        } else if (type === 'radio') {
            this.innerIconSize = useDefaultSize ? 16 : parseInt(iconSize, 10);
            this.innerIconOn = useDefaultIcon ? 'success_no_circle' : iconOn;
            this.innerIconOff = useDefaultIcon ? '' : iconOff;
        }
    }
    onCheckedChange(newVal) {
        if (this.controlled) {
            this.updated(newVal);
        }
    }
    onColorChange(newVal) {
        this.inputColor = getPresetColor(newVal);
    }
    onWrapStyleChange(newVal) {
        this.extStyle = styleToCssString(newVal);
    }
    onIconPropsChange() {
        this.updateTypeIcons(this.type, this.iconSize, this.iconOn, this.iconOff);
    }
    onChange() {
        const { value, inputChecked, disabled, readOnly, controlled, type } = this;
        if (disabled || readOnly) return;
        const item = {
            checked: !inputChecked,
            value,
            type
        };
        if (!controlled) {
            this.updated(!inputChecked);
        }
        this.$emit('change', item);
    }
    mounted() {
        const inputChecked = this.controlled ? this.checked : this.defaultChecked;
        this.inputChecked = inputChecked;
        this.inputColor = getPresetColor(this.color);
        this.extStyle = styleToCssString(this.wrapStyle);
        this.updateTypeIcons(this.type, this.iconSize, this.iconOn, this.iconOff);
    }
    constructor(...args){
        super(...args);
        this.inputChecked = false;
        this.inputColor = '';
        this.extStyle = '';
        this.innerIconSize = 23;
        this.innerIconOn = 'success';
        this.innerIconOff = 'circle';
    }
};
_ts_decorate([
    Prop({
        type: String,
        default: 'checkbox'
    })
], Selectable.prototype, "type", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Selectable.prototype, "value", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Selectable.prototype, "defaultChecked", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Selectable.prototype, "checked", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Selectable.prototype, "disabled", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Selectable.prototype, "readOnly", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'balanced'
    })
], Selectable.prototype, "color", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Selectable.prototype, "controlled", void 0);
_ts_decorate([
    Prop({
        type: null,
        default: null
    })
], Selectable.prototype, "wrapStyle", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Selectable.prototype, "iconSize", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Selectable.prototype, "iconOn", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Selectable.prototype, "iconOff", void 0);
_ts_decorate([
    Watch('checked')
], Selectable.prototype, "onCheckedChange", null);
_ts_decorate([
    Watch('color')
], Selectable.prototype, "onColorChange", null);
_ts_decorate([
    Watch('wrapStyle')
], Selectable.prototype, "onWrapStyleChange", null);
_ts_decorate([
    Watch('type'),
    Watch('iconSize'),
    Watch('iconOn'),
    Watch('iconOff')
], Selectable.prototype, "onIconPropsChange", null);
Selectable = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-selectable'
            }
        }
    })
], Selectable);
var index = defineComponentHOC({
    externalClasses: [
        'dora-input-class'
    ]
})(Selectable);

export { Selectable, index as default };
