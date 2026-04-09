/**
 * @doraemon-ui/miniprogram.selectable.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-02-26, 00:53:01.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js';
const { classNames, styleToCssString } = Doraemon.util;
const presetColors = {
    light: '#ddd',
    stable: '#b2b2b2',
    positive: '#387ef5',
    calm: '#11c1f3',
    balanced: '#33cd5f',
    energized: '#ffc900',
    assertive: '#ef473a',
    royal: '#886aea',
    dark: '#444',
};
const isPresetColor = (color) => {
    if (!color)
        return '';
    return presetColors[color] ? presetColors[color] : color;
};
let Selectable = class Selectable extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Selectable
     */
    prefixCls;
    type;
    value;
    defaultChecked;
    checked;
    disabled;
    readOnly;
    color;
    controlled;
    wrapStyle;
    iconSize;
    iconOn;
    iconOff;
    inputChecked = false;
    inputColor = '';
    extStyle = '';
    innerIconSize = 23;
    innerIconOn = 'success';
    innerIconOff = 'circle';
    get classes() {
        const { prefixCls, inputChecked, disabled, readOnly } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--checked`]: inputChecked,
            [`${prefixCls}--disabled`]: disabled,
            [`${prefixCls}--readonly`]: readOnly,
        });
        const input = `${prefixCls}__input`;
        const icon = `${prefixCls}__icon`;
        return {
            wrap,
            input,
            icon,
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
        }
        else if (type === 'radio') {
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
        this.inputColor = isPresetColor(newVal);
    }
    onWrapStyleChange(newVal) {
        this.extStyle = styleToCssString(newVal);
    }
    onIconPropsChange() {
        this.updateTypeIcons(this.type, this.iconSize, this.iconOn, this.iconOff);
    }
    onChange() {
        const { value, inputChecked, disabled, readOnly, controlled, type } = this;
        if (disabled || readOnly)
            return;
        const item = {
            checked: !inputChecked,
            value,
            type,
        };
        if (!controlled) {
            this.updated(!inputChecked);
        }
        this.$emit('change', item);
    }
    mounted() {
        const inputChecked = this.controlled ? this.checked : this.defaultChecked;
        this.inputChecked = inputChecked;
        this.inputColor = isPresetColor(this.color);
        this.extStyle = styleToCssString(this.wrapStyle);
        this.updateTypeIcons(this.type, this.iconSize, this.iconOn, this.iconOff);
    }
};
__decorate([
    Prop({ type: String, default: 'checkbox' })
], Selectable.prototype, "type", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Selectable.prototype, "value", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Selectable.prototype, "defaultChecked", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Selectable.prototype, "checked", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Selectable.prototype, "disabled", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Selectable.prototype, "readOnly", void 0);
__decorate([
    Prop({ type: String, default: 'balanced' })
], Selectable.prototype, "color", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Selectable.prototype, "controlled", void 0);
__decorate([
    Prop({ type: null, default: '' })
], Selectable.prototype, "wrapStyle", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Selectable.prototype, "iconSize", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Selectable.prototype, "iconOn", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Selectable.prototype, "iconOff", void 0);
__decorate([
    Watch('checked')
], Selectable.prototype, "onCheckedChange", null);
__decorate([
    Watch('color')
], Selectable.prototype, "onColorChange", null);
__decorate([
    Watch('wrapStyle')
], Selectable.prototype, "onWrapStyleChange", null);
__decorate([
    Watch('type'),
    Watch('iconSize'),
    Watch('iconOn'),
    Watch('iconOff')
], Selectable.prototype, "onIconPropsChange", null);
Selectable = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-selectable',
            },
            type: {
                type: String,
                default: 'checkbox',
            },
            value: {
                type: String,
                default: '',
            },
            defaultChecked: {
                type: Boolean,
                default: false,
            },
            checked: {
                type: Boolean,
                default: false,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            readOnly: {
                type: Boolean,
                default: false,
            },
            color: {
                type: String,
                default: 'balanced',
            },
            controlled: {
                type: Boolean,
                default: false,
            },
            wrapStyle: {
                type: null,
                default: '',
            },
            iconSize: {
                type: String,
                default: '',
            },
            iconOn: {
                type: String,
                default: '',
            },
            iconOff: {
                type: String,
                default: '',
            },
        },
    })
], Selectable);
export default defineComponentHOC({ externalClasses: ['dora-input-class'] })(Selectable);
